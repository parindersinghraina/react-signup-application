import React from 'react';

interface SearchResultsProps {
  results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      <h3>Used Products (Kijiji, Facebook Marketplace)</h3>
      <div>
        {results
          .filter((result) => result.source === 'kijiji' || result.source === 'facebook')
          .map((result, index) => (
            <div key={index}>{/* Display individual result */}</div>
          ))}
      </div>

      <h3>New Products (BestBuy, Walmart)</h3>
      <div>
        {results
          .filter((result) => result.source === 'bestbuy' || result.source === 'walmart')
          .map((result, index) => (
            <div key={index}>{/* Display individual result */}</div>
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
