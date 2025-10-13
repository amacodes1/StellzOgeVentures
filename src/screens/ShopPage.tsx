import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  setFilter,
  clearFilters,
  setSearchTerm,
} from "../store/slices/productSlice";
import ProductCard from "../components/ui/ProductCard";
import Button from "../components/ui/Button";
import { SearchIcon, FilterIcon, XIcon } from "lucide-react";
const ShopPage: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredProducts, categories, brands, filters, searchTerm } =
    useSelector((state: RootState) => state.product);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const handleCategoryChange = (category: string | null) => {
    dispatch(
      setFilter({
        key: "category",
        value: category,
      })
    );
  };
  const handleBrandChange = (brand: string | null) => {
    dispatch(
      setFilter({
        key: "brand",
        value: brand,
      })
    );
  };
  const handlePriceChange = (min: number | null, max: number | null) => {
    if (min !== null)
      dispatch(
        setFilter({
          key: "minPrice",
          value: min,
        })
      );
    if (max !== null)
      dispatch(
        setFilter({
          key: "maxPrice",
          value: max,
        })
      );
  };
  const handleInStockChange = (checked: boolean) => {
    dispatch(
      setFilter({
        key: "inStock",
        value: checked,
      })
    );
  };
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Shop All Products
          </h1>
          <p className="text-gray-600 mt-2">
            Find the perfect wholesale products for your business
          </p>
        </div>
        {/* Search Bar - Mobile */}
        <div className="mb-4 lg:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        {/* Mobile Filter Toggle */}
        <div className="mb-4 lg:hidden">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center justify-center"
          >
            <FilterIcon className="h-5 w-5 mr-2" />
            {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:w-1/4 ${
              isMobileFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-emerald-700 hover:text-emerald-800"
                >
                  Clear All
                </button>
              </div>
              {/* Search - Desktop */}
              <div className="mb-6 hidden lg:block">
                <label
                  htmlFor="search"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={filters.category === null}
                      onChange={() => handleCategoryChange(null)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="category-all"
                      className="ml-2 text-sm text-gray-700"
                    >
                      All Categories
                    </label>
                  </div>
                </div>
              </div>
              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="radio"
                        id={`brand-${brand}`}
                        name="brand"
                        checked={filters.brand === brand}
                        onChange={() => handleBrandChange(brand)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="brand-all"
                      name="brand"
                      checked={filters.brand === null}
                      onChange={() => handleBrandChange(null)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="brand-all"
                      className="ml-2 text-sm text-gray-700"
                    >
                      All Brands
                    </label>
                  </div>
                </div>
              </div>
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="min-price" className="sr-only">
                      Minimum Price
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      placeholder="Min"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      value={filters.minPrice || ""}
                      onChange={(e) =>
                        handlePriceChange(
                          e.target.value ? Number(e.target.value) : null,
                          null
                        )
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="sr-only">
                      Maximum Price
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      placeholder="Max"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      value={filters.maxPrice || ""}
                      onChange={(e) =>
                        handlePriceChange(
                          null,
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="in-stock"
                    checked={filters.inStock}
                    onChange={(e) => handleInStockChange(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="in-stock"
                    className="ml-2 text-sm text-gray-700"
                  >
                    In Stock Only
                  </label>
                </div>
              </div>
              {/* Apply Filters Button - Mobile Only */}
              <div className="mt-6 lg:hidden">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Results Info */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
              <p className="text-gray-700">
                <span className="font-medium">{filteredProducts.length}</span>{" "}
                products found
              </p>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <select className="border border-gray-300 rounded-md text-sm p-1 focus:outline-none focus:ring-2 focus:ring-emerald-600">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <XIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms.
                </p>
                <Button variant="primary" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopPage;
