import React, { useState } from 'react';
import loading from "../static/images/loading.gif";

export class Colorbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: <img src={loading} style={{width:"50px", height:"50px"}}/>, 
            colorData: []
        };

        this.displayColors = this.displayColors.bind(this);
      } 

    displayColors() {
        // http://colormind.io/api-access/
        // https://kigiri.github.io/fetch/ used to translate curl command to fetch
        // return format [[44,43,44],[90,83,82],....]
        
        // Necessary - otherwise 'this' loses track of context
        const self = this;

        var url = "http://colormind.io/api/";
        var body = { model : "default" };
        var requestOptions = {
            body: JSON.stringify(body),
            method: "POST"
        }

        fetch(url, requestOptions).then(
            function(response) {
                if (!response.ok) {
                // Catches HTML error responses
                console.log("Response not ok, returning to Logo screen");
                } else {
                    console.log("returning response.json()");
                    return response.json();
                }

        }).then(function(responseJson) {
            // TODO: set state for content to some HTML that will render the colors in the array
            // Right now we just get to view the unformatted array of RGB values
            self.setState({content: responseJson.result});
        }).catch(function(err) {
            // Catches network and code errors (no connection etc)
            console.log(err);
        });

    }

    componentDidMount() {
        this.displayColors();
    }

    render() {
        return (
            <div>{this.state.content}</div>
        );
    }
}

