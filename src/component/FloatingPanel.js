import React, { Component } from "react";
import "./FloatingPanel.scss";

export default class FloatingPanel extends Component {
  render() {
    const { x, y, show, suggestions } = this.props; //suggestions, updateText
    return (
      <div
        className="FloatingPanel"
        style={{
          left: `${x}px`,
          top: `${y}px `,
          visibility: `${show ? "visible" : "hidden"}`
        }}
      >
        <ul>
          {suggestions.map((s, i) => {
            if (suggestions[i]) {
              return <li key={i} onClick={()=>this.props.updateText(s.toLowerCase())} >
              {s.toUpperCase()}
            </li>
            } else return null;
          })}
        </ul>
      </div>
    );
  }
}
