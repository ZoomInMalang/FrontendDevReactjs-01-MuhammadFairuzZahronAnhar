import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RestaurantDetail from '../components/RestaurantDetail';

function Detail() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        axios.get(`https://restaurant-api.dicoding.dev/detail/${id}`)
            .then(response => {
                setRestaurant(response.data.restaurant);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, [id]);

    return (
        <div>
            {/* <Button as={Link} to="/" variant="primary">Back to Home</Button> */}
            {restaurant ? <RestaurantDetail restaurant={restaurant} /> : <p>Loading...</p>}
        </div>
    );
}

export default Detail;
