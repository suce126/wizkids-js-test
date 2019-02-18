import React, { Component } from "react";
import "./FloatingPanel.scss";

export default class FloatingPanel extends Component {
  render() {
    const { x, y, show,  } = this.props;//suggestions, updateText
    return (
      <div
        className="FloatingPanel"
        style={{
          left: `${x}px`,
          top: `${y}px `,
          visibility: `${show ? "visible" : "hidden"}`
        }}
      >
        {/* <ul>
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => updateText(s.toLowerCase())}>
              {s.toLowerCase()}
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}
