import React, { useState } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';

const SearchProduct: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    // Fetch search results from different websites using APIs or web scraping
    // Update searchResults state with the fetched data
    // Example using axios:
    try {
      const response = await axios.get(`YOUR_API_ENDPOINT?searchTerm=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <h2>Product Search</h2>
      <div>
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchProduct;
