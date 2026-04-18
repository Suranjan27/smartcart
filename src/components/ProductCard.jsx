import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // 🔒 Safety check
  if (!product) return null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#16213E] border border-[#194F70]/10 dark:border-[#FFB400]/10 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* 🖼 Image */}
      <div className="aspect-square w-full bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* 📄 Content */}
      <div className="flex flex-col gap-3 p-4 sm:p-5 border-t border-neutral-100 dark:border-neutral-800">

        {/* Title */}
        <h3
          className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2 min-h-[2.5rem]"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Price + Category */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-base font-semibold text-[#194F70] dark:text-[#FFB400]">
            ${product.price?.toFixed(2)}
          </span>

          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 capitalize">
            {product.category}
          </span>
        </div>

        {/* CTA (now safe, no button inside link issue) */}
        <div className="mt-1 h-9 flex items-center justify-center rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium group-hover:bg-neutral-800 dark:group-hover:bg-white transition-colors">
          View details
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;