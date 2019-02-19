import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import getCaretCoordinates from "textarea-caret";
import FloatingPanel from "./component/FloatingPanel";

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
      text: "",
      x: 0,
      y: 0,
      show: false,
     suggestions: []
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
        const suggestions = [];
        for (let index = 0; index < 10; index++) {
           suggestions[index] = data[index];
         
        }
        let caret = getCaretCoordinates(
          this.textarea.current,
          this.textarea.current.selectionEnd
        );
        this.setState({
          ...this.state,
          
          x: caret.left,
          y: caret.top,
          show: suggestions.length > 0,
          suggestions
        });
      });
  };
  
  takeInput = e => {
    this.setState({ text: e.target.value });
  };

  updateText = element => {
    const words = this.state.text.split(" ");
    let goodWords = "";
    for (let i = 0; i < words.length - 1; i++) {
      goodWords += words[i] + " ";
    }

    this.setState({
      ...this.state,
      text: goodWords + element,
      show: false
    });
  };

  countWords = () => {
    let textCount = this.state.text.length;  
    document.getElementById("div1").innerHTML = textCount;  
  }


  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.text.trim() !== this.state.text.trim() &&
      this.state.text[this.state.text.length - 1] !== " "
    ) {
      this.getWordPredictions();
      this.textarea.current.selectionEnd = this.textarea.current.value.length;
      this.textarea.current.focus();
    } else if (
      prevState.text !== this.state.text &&
      this.state.text[this.state.text.length - 1] === " "
    ) {
      this.setState({ ...this.state, show: false });
    }
  }
  
  render() {
    const {text,x,y,show,suggestions} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      <div style={{position:'relative'}}>
        <textarea
          onChange={this.takeInput}
          value={text}
          placeholder='Please enter your text here... :)'
          onKeyUp={this.countWords}
          ref={this.textarea}
        />    
        <FloatingPanel 
        x={x}
        y={y + 40}
        show={show}
        suggestions={suggestions}
        updateText={this.updateText}/>
      </div>
      <div id="div1"></div>
      </div>
      
    );
  }
}

export default App;
