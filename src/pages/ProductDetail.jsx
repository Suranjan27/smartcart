import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../services/api";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert("Please login to add items to your cart!");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetchSingleProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;
  
return (
  <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

    {/* 🔒 SAFE LOADING CHECK */}
    {!product ? (
      <div className="flex justify-center mt-20">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* 🖼 Image panel */}
          <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 sm:p-12 flex items-center justify-center shadow-sm">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[420px] w-auto object-contain"
            />
          </div>

          {/* 📄 Info panel */}
          <div className="flex flex-col gap-6">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {product.category}
              </p>

              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {product.title}
              </h1>
            </div>

            {/* 💰 Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                ${product.price?.toFixed(2)}
              </span>

              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Inclusive of all taxes
              </span>
            </div>

            {/* 📖 Description */}
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {product.description}
            </p>

            {/* 🔘 Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              {/* Add to cart */}
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-[#194F70] dark:bg-[#FFB400] text-white dark:text-black px-6 h-11 rounded-xl hover:opacity-90 transition text-sm font-medium"
              >
                Add to cart
              </button>

              {/* Buy now */}
              <button
                type="button"
                className="border border-[#194F70]/30 dark:border-[#FFB400]/30 text-[#194F70] dark:text-[#FFB400] px-6 h-11 rounded-xl hover:bg-[#194F70]/10 dark:hover:bg-[#FFB400]/10 transition text-sm font-medium"
              >
                Buy now
              </button>

            </div>

          </div>
        </div>
      </div>
    )}
  </main>
);
}

export default ProductDetail;