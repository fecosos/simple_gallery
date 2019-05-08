import React from "react";
import "./App.scss";
import image from "./assets/01.jpg";
import arrow_right from "./assets/arrow-right.png";
import arrow_left from "./assets/arrow-left.png";

function Gallery() {
  return (
    <div className="Gallery">
      <button className="button left">
        <img src={arrow_left} className="arrow left" alt="arrow left" />
      </button>
      <img src={image} className="gallery-image" alt="logo" />
      <button className="button right">
        <img src={arrow_right} className="arrow right" alt="arrow right" />
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">página web en construcción</header>
      <Gallery />
      <section className="footer">
        <span className="text">encontranos en </span>
        <a
          className="instagram-link a-link"
          href="//instagram.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          instagram
        </a>
        <span className="slash">—</span>
        <span className="email-link a-link">info.ripani@gmail.com</span>
      </section>
    </div>
  );
}

export default App;
