import React from 'react';
import loading from "../static/images/loading.gif";
import { Canvas } from "./Canvas.js"

import "../static/css/App.css";

// TODO:
// Figure out how to get rid of the "Each child in a list should have a unique key prop" warning
export class ColorbarAuto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "", 
            rows: [],
            rowLoading: "", 
            loadingImg: <img src={loading} style={{width:"50px", height:"50px"}}/>,
            canvas: <Canvas/>,
            posted: "",
            tries: 0,
            successes: 0,
            retreiveTimer: "",
            postTimer: "",
            colorData: []
        };

        this.info = <div style={{textAlign:"center", padding:"10px", fontSize:"small"}}>
        Press "Add A Random Color Row" to load a random color swatch <br/> <br/>
        Press "Add A Color Row Via API" to load a color palette from an external API <br/> <br/>
        Click individual color panels to randomize them <br/> <br/>
        Press "Choose file" to upload an image <br/> <br/>
        Click your image to reset its colors back to the original <br/> <br/>
        Press "Recolor Image" to scan through your image and <br/> replace all of its colors with those available in your color swatches
        </div>

      } 
    
    

    async addRow()  {
        let self = this;

        this.setState({
            content: ""
        })
         
        let loadingImg = <div style={{display:"flex", justifyContent:"center", padding:"10px"}}>
        <img src={loading} style={{width:"50px", height:"50px"}}/>
        </div>

        this.setState({ rowLoading: loadingImg })

        let rowData = await this.fetchColorData();

        if (rowData) {
        let colorDivs = rowData.map((e,idx) => (
            <div id={"colorPanel" + ( this.state.colorData.length + idx)} 
            className="grid-child" 
            style={{backgroundColor:("rgb(" + e[0] + "," + e[1] + "," + e[2] + ")"), height:"10vh"}} 
            //key={e, idx}
            onClick={self.randomizePanel.bind(this, "colorPanel" + ( this.state.colorData.length + idx), this.state.colorData.length + idx)}> </div>
        )) 

        rowData.forEach(function(e) {
            self.setState({
                colorData: [...self.state.colorData, e]
            })
        })

        let display = (
            <div className="grid-container">
            {colorDivs}
            </div>
        )
        
        this.setState({ rowLoading: "" })

        this.setState({ rows: [...this.state.rows, display] })
        } else {
            this.setState({ rowLoading: "Load Failed, Try Again" })
        }
    }

    addRandomRow() {
        let self = this;
        this.setState({
            content: ""
        })
        let rowData = []
        for (let i = 0; i < 5; i++) {
            rowData.push(
                [
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255)
                ]
            )
        }

        let colorDivs = rowData.map((e,idx) => (
            <div id={"colorPanel" + ( this.state.colorData.length + idx)} 
            className="grid-child" 
            style={{backgroundColor:("rgb(" + e[0] + "," + e[1] + "," + e[2] + ")"), 
            height:"10vh"}} 
            //key={"colorPanel" + ( this.state.colorData.length + idx)}
            onClick={self.randomizePanel.bind(this, "colorPanel" + ( this.state.colorData.length + idx), this.state.colorData.length + idx)}> 
            </div>
        )) 
        
        let temp = [...this.state.colorData]


        rowData.forEach(function(e) {
            temp.push(e)
        })

        self.setState({
            colorData: temp
        })

        let display = (
            <div className="grid-container">
            {colorDivs}
            </div>
        )
        
        this.setState({ rows: [...this.state.rows, display] })
    }

    randomizePanel(panelId, idx) {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        document.getElementById(panelId).style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")"
        document.getElementById(panelId).style.height = "10vh"

        let temp = [...this.state.colorData]
        temp[idx] = [red, green, blue];

        this.setState({
            colorData: temp
        })
    }

    async fetchColorData() {
        let self = this;
        let output = false;

        var url = "http://colormind.io/api/";
        var body = { model : "default" };
        var requestOptions = {
            body: JSON.stringify(body),
            method: "POST"
        }

        await fetch(url, requestOptions).then(
            function(response) {
                if (!response.ok) {
                // Catches HTML error responses
                console.log("Response not 'OK' for color fetching");
                } else {
                    return response.json();
                }

        }).then(function(responseJson) {
            // On successful response, transform the RGB values into JSX elements and display on screen
            output = responseJson.result;
        }).catch(function(err) {
            // Catches network and code errors (no connection etc)
            console.log(err);
        });

        return output;
    }

    reset() {
        this.setState({
            rows: [],
            colorData: [],
            content: this.info
        })
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
        this.setState({
            content: this.info
        })
    }

    imageRecolor() {
        console.log("image recolor firing:", this.state.colorData);
        this.setState({canvas: <Canvas colorData={this.state.colorData}/>}) 
    }

    render() {
        return (
            <div>
                
                <div style={{textAlign:"center", padding:"10px"}}>
                    {this.state.content}
                    {this.state.rows}
                    {this.state.rowLoading}
                </div>

                <div style={{textAlign:"center", padding:"10px"}}>
                    {this.state.canvas}
                </div>

                <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.addRandomRow.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}>
                        Add A Random Color Row
                    </button>
                </div>

                <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.addRow.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}>
                        Add A Color Row Via API
                    </button>
                </div>

                <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.imageRecolor.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}>
                        Recolor Image
                    </button>
                </div>

                <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.reset.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}>
                        Reset Color Rows
                    </button>
                </div>
                
                {/* <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.displayColors.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}>
                        Refresh Colors
                    </button>
                </div> */}

                {/* <div style={{textAlign:"center", padding:"10px"}}>
                    <button 
                        onClick={this.postColorData.bind(this)} 
                        style={{color:"black", fontWeight:"bold", fontSize:"large", padding:"10px"}}
                        title="You must have a server listening at http://localhost:5000/colorpost">
                        Post Color Data
                    </button>
                </div> */}

                {/* <div style={{textAlign:"center", padding:"10px"}}>
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
                </div> */}

            </div>
        );
    }
}

