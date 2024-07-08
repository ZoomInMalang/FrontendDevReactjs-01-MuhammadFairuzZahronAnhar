import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

function RestaurantList({ restaurants }) {
  const [categories, setCategories] = useState({});
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailsRequests = restaurants.map(restaurant =>
          axios.get(`https://restaurant-api.dicoding.dev/detail/${restaurant.id}`)
        );
        const detailsResponses = await Promise.all(detailsRequests);
        
        const fetchedCategories = {};
        const fetchedStatuses = {};
        
        detailsResponses.forEach(response => {
          const { id, categories, isOpen } = response.data.restaurant;
          fetchedCategories[id] = categories.map(category => category.name);
          fetchedStatuses[id] = isOpen ? 'Open' : 'Closed';
        });
        
        setCategories(fetchedCategories);
        setStatuses(fetchedStatuses);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [restaurants]);

  return (
    <div className="container">
      {restaurants.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "5px" }}>No restaurants found</p>
      ) : (
        <Row>
          {restaurants.map(restaurant => (
            <Col key={restaurant.id} md={3} className="mb-3">
              <Card>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
                    alt={restaurant.name}
                    style={{ objectFit: 'cover', width: '100%', height: '275px' }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <StarRatings
                    rating={restaurant.rating}
                    starRatedColor="rgb(0, 43, 86)"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                  />
                  {categories[restaurant.id] && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                      <p style={{ margin: 0 }}>
                        {categories[restaurant.id].join(', ')}
                      </p>
                      <p style={{ color: statuses[restaurant.id] === 'Open' ? 'green' : 'red', margin: 0 }}>
                        {statuses[restaurant.id]}
                      </p>
                    </div>
                  )}
                  <Link to={`/detail/${restaurant.id}`}>
                    <Button variant="primary" className='detail-button' style={{ backgroundColor: "rgb(0, 43, 86)", borderRadius: "0px", color: "white", width: "100%", marginTop: "5px" }}>
                      Learn More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default RestaurantList;
