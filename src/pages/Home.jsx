import { useEffect, useState, useMemo } from "react";
import { fetchProducts, fetchCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useDebounce } from "../utils/useDebounce";
import Loader from "../components/Loader";
import OfferSection from "../components/OfferSection";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and Filtering State
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search); //
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);

  // Fetch Products from API
  const getProducts = async () => {
    try {
      const res = await fetchProducts();
      // Supporting both direct arrays and nested .data structures
      setProducts(res.data || res || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories from API
  const getCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(res.data || res || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  // Filter Logic (Title, Category, and Price)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Sanitize Search Inputs
      const searchTerm = (debouncedSearch || "").toLowerCase().trim();
      const productTitle = (product?.title || "").toLowerCase();
      
      // 2. Search Logic: Matching ignoring spaces and hyphens
      const matchesSearch = productTitle
        .replace(/-/g, "")
        .includes(searchTerm.replace(/\s/g, ""));
      
      // 3. Category Filter Logic
      const matchesCategory = 
        selectedCategory === "" || 
        product?.category === selectedCategory;

      // 4. Price Filter Logic
      const matchesPrice = (product?.price || 0) <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, debouncedSearch, selectedCategory, maxPrice]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-[#EED36D] dark:bg-[#1A1A2E] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Promotional Offer Carousel */}
        <OfferSection />

        {/* Page Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-3xl font-black tracking-tighter text-[#194F70] dark:text-[#FFB400] uppercase">
            Discover Products
          </h1>
          <p className="mt-1 text-sm font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">
            Curated picks for the 2026 Tech Collection.
          </p>
        </div>

        {/* Filter Controls */}
        <section className="mb-10 rounded-3xl bg-white dark:bg-[#16213E] border border-[#194F70]/10 dark:border-[#FFB400]/10 shadow-xl overflow-hidden">
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Search Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Product name..."
                className="h-12 px-4 rounded-xl bg-neutral-50 dark:bg-[#1A1A2E] border border-neutral-200 dark:border-neutral-800 text-sm font-bold focus:ring-2 focus:ring-[#194F70] dark:focus:ring-[#FFB400] outline-none transition-all"
              />
            </div>

            {/* Category Select */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 rounded-xl bg-neutral-50 dark:bg-[#1A1A2E] border border-neutral-200 dark:border-neutral-800 text-sm font-bold focus:ring-2 focus:ring-[#194F70] dark:focus:ring-[#FFB400] outline-none cursor-pointer transition-all"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex justify-between">
                <span>Max Budget</span>
                <span className="text-[#194F70] dark:text-[#FFB400]">${maxPrice}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="h-12 accent-[#194F70] dark:accent-[#FFB400] cursor-pointer"
              />
            </div>

          </div>
        </section>

        {/* Product Grid Rendering */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-20 text-center animate-pulse">
              <p className="text-lg font-black text-neutral-400 uppercase tracking-widest">
                No products found 😕
              </p>
              <button 
                onClick={() => {setSearch(""); setSelectedCategory(""); setMaxPrice(1000);}}
                className="mt-4 text-xs font-black text-[#194F70] dark:text-[#FFB400] uppercase underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
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
