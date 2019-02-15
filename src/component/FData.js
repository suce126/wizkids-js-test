import React, { Component } from "react";
import $ from "jquery";

// const params = {
//   locale: "da-DK",
//   text: ""
// };
//const urlParams = new URLSearchParams(Object.entries(params));
//const url = "https://services.lingapps.dk/misc/getPredictions?" //+ urlParams;
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
      text: " " 
    };
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
        let output = "<h3>Words</h3>";
        for (let index = 0; index < 10; index++) {
          const element = data[index];
          console.log(element);
          output += `
            <div>
              <h6>${element}</h6>
            </div>`;
        }

        document.getElementById("output").innerHTML = output;
      });
  };

  refreshPage = () => {
    window.location.reload();
  }
  // componentDidMount = () => {
  //   //console.log(this.state);
  //   let result = $("#textarea").val();
  //   this.setState.text = result;
  // };

  getJq = () => {
    let result = $("#textarea").val();
    console.log(result);
    this.setState ({
      text: result
    })
    console.log(this.state);
    alert(result);
  }

 


  render() {
    return (
      <div>
        <textarea id="textarea" />
        <div id="output" />
        <button onClick={this.getWordPredictions}>Word Predictions</button>
        <button value="Refresh Page" onClick={this.refreshPage}>Clear</button>
        <button onClick={this.getJq}>Get Value</button>
      </div>
    );
  }
}


//  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
// <script> 
//      $("#textarea").keydown(function() {
//           let result = $("#textarea").val();
//           console.log(result);
//           this.setState({
//             text: result
//           });
//           console.log(...this.state);
//         }
// </script>