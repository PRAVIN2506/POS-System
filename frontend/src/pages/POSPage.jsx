import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from '../components/ComponentToPrint';

function POSPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const componentRef = useRef();

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const fetchProducts = async () => {
    setisLoading(true);
    try {
      const result = await axios.get('products');
      setProducts(result.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
    setisLoading(false);
  };

  const addProductToCart = (product) => {
    const findProductInCart = cart.find(i => i.id === product.id);
    if (findProductInCart) {
      const newCart = cart.map(cartItem =>
        cartItem.id === product.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalAmount: cartItem.price * (cartItem.quantity + 1),
            }
          : cartItem
      );
      setCart(newCart);
      toast(`Added ${product.name} to cart`, toastOptions);
    } else {
      const addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions);
    }
  };

  const removeProduct = async (product) => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach(icart => {
      newTotalAmount += parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Invoice',
  });

  return (
    <MainLayout>
      <div className='flex gap-6'>
        <div className="w-full md:w-1/2">
          {isLoading ? (
            <p className="text-gray-500 text-lg">Loading products...</p>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {products.map((product, key) => (
                <div
                  key={key}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => addProductToCart(product)}
                >
                  <p className="text-lg font-semibold text-gray-800 mb-2">{product.name}</p>
                  <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className="h-32 w-full object-cover rounded mb-3"
                  />
                  <p className="text-green-600 font-bold text-md">${product.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="md:w-1/2">
          {/* Print Component must be mounted and visible */}
          <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
            <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
          </div>

          <h2 className="text-xl font-bold mb-4">Cart</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Qty</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((item, key) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">${item.price}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">${item.totalAmount}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => removeProduct(item)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                      No items in cart
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right">
            <h2 className="text-xl font-bold text-gray-800">Total Amount: ${totalAmount}</h2>
          </div>

          <div className="mt-4">
            {totalAmount > 0 ? (
              <button
                onClick={handleReactToPrint}
                className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
              >
                Pay Now
              </button>
            ) : (
              <p className="text-gray-500">Please add a product to the cart</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;
