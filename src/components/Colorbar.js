import React from 'react';
import loading from "../static/images/loading.gif";
import "../static/css/App.css";
export class Colorbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: <img src={loading} style={{width:"50px", height:"50px"}}/>, 
            loadingImg: <img src={loading} style={{width:"50px", height:"50px"}}/>,
            colorData: []
        };

        this.displayColors = this.displayColors.bind(this);
        this.showColorPalette = this.showColorPalette.bind(this);
      } 
    
    showColorPalette(arrColor) {

        var colorDivs = arrColor.map(e => (
            <div className="grid-child" style={{backgroundColor:("rgb(" + e[0] + "," + e[1] + "," + e[2] + ")"), height:"10vh"}}> </div>
        )) 

        var display = (
            <div className="grid-container">
            {colorDivs}
            </div>
        )

        this.setState({content: display});
    }


    displayColors() {
        // http://colormind.io/api-access/
        // https://kigiri.github.io/fetch/ used to translate curl command to fetch
        // return format [[44,43,44],[90,83,82],....]
        
        // put up the loading icon while we wait for the request to come back
        this.setState({content:
        <div style={{display:"flex", justifyContent:"center", padding:"10px"}}>
        <img src={loading} style={{width:"50px", height:"50px"}}/>
        </div>
        });

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
                console.log("Response not 'OK' for Colorbar");
                } else {
                    console.log("returning response.json()");
                    return response.json();
                }

        }).then(function(responseJson) {
            // On successful response, transform the RGB values into JSX elements and display on screen
            self.showColorPalette(responseJson.result);
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
            <div>
                
                <div>
                    {this.state.content}
                </div>
                
                <div style={{textAlign:"center"}}>
                    <button onClick={this.displayColors.bind(this)} style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}>Refresh Colors</button>
                </div>

            </div>
        );
    }
}

