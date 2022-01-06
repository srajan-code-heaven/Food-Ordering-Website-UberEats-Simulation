/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { FavoriteOutlined, Visibility } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import Slider from 'react-slick';
import LeftArrow from '../../../images/left-arrow.svg';
import RightArrow from '../../../images/right-arrow.svg';
import { addOrRemoveFavorite } from '../../../state/action-creators/loginActions';

export default function Card({ title, data, allRestaurantMenu }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };

  const handleFavoriteToggle = (item, index) => {
    if (item.IsFavorite === 'true') {
      document.getElementById(`favorite-${index}`).style.color = 'grey';
      dispatch(addOrRemoveFavorite(item.RestaurantId, 'false'));
    } else {
      document.getElementById(`favorite-${index}`).style.color = 'red';
      dispatch(addOrRemoveFavorite(item.RestaurantId, 'true'));
    }
  };

  const handleGoToProfile = (item, dishes) => {
    history.push({
      pathname: '/customer/restaurantView',
      state: { restoDetails: item, dishes },
    });
  };
  return (
    <div className="card__container">
      <h3>{title}</h3>
      <Slider {...settings} className="card__container--inner">
        {data.map((item, index) => (
          <div
            className="card__container--inner--card"
            key={index}
          >
            <img src={item.url} alt="hero_img" />
            <div className="card__container--inner--card--date_time" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton onClick={() => { handleFavoriteToggle(item, index); }}>
                <FavoriteOutlined id={`favorite-${index}`} style={{ color: item.IsFavorite === 'true' ? 'red' : 'grey' }} />
              </IconButton>
              <h6 style={{ color: 'black' }}>{item.RestaurantName}</h6>
              <IconButton onClick={() => {
                const dishes = [];
                allRestaurantMenu.map((element) => {
                  if (element.RestaurantId === item.RestaurantId) {
                    dishes.push(element);
                  }
                  return true;
                });
                handleGoToProfile(item, dishes);
              }}
              >
                <Visibility />
              </IconButton>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

Card.propTypes = {
  // ...prop type definitions here
  title: PropTypes.any,
  data: PropTypes.any,
  allRestaurantMenu: PropTypes.any,
};
