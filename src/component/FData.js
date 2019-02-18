import React, { Component } from "react";
import $ from "jquery";
import getCaretCoordinates from "textarea-caret";
import FloatingPanel from "./FloatingPanel";

var myHeaders = new Headers();
myHeaders.set(
  "Authorization",
  "Bearer MjAxOS0wMi0wMQ==.dGVzdEBleGFtcGxlLmNvbQ==.MjExMWMyYjdjZGY3YTU3MmU4MTA5OWY0MDgyMmM0OTk="
);

export default class FData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "en-GB",
      text: "",
      // x: 0,
      // y: 0,
      // show: false,
      // suggestions: []
    };
    // this.textarea = React.createRef();
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
          output +=`
            <ul id='select'>
              <li id='selectText'>${element}</li>
            </ul>`;
        }
        document.getElementById("output").innerHTML = output;
      });
  };

  getWordsFromTextArea = () => {
    let result = $("textarea").val();
    console.log(result);
    
    this.setState({
      ...this.state,
      text: result
    });
    this.getWordPredictions();

   
  };

//   addWords = () => {
//   $("#textarea").val((_, oldValue) => {
//     return oldValue + $('#selectText').val();
//  });
//   }

//   addWWW = () => {
//     $('li').on('change',function(){
//       var test = this;
//       $('#textarea').val(function(_,v){
//           console.log(v + ' ' + test.value);
          
//           return v + test.value;
//       })
//      })
//   }

//   ttttt = () => {
//     this.getWordsFromTextArea();
//     this.addWWW();
//   }

//   setSuggestion = async () => {
//     const rawSuggestions = await this.getWordPredictions();
//     let suggestions = [];
//     for (let i = 0; i < 10; i++) {
//       if (rawSuggestions && rawSuggestions[i]) {
//         suggestions[i] = rawSuggestions[i];
//       }
//     }
//     let caret = getCaretCoordinates(
//       this.textarea.current,
//       this.textarea.current.selectionEnd
//     );
//     this.setState({
//       ...this.state,
//       x: caret.left,
//       y: caret.top,
//       show: suggestions.length > 0,
//       suggestions
//     });
//   };

//   updateText = suggestion => {
//     const words = this.state.text.split(" ");
//     let goodWords = "";
//     for (let i = 0; i < words.length - 1; i++) {
//       goodWords += words[i] + " ";
//     }
//     this.setState({
//       ...this.state,
//       text: goodWords + suggestion,
//       show: false
//     });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.text.trim() !== this.state.text.trim() &&
//       this.state.text[this.state.text.length - 1] !== " "
//     ) {
//       this.setSuggestion();
//       this.textarea.current.selectionEnd = this.textarea.current.value.length;
//       this.textarea.current.focus();
//     } else if (
//       prevState.text !== this.state.text &&
//       this.state.text[this.state.text.length - 1] === " "
//     ) {
//       this.setState({ ...this.state, show: false });
//     }
//   }

  

  render() {
    const {x,y,show,suggestions,updateText,text} = this.state;
    return (
      <div>
        <textarea
          id="textarea"
          onChange={this.getWordsFromTextArea}
          //onChange={this.takeInput}
         // onChange={this.ttttt}
          // value={text}
          // ref={this.textarea}
        />
        {/* <FloatingPanel
          x={x + 20}
          y={y + 30}
          show={show}
          suggestions={suggestions}
          updateText={updateText}
        /> */}
        <div id="output" />
        
      </div>
    );
  }
}
