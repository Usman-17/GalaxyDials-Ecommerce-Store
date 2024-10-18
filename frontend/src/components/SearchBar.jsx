import { useEffect, useState, useRef } from "react";

import { X } from "lucide-react";
import { Link } from "react-router-dom";
// Import End

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = ({ products, onClose }) => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const debouncedSearch = useDebounce(search, 300);
  const inputRef = useRef(null);

  useEffect(() => {
    if (debouncedSearch && Array.isArray(products)) {
      const filteredData = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setSearchData(filteredData);
    } else {
      setSearchData([]);
    }
  }, [debouncedSearch, products]);

  const handleChange = (e) => setSearch(e.target.value);

  const handleClear = () => {
    setSearch("");
    inputRef.current.focus();
  };

  const handleProductClick = () => {
    setSearch("");
    setSearchData([]);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [searchData]);

  return (
    <div className="search-container absolute top-[60px] sm:top-4 sm:left-80 right-0 z-50 w-[100%] sm:w-[50%] px-3">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-full w-full p-2 font-normal focus:outline-none focus:border-gray-800 px-4"
          aria-label="Search"
          value={search}
          onChange={handleChange}
        />

        <div className="absolute inset-y-0 right-3 flex items-center space-x-2">
          {search && (
            <X
              className="cursor-pointer hover:text-gray-600"
              onClick={handleClear}
            />
          )}
        </div>
      </div>

      {searchData.length > 0 && (
        <div className="bg-white py-3 shadow-lg rounded px-3">
          {searchData.slice(0, 5).map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              onClick={handleProductClick}
              aria-label={`View details for ${product.title}`}
            >
              <div className="flex items-center hover:bg-gray-100 transition-colors duration-200 py-2 rounded text-sm sm:text-base">
                <img
                  src={product.productImages[0].url}
                  alt={`Image of ${product.title}`}
                  className="object-contain w-8 rounded-sm"
                  loading="lazy"
                  decoding="async"
                />
                <p className="block px-4 truncate">{product.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {debouncedSearch && searchData.length === 0 && (
        <p className="px-4 py-3 text-gray-500 bg-white rounded">
          No results found
        </p>
      )}
    </div>
  );
};

export default SearchBar;
