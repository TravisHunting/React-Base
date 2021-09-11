import React from 'react';
import loading from "../static/images/loading.gif";
import "../static/css/App.css";
export class ColorbarAuto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: <img src={loading} style={{width:"50px", height:"50px"}}/>, 
            loadingImg: <img src={loading} style={{width:"50px", height:"50px"}}/>,
            posted: "",
            tries: 0,
            successes: 0,
            retreiveTimer: "",
            postTimer: "",
            colorData: []
        };
      } 
    
    showColorPalette(arrColor) {
        // TODO: Add unique "key" prop to each child in the list
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
        // 1 outer array, 5 inner arrays
        // inner arrays contain 3 integers within range 0-255 inclusive
        
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
                    return response.json();
                }

        }).then(function(responseJson) {
            // On successful response, transform the RGB values into JSX elements and display on screen
            self.setState({colorData : responseJson.result})
            self.showColorPalette(responseJson.result);
        }).catch(function(err) {
            // Catches network and code errors (no connection etc)
            console.log(err);
        });

    }

    postColorDataAuto() {
        this.postColorData();
        this.displayColors();
        let self = this;
        this.setState({ postTimer: setInterval(() => self.postColorData(), 3000) });
        this.setState({ retreiveTimer: setInterval(() => self.displayColors(), 3000) });
    }

    stopAutoPosting() {
        clearInterval(this.state.retreiveTimer);
        clearInterval(this.state.postTimer);
    }

    postColorData() {
        let colorData = this.state.colorData;
        console.log(colorData);
        let self = this;

        if (colorData.length != 5) {
            console.log("Color array incorrect size");
            return;
        }

        colorData.forEach(element => {
            if (element.length != 3) {
                console.log("Color element of incorrect length:");
                console.log(element);
                return;
            }
        });
        
        // set loading icon while we wait
        this.setState({posted: this.state.loadingImg})

        let _id = "";
        colorData.forEach(panel => panel.forEach(function(value) {
            _id = _id + value + ".";
        }));
        _id = _id.substring(0, _id.length - 1);

        console.log("Generated ID from colorData:");
        console.log(_id);

        let palette = {
            _id: _id,
            raw: colorData,
            panel1: {
                red: colorData[0][0],
                green: colorData[0][1],
                blue: colorData[0][2]
            },
            panel2: {
                red: colorData[1][0],
                green: colorData[1][1],
                blue: colorData[1][2]
            },
            panel3: {
                red: colorData[2][0],
                green: colorData[2][1],
                blue: colorData[2][2]
            },
            panel4: {
                red: colorData[3][0],
                green: colorData[3][1],
                blue: colorData[3][2]
            },
            panel5: {
                red: colorData[4][0],
                green: colorData[4][1],
                blue: colorData[4][2]
            }
        }

        let url = "http://localhost:5000/colorpost";
        let data = palette;
        let requestOptions = {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            method: "POST"
        }

        self.setState({tries: self.state.tries + 1})

        fetch(url, requestOptions).then(
            function(response) {
                if (!response.ok) {
                // Catches HTML error responses
                console.log("Response not 'OK' for Colorbar Post");
                console.log("response: ", response);
                } else {
                    return response.json();
                }

        }).then(function(responseJson) {
            // On successful response, transform the RGB values into JSX elements and display on screen
            console.log("Response JSON : ");
            console.log(responseJson);
            //console.log(responseJson.success);
            if (responseJson.success) {
                self.setState({successes: self.state.successes + 1})
            }
            self.setState({posted : responseJson.body})
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
                
                <div style={{textAlign:"center", padding:"10px"}}>
                    {this.state.content}
                </div>
                
                <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.displayColors.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}>
                        Refresh Colors
                    </button>
                </div>

                <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.postColorData.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}
                        title="You must have a server listening at http://localhost:5000/colorpost">
                        Post Color Data
                    </button>
                </div>

                <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.postColorDataAuto.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}
                        title="You must have a server listening at http://localhost:5000/colorpost">
                        Post Color Data Auto
                    </button>
                </div>

                <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.stopAutoPosting.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}>
                        Stop Auto-Posting
                    </button>
                </div>

                <div style={{textAlign:"center", padding:"10px"}}>
                    {this.state.posted}
                </div>

                <div style={{textAlign:"center"}}>
                    Attempts made: {this.state.tries}
                </div>

                <div style={{textAlign:"center"}}>
                    Successes: {this.state.successes}
                </div>

            </div>
        );
    }
}

