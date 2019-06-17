import React from "react";
import Gallery from "./Gallery";
import Footer from "./Footer";

import "./App.scss";

class App extends React.Component {
  state = {
    loaded: false
  };

  render() {
    return (
      <div className="App" onMouseMove={this.handleMouseMove}>
        <Gallery />
        <Footer />
      </div>
    );
  }
}

export default App;
