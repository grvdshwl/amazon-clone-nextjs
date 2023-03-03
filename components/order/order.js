import moment from "moment";

const Order = ({ order }) => {
  const { id, amount, amountShipping, items, timestamp, images } = order;
  return (
    <div className="relative border-rounder-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">Order Placed</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold">Total</p>
          <p>
            <span className="text-bold">&#8377;{amount}</span> - Next Day
            Delivery
            <span className="text-bold">&#8377;{amountShipping}</span>
          </p>
        </div>
        <p
          className="text-sm whitespace-nowrap sm:text-xl self-end
        flex-1 text-right text-blue-500"
        >
          {items.length} items
        </p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate whitespace-nowrap">
          Order # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image) => {
            return (
              <img
                src={image}
                alt="image"
                className="h-20 object-contain sm:h-32"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Order;
