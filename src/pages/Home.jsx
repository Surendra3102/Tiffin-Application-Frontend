import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./Home.css";

const Home = () => {
  const reviewSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const reviews = [
    "Fantastic tiffin service! The meals are always delicious and delivered on time.",
    "Affordable and healthy meals. Perfect for students like me.",
    "The quality and taste remind me of home. Highly recommend!",
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Delicious Homemade Meals</h1>
          <div className="hero-buttons">
            <Link to="/menu" className="btn primary">View Menu</Link>
            <Link to="/order" className="btn outline">Place Order</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/banner.jpg" alt="Tiffin Service" />
        </div>
      </section>

      <section className="info-section">
        <div className="about">
          <h2>About</h2>
          <p>
            Suri Tiffin Service has been serving our village for over 20 years, known for its delicious, hygienic, and affordable breakfast.
            Located near three schools, it’s the go-to place for students and nearby villagers who enjoy the taste and quality of our food. 
            We prepare a variety of items like idly, bonda, dosa, egg dosa, plain dosa, and different chutneys using fresh and nutritious ingredients. Our friendly service makes every customer feel like family, and that’s why people keep coming back. It’s not just food—it’s a daily tradition filled with care and flavor.
          </p>
        </div>
        <div className="contact">
          <h2>Contact Us</h2>
          <p>📞 8106679878</p>
          <p>📧 appanagirisurendra@gmail.com</p>
          <p>📍 Otturu, Kavali, Andhra Pradesh, 524201</p>
        </div>
      </section>

      <section className="reviews-section">
        <h2>Reviews</h2>
        <Slider {...reviewSettings}>
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p>{review}</p>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Home;
