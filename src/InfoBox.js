import React, { Component } from 'react';
import './infobox.css';

class InfoBox extends Component {
  ColorTable(args) {
    let colors = args.colors;
    let trs = [];
    if (colors) {
      let tds = colors.map((color, index) => {
        let hex = [color.red, color.green, color.blue].map(c => c.toString(16)).join("");
        const style = {
          backgroundColor: "#" + hex
        };
        return (
          <td style={style}>
            <span className="tooltip">
              <p>Index: {index}</p>
              <p>Hex: #{hex}</p>
              <p>Red: {color.red}</p>
              <p>Green: {color.green}</p>
              <p>Blue: {color.blue}</p>
            </span>
          </td>
        );
      });
      let n = Math.sqrt(colors.length);
      trs = [];
      for (let i = 0; i < n; i++) {
        let slice = tds.slice(i * n, i * n + n);
        trs.push(<tr>{slice}</tr>);
      }
    }
    return <table className="color-table"> <tbody> {trs} </tbody> </table>
  }

  render() {
    let schema = this.props.schema;
    return (
      <div className="info-box">
        <h3>Decoded</h3>
        <section className="info-stats">
          <ul>
            <li>Signature: {this.props.signature}</li>
            <li>Version: {this.props.version}</li>
            <li>Canvas Width: {this.props.canvasWidth}</li>
            <li>Canvas Height: {this.props.canvasHeight}</li>
          </ul>
        </section>
        <h3>Global Color Table</h3>
        <this.ColorTable colors={schema.globalColorTable} />
      </div>
    );
  }
}

export default InfoBox;

