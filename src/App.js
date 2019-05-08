import React from "react";
import "./App.scss";
import arrow_right from "./assets/arrow-right.png";
import arrow_left from "./assets/arrow-left.png";
import { imagesUrls } from "./assets/gallery";

// const Images = () => <div> {imagesUrls.map(path => <img key={path} src={path} alt="" />)}</div>;

class Gallery extends React.Component {
  state = {
    currentImage: 0
  };

  handlePreviousImage = () => {
    const { currentImage } = this.state;
    if (currentImage !== 0) {
      this.setState({
        currentImage: currentImage - 1
      });

      return;
    }

    this.setState({ currentImage: imagesUrls.length - 1 });
  };

  handleNextImage = () => {
    const { currentImage } = this.state;
    if (currentImage !== imagesUrls.length - 1) {
      this.setState({
        currentImage: currentImage + 1
      });

      return;
    }

    this.setState({ currentImage: 0 });
  };

  render() {
    const { currentImage } = this.state;
    console.log(currentImage);

    return (
      <div className="Gallery">
        <button className="button left" onClick={this.handlePreviousImage}>
          <img src={arrow_left} className="arrow left" alt="arrow left" />
        </button>
        <div className="images">
          <img src={imagesUrls[currentImage]} alt="" />
        </div>
        <button className="button right" onClick={this.handleNextImage}>
          <img src={arrow_right} className="arrow right" alt="arrow right" />
        </button>
      </div>
    );
  }
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
