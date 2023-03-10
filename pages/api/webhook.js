import { buffer } from "micro";
var admin = require("firebase-admin");
var serviceAccount = require("../../permissions.json");
var {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = getFirestore();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
  console.log("fullfilling order", session);
  return firestore
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: Timestamp,
    })
    .then(() => {
      console.log(`Success :order ${session.id} has been added to database.`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);

    const payload = requestBuffer.toString();

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      //Verify the event came from stripe
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook error : ${err.message}`);
    }

    //Handle checkout session completed event

    if ((event.type = "checkout.session.completed")) {
      const session = event.data.object;

      //Fullfill the order.

      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => {
          return res.status(400).send(`Webhook error : ${err.message}`);
        });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
