import React, { Component } from 'react';
import ImageSpace from './ImageSpace.js';
import InfoBox from './InfoBox.js';
import sammyURL from './sammy.gif';
import KaitaiStream from 'kaitai-struct/KaitaiStream';
import Gif from './Gif';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.changeGif = this.changeGif.bind(this);
    this.state = {
      schema: null
    };
  }

  componentDidMount() {
    fetch(sammyURL)
      .then(response => response.arrayBuffer())
      .then(this.changeGif)
      .catch(error => console.error(error));
  }

  changeGif(buffer) {
    let schema = this.processGif(buffer);
    console.log(buffer);
    this.setState({ schema });
  }

  processGif(arrayBuffer) {
    var data = new Gif(new KaitaiStream(arrayBuffer));
    return {
      "signature": data.hdr.magic,
      "version": data.hdr.version,
      "globalColorTable": data.globalColorTable.entries,
      "canvasWidth": data.logicalScreenDescriptor.screenWidth,
      "canvasHeight": data.logicalScreenDescriptor.screenHeight,
      "globalColorTableSize": data.logicalScreenDescriptor.flags & 0x8,
      "backgroundColorIndex": data.logicalScreenDescriptor.backgroundColorIndex,
      "pixelAspectRatio": data.logicalScreenDescriptor.pixelAspectRatio
    };
  }

  render() {
    const {schema} = this.state;
    console.log("Schema", schema);
    if (schema) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>GIF Explorer</h1>
          </header>
          <section className="gif-flexbox">
            <ImageSpace changeGif={this.changeGif}></ImageSpace>
            <InfoBox schema={schema}/>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default App;