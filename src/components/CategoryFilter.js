import React from 'react';
import NavbarComponent from './Navbar';

function CategoryFilter({ handleCategoryChange, priceRange, handlePriceRangeChange, openNow, handleOpenNowChange, clearFilters }) {
  return (
    <NavbarComponent
      handleCategoryChange={handleCategoryChange}
      priceRange={priceRange}
      handlePriceRangeChange={handlePriceRangeChange}
      openNow={openNow}
      handleOpenNowChange={handleOpenNowChange}
      clearFilters={clearFilters}
    />
  );
}

export default CategoryFilter;
