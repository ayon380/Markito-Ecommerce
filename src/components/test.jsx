import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cards = [
  {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg",
    title: "Burgundy Flemming",
    subtitle: "Advertising",
  },
  {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample119.jpg",
    title: "Nigel Nigel",
    subtitle: "Sound & Vision",
  },
  {
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample120.jpg",
    title: "Caspian Bellevedere",
    subtitle: "Accounting",
  },
];

const Article = ({ data }) => {
  const { image, title, subtitle } = data;

  return (
    <figure className="snip1584">
      <img src={image} alt={title} />
      <figcaption>
        <h3>{title}</h3>
        <h5>{subtitle}</h5>
      </figcaption>
      <a href="#"></a>
    </figure>
  );
};

const News = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="news">
      <Slider {...settings}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index}>
              <Article data={item} />
            </div>
          ))
        ) : (
          <p>Please add some cards</p>
        )}
      </Slider>
      <strong className={`news__count ${data.length > 0 ? "" : "none"}`}>
        Total cards: {data.length}
      </strong>
    </div>
  );
};

const Test = () => {
  return (
    <div className="app container mx-auto mt-8 px-4">
      <h3 className="text-2xl font-bold mb-4">Cards</h3>
      <News data={cards} />
    </div>
  );
};

export default Test;
