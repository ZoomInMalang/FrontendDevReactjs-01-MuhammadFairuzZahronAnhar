import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarComponent from '../components/Navbar';
import RestaurantList from '../components/RestaurantList';

function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [openNow, setOpenNow] = useState(false);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('https://restaurant-api.dicoding.dev/list');
                setRestaurants(response.data.restaurants);
                setFilteredRestaurants(response.data.restaurants);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    const handleCategoryChange = (category) => {
        setCategory(category);
        filterRestaurants(category, priceRange, openNow);
    };

    const handlePriceRangeChange = (priceRange) => {
        setPriceRange(priceRange);
        filterRestaurants(category, priceRange, openNow);
    };

    const handleOpenNowChange = (openNow) => {
        setOpenNow(openNow);
        filterRestaurants(category, priceRange, openNow);
    };

    const clearFilters = () => {
        setCategory('');
        setPriceRange('');
        setOpenNow(false);
        setFilteredRestaurants(restaurants);
    };

    const filterRestaurants = (category, priceRange, openNow) => {
        let filtered = restaurants;

        if (category) {
            filtered = filtered.filter(restaurant =>
                restaurant.categories.includes(category)
            );
        }

        if (priceRange) {
            filtered = filtered.filter(restaurant => restaurant.priceRange === priceRange);
        }

        if (openNow) {
            filtered = filtered.filter(restaurant => restaurant.openNow);
        }

        setFilteredRestaurants(filtered);
    };


    return (
        <div className="container">
            <br />
            <h1>Restaurants</h1>
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reiciendis natus dolorum.</p>
            <NavbarComponent
                handleCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                handlePriceRangeChange={handlePriceRangeChange}
                openNow={openNow}
                handleOpenNowChange={handleOpenNowChange}
                clearFilters={clearFilters}
            />
            <RestaurantList restaurants={filteredRestaurants} />
        </div>
    );
}

export default Home;
