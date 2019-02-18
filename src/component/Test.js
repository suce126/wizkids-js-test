import React, { Component } from "react";
import $ from "jquery";

export default class Test extends Component {
  addWWW = () => {
    $('textarea').append("this text was appended");
  };


  ppp = () => {
    $( "li" ).click(function() {
      var text = $( this ).text();
      $( "textarea" ).val( text );
    });
  }

  render() {
    return (
      <div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
        <textarea id="textarea" cols="30" rows="10" />
      </div>
    );
  }
}
