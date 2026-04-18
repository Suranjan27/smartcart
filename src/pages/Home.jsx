import { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useDebounce } from "../utils/useDebounce";
import Loader from "../components/Loader";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);

  const getProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchCategory = selectedCategory
      ? item.category === selectedCategory
      : true;

    const matchPrice = item.price <= maxPrice;

    return matchSearch && matchCategory && matchPrice;
  });

if (loading) {
  return <Loader />;
}

  return (
    <main className="min-h-screen bg-[#EED36D] dark:bg-[#1A1A2E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#194F70] dark:text-[#FFB400]">
            Discover Products
          </h1>
          <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-400">
            Curated picks from across categories.
          </p>
        </div>

        {/* Filter */}
        <section className="mb-8 rounded-2xl 
        bg-white dark:bg-[#16213E] 
        border border-[#194F70]/20 dark:border-[#FFB400]/20 
        shadow-sm">

          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

            {/* Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="h-10 px-3 rounded-lg 
                bg-white dark:bg-[#16213E] 
                border border-[#194F70]/30 dark:border-[#FFB400]/30 
                text-sm outline-none"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 px-3 rounded-lg 
                bg-white dark:bg-[#16213E] 
                border border-[#194F70]/30 dark:border-[#FFB400]/30 
                text-sm outline-none"
              >
                <option value="">All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-neutral-600 dark:text-neutral-400 flex justify-between">
                <span>Max price</span>
                <span>${maxPrice}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-[#194F70] dark:accent-[#FFB400]"
              />
            </div>

          </div>
        </section>

        {/* Products */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center col-span-full text-neutral-600 dark:text-neutral-400">
              No products found 😕
            </p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </section>

      </div>
    </main>
  );
}

export default Home;