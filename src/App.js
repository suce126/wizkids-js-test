import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";
import getCaretCoordinates from "textarea-caret";

var myHeaders = new Headers();
myHeaders.set(
  "Authorization",
  "Bearer MjAxOS0wMi0wMQ==.dGVzdEBleGFtcGxlLmNvbQ==.MjExMWMyYjdjZGY3YTU3MmU4MTA5OWY0MDgyMmM0OTk="
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "en-GB",
      text: ""
      // x: 0,
      // y: 0,
      // show: false,
     //suggestions: []
    };
    this.textarea = React.createRef();
  }

  //  Get word predictions from API
  getWordPredictions = () => {
    const urlParams = new URLSearchParams(Object.entries(this.state));
    const url = "https://services.lingapps.dk/misc/getPredictions?" + urlParams;
    fetch(url, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        let output = "";
        for (let index = 0; index < 10; index++) {
          const element = data[index];
          if (element !== undefined) {
            output += `
            <ul id='select'>
              <li id='selectText'>${element}</li>
            </ul>`;
          }
        }
        document.getElementById("output").innerHTML = output;
      });
  };

  getWordsFromTextArea = () => {
    let result = $("textarea").val();
    this.setState({
      text: result
    });
    this.getWordPredictions();

    
  };

  // aaa = () => {
  //   let result1 = $('#selectText').val();
  //   this.setState({
  //     text: result1
  //   });
  //   this.getWordPredictions();
  // }

  // bbbb = () => {
  //   this.getWordsFromTextArea();
  //   this.aaa();
  // }

  // updateText = element => {
  //   const words = this.state.text.split(" ");
  //   let goodWords = "";
  //   for (let i = 0; i < words.length - 1; i++) {
  //     goodWords += words[i] + " ";
  //   }

  //   this.setState({
  //     ...this.state,
  //     text: goodWords + element,
  //     show: false
  //   });
  // };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.text.trim() !== this.state.text.trim() &&
      this.state.text[this.state.text.length - 1] !== " "
    ) {
      this.getWordPredictions();
      this.textarea.current.selectionEnd = this.textarea.current.value.length;
      this.textarea.current.focus();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
        </header>

        <textarea
          id="textarea"
          onChange={this.getWordsFromTextArea}
          updateText={this.updateText}
          ref={this.textarea}

        />

        <div id="output" />
      </div>
    );
  }
}

export default App;
