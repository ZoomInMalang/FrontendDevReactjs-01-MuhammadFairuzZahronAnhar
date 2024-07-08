import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

function RestaurantDetail() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await axios.get(`https://restaurant-api.dicoding.dev/detail/${id}`);
                if (response.data.error) {
                    setError(response.data.message);
                } else {
                    setRestaurant(response.data.restaurant);
                }
            } catch (error) {
                console.error('Error fetching restaurant details:', error);
                setError('Failed to fetch data');
            }
        };

        fetchRestaurantData();
    }, [id]);

    if (!restaurant) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // Function to format categories as comma-separated string
    const formatCategories = () => {
        return restaurant.categories.map(category => category.name).join(', ');
    };

    return (
        <>
            <div className="container mt-4">
                <Button as={Link} to="/" variant="primary mb-3" style={{ backgroundColor: "rgb(0, 43, 86)", borderRadius: "0px", color: "white", marginTop:"5px"}}>Back to Home</Button>
                <Card className="mb-4">
                    <Card.Body>
                        <Row>
                            <Col xs={12} md={6}>
                                <Image
                                    src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
                                    alt={restaurant.name}
                                    className="img-fluid"
                                    style={{ objectFit: 'cover' }}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <Card.Title as="h1" className="mb-3">{restaurant.name}</Card.Title>
                                <Card.Text>{restaurant.description}</Card.Text>
                                <Card.Text><strong>Address:</strong> {restaurant.address}, {restaurant.city}</Card.Text>
                                <Card.Text><strong>Rating:</strong></Card.Text>
                                <StarRatings
                                    rating={restaurant.rating}
                                    starRatedColor="rgb(0, 43, 86)"
                                    numberOfStars={5}
                                    starDimension="20px"
                                    starSpacing="1px"
                                />
                                <Card.Text style={{ marginTop: "5px" }}>Categories: {formatCategories()}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title as="h2">Menus:</Card.Title>
                        <Row>
                            <Col>
                                <Card.Text as="h3">Foods:</Card.Text>
                                <ul>
                                    {restaurant.menus.foods.map(food => (
                                        <li key={food.name}>{food.name}</li>
                                    ))}
                                </ul>
                            </Col>
                            <Col>
                                <Card.Text as="h3">Drinks:</Card.Text>
                                <ul>
                                    {restaurant.menus.drinks.map(drink => (
                                        <li key={drink.name}>{drink.name}</li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>


                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title as="h2">Customer Reviews:</Card.Title>
                        {restaurant.customerReviews.map((review, index) => (
                            <Card key={index} className="mb-3">
                                <Card.Body>
                                    <Card.Text><strong>{review.name}</strong> - {review.review}</Card.Text>
                                    <Card.Text><small>{review.date}</small></Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Card.Body>
                </Card>


            </div>
        </>
    );
}

export default RestaurantDetail;
