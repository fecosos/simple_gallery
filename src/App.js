import React from "react";
import Gallery from "./Gallery";

import "./App.scss";

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
