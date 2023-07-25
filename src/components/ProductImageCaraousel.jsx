import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="max-w-xl mx-auto">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Product Image ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageCarousel;
