import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function NavbarComponent({ handleCategoryChange, priceRange, handlePriceRangeChange, openNow, handleOpenNowChange, clearFilters }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://restaurant-api.dicoding.dev/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const onCategoryChange = (event) => {
    const category = event.target.value;
    handleCategoryChange(category);
  };

  const onPriceRangeChange = (event) => {
    const range = event.target.value;
    handlePriceRangeChange(range);
  };

  const onOpenNowChange = (event) => {
    const isChecked = event.target.checked;
    handleOpenNowChange(isChecked);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className="me-4">Filter</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 align-items-center" navbarScroll>
            <div className="d-flex align-items-center me-4">
              <Form.Check type="checkbox" id="open-now-checkbox" className="me-3" checked={openNow} onChange={onOpenNowChange} />
              <Form.Label htmlFor="open-now-checkbox" className="mb-0">
                Open Now
              </Form.Label>
            </div>
            <Form.Select
              className="me-3"
              aria-label="Price Range"
              value={priceRange}
              onChange={onPriceRangeChange}
            >
              <option value="">Price</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </Form.Select>
            <Form.Select
              className="me-3"
              aria-label="Categories"
              onChange={onCategoryChange}
            >
              <option value="">Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Nav>
          <Button variant="secondary" onClick={clearFilters}>
            Clear All
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
