import { useCartStore } from "../store/useCartStore";

function Cart() {
  // 🔹 Zustand store connection (FIXED)
  const cartItems = useCartStore((state) => state.cart || []);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // 🔹 Total calculation (FIXED)
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Your Cart
        </h1>

        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your bag
        </p>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* 🛒 ITEMS LIST */}
            <ul className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
                >

                  {/* Image */}
                  <div className="h-24 w-24 shrink-0 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-center p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">
                      {item.title}
                    </h3>

                    <span className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 capitalize">
                      {item.category}
                    </span>

                    <div className="mt-auto flex items-center justify-between pt-3">

                      {/* 🔢 Quantity Controls */}
                      <div className="inline-flex items-center rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">

                        <button
                          onClick={() => decreaseQty(item.id)}   // ✅ FIXED
                          className="h-8 w-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          −
                        </button>

                        <span className="h-8 min-w-[2rem] flex items-center justify-center text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}   // ✅ FIXED
                          className="h-8 w-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>

                      </div>

                      {/* Price + Remove */}
                      <div className="flex items-center gap-4">

                        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs font-medium text-neutral-500 hover:text-red-600 dark:hover:text-red-400 transition"
                        >
                          Remove
                        </button>

                      </div>

                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* 💰 SUMMARY */}
            <aside className="h-fit rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-6 lg:sticky lg:top-24">

              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                Order summary
              </h2>

              <div className="mt-4 flex flex-col gap-2 text-sm">

                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

              </div>

              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Total
                </span>

                <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button className="mt-6 w-full h-11 rounded-xl bg-[#194F70] dark:bg-[#FFB400] text-white dark:text-black hover:opacity-90 transition font-medium">
                Checkout
              </button>

            </aside>

          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;