import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import arrow_right from "./assets/arrow-right.png";
import arrow_left from "./assets/arrow-left.png";
import { imagesUrls } from "./assets/gallery";

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

function Gallery() {
  const [imageOpacity, setImageOpacity] = useState(0);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setImageOpacity(1);
    }, 500);
  }, []);

  const fadeOutImage = () =>
    new Promise(function(resolve, reject) {
      setImageOpacity(0);
      setTimeout(() => {
        setImageOpacity(1);
        resolve();
      }, 400);
    });

  const handlePreviousImage = async () => {
    await fadeOutImage();
    if (currentImage !== 0) {
      setCurrentImage(currentImage - 1);

      return;
    }

    setCurrentImage(imagesUrls.length - 1);
  };

  const handleNextImage = async () => {
    await fadeOutImage();

    if (currentImage !== imagesUrls.length - 1) {
      setCurrentImage(currentImage + 1);

      return;
    }

    setCurrentImage(0);
  };

  const buttonStyles = {
    display: isMobile() ? "none" : "block"
  };

  const calc = (x, y) => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2
  ];
  const trans1 = (x, y) => `translate3d(${x / 60}px,${y / 70}px,0)`;

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  const imageStyles = {
    opacity: imageOpacity,
    transform: props.xy.interpolate(trans1)
  };

  return (
    <div
      className="Gallery"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <div
        id="hover-button-left"
        style={buttonStyles}
        onClick={handlePreviousImage}
        className="button-left"
      />
      <div
        id="hover-button-right"
        style={buttonStyles}
        onClick={handleNextImage}
        className="button-right"
      />
      <button className="button left" onClick={handlePreviousImage}>
        <img src={arrow_left} className="arrow left" alt="arrow left" />
      </button>
      <animated.div style={imageStyles} className="images">
        <img
          src={imagesUrls[currentImage]}
          alt={`Trabajos realizados ${currentImage + 1}`}
        />
      </animated.div>
      <button className="button right" onClick={handleNextImage}>
        <img src={arrow_right} className="arrow right" alt="arrow right" />
      </button>
    </div>
  );
}

export default Gallery;
