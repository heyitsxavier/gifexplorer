import React, { Component } from 'react';
import './imagespace.css';
import Dropzone from 'react-dropzone'

class ImageSpace extends Component {
  constructor(props) {
    super(props);
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    let fileReader = new FileReader();
    let theFile = acceptedFiles[0];
    fileReader.onload = function(e) {
      let arrayBuffer = fileReader.result;
      this.props.changeGif(arrayBuffer);
    }
    fileReader.onload = fileReader.onload.bind(this);
    fileReader.readAsArrayBuffer(theFile);
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              className="image-space"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop files here...</p> :
                  <p>Try dropping some files here, or click to select files to upload.</p>
              }
            </div>
          )
        }}
      </Dropzone>
    );
  }
}

export default ImageSpace;