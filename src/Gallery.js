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

  const [isGalleryRunning, setGalleryRunning] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setImageOpacity(1);
    }, 500);
  }, []);

  useEffect(() => {
    let interval;
    if (isGalleryRunning) {
      interval = setInterval(() => {
        handleNextImage();
      }, 6000);
    }

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      setImageOpacity(1);
    }, 100);
  }, [currentImage]);

  const handlePreviousImage = () => {
    if (currentImage !== 0) {
      setCurrentImage(currentImage - 1);

      return;
    }

    setCurrentImage(imagesUrls.length - 1);
  };

  const handleNextImage = () => {
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
  const trans1 = (x, y) =>
    `translate3d(${Math.floor(x / 60)}px,${Math.floor(y / 70)}px,0)`;

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  const imageStyles = {
    opacity: imageOpacity,
    transform: props.xy.interpolate(trans1)
  };

  const mobileButtonsStyles = {
    display: !isMobile() ? "none" : "block"
  };

  return (
    <div
      className="Gallery"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      onMouseEnter={() => setGalleryRunning(false)}
      onMouseLeave={() => setGalleryRunning(true)}
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
      <button
        className="button left"
        style={mobileButtonsStyles}
        onClick={handlePreviousImage}
      >
        <img src={arrow_left} className="arrow left" alt="arrow left" />
      </button>
      <animated.div style={imageStyles} className="images">
        {imagesUrls.map((image, index) => {
          return (
            <img
              style={{ opacity: `${index === currentImage ? 1 : 0}` }}
              src={image}
              key={index}
              alt={`Trabajos realizados ${currentImage + 1}`}
            />
          );
        })}
      </animated.div>
      <button
        className="button right"
        style={mobileButtonsStyles}
        onClick={handleNextImage}
      >
        <img src={arrow_right} className="arrow right" alt="arrow right" />
      </button>
    </div>
  );
}

export default Gallery;
