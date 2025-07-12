import Image from "next/image";

type Props = {
  order: any;
};

const OrderCard = ({ order }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <div>
          <p className="font-bold">Order ID: {order.id}</p>
          <p className="text-sm text-gray-600">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
          <p className="text-sm">Status: <span className="font-medium">{order.status}</span></p>
        </div>
        <div>
          <p>User: <span className="font-semibold">{order.user.name}</span></p>
          <p>Email: {order.user.email}</p>
        </div>
        <div>
          <p className="font-semibold">Total: ₹{order.total}</p>
          <p>Payment: {order.payment?.status} ({order.payment?.provider})</p>
        </div>
      </div>

      {order.items.map((item: any, idx: number) => (
        <div key={idx} className="flex items-center gap-4 mb-2">
          {item.product.images[0] && (
            <Image
              src={item.product.images[0].url}
              alt={item.product.title}
              width={60}
              height={60}
              className="rounded object-cover"
            />
          )}
          <div>
            <p className="font-medium">{item.product.title}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
