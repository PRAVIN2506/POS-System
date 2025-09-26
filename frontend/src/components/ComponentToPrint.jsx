import React from "react";

const ComponentToPrint = React.forwardRef(({ cart, totalAmount }, ref) => {
  return (
    <div ref={ref} className="p-5 bg-white text-black">
      <h2 className="text-2xl font-bold mb-2">🧾 Invoice</h2>
      <p className="text-sm text-gray-600 mb-4">Date: {new Date().toLocaleDateString()}</p>
      <table className="min-w-full border border-gray-300 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Qty</th>
            <th className="px-4 py-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">${item.price}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">${item.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right text-xl font-bold">
        Total Amount: ${totalAmount}
      </div>
    </div>
  );
});

export default ComponentToPrint;
