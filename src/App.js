import React from "react";
import "./App.scss";
import arrow_right from "./assets/arrow-right.png";
import arrow_left from "./assets/arrow-left.png";
import { imagesUrls } from "./assets/gallery";
import debounce from "lodash/debounce";
// const Images = () => <div> {imagesUrls.map(path => <img key={path} src={path} alt="" />)}</div>;

const isMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }
  return false;
};

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedMouseMove = debounce(this.debouncedMouseMove.bind(this), 1);
  }
  state = {
    currentImage: 0,
    mouseDistanceFromCenter: 0,
    imageOpacity: 0,
    loaded: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        imageOpacity: 1,
        loaded: true
      });
    }, 500);
  }

  // handleFadeAndNext = nextOrPrevFunction => {
  //   this.setState({ imageOpacity: 0 })

  //   setTimeout(() => {
  //     nextOrPrevFunction();
  //     this.setState({ imageOpacity: 1 })
  //   }, 1000);
  // }

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

  handleMouseMove = event => {
    event.persist();
    this.debouncedMouseMove(event);
  };

  debouncedMouseMove = event => {
    // this.setState({ mouseX: event.clientX })
    //
    const lowerMovementRate = movement => Math.floor(movement * 0.015);
    if (event.target.id === "hover-button-left") {
      const mouseDistanceFromCenter = event.target.offsetWidth - event.clientX;
      this.setState({
        mouseDistanceFromCenter: -lowerMovementRate(mouseDistanceFromCenter)
      });
    }
    if (event.target.id === "hover-button-right") {
      const mouseDistanceFromCenter = event.clientX - event.target.offsetWidth;
      this.setState({
        mouseDistanceFromCenter: lowerMovementRate(mouseDistanceFromCenter)
      });
    }
  };

  render() {
    const { currentImage, imageOpacity } = this.state;

    const buttonStyles = {
      display: isMobile() ? "none" : "block"
    };

    const imageStyles = {
      opacity: imageOpacity,
      transform: `translateX(${this.state.mouseDistanceFromCenter}px)`
    };

    return (
      <div className="Gallery">
        <div
          id="hover-button-left"
          style={buttonStyles}
          onClick={this.handlePreviousImage}
          onMouseMove={this.handleMouseMove}
          className="button-left"
        />
        <div
          id="hover-button-right"
          style={buttonStyles}
          onClick={this.handleNextImage}
          onMouseMove={this.handleMouseMove}
          className="button-right"
        />
        <button className="button left" onClick={this.handlePreviousImage}>
          <img src={arrow_left} className="arrow left" alt="arrow left" />
        </button>
        <div style={imageStyles} className="images">
          <img
            src={imagesUrls[currentImage]}
            alt={`Trabajos realizados ${currentImage + 1}`}
          />
        </div>
        <button className="button right" onClick={this.handleNextImage}>
          <img src={arrow_right} className="arrow right" alt="arrow right" />
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    loaded: false
  };

  // setMouseXY()
  // handleMouseMove = (event) => {
  //   this.setState({
  //     mouseX: event.clientX,
  //     mouseY: event.clientY
  //   })
  // };

  render() {
    return (
      <div className="App" onMouseMove={this.handleMouseMove}>
        <header className="App-header">
          <h1>página web en construcción</h1>
        </header>
        <Gallery />
        <section className="footer">
          <span className="text">encontranos en </span>
          <a
            className="instagram-link a-link"
            href="https://www.instagram.com/estudio.ripani/"
            rel="noopener noreferrer"
            target="_blank"
          >
            instagram
          </a>
          <span className="slash">—</span>
          <a
            href="mailto:info.ripani@gmail.com"
            className="email-link a-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            info.ripani@gmail.com
          </a>
        </section>
      </div>
    );
  }
}

export default App;
