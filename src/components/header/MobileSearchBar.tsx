import React from 'react';
import { SearchIcon } from 'lucide-react';

interface MobileSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const MobileSearchBar: React.FC<MobileSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <div className="md:hidden bg-white border-b px-4 py-2">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button title="search" type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-label="Search">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MobileSearchBar;