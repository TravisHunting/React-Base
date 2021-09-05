import React from 'react';
import loading from "../static/images/loading.gif";
import "../static/css/App.css";

export class ChessPuzzle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            puzzle: <img src={loading} style={{width:"50px", height:"50px"}}/>,
            puzzleText: "",
            loadingImg: <img src={loading} style={{width:"50px", height:"50px"}}/>,
        };
        this.getPuzzle = this.getPuzzle.bind(this);
    }


    getPuzzle() {
        var self = this;
        var url = 'https://chesspuzzle.net/Daily/Api';
        var method = "GET";

        fetch(url, {method: method}).then(function(response) {
            if (!response.ok) {
                console.log("Response not OK for Chess Puzzle API");
                return;
            }

            var rJson = response.json();
            return rJson;
            
        }).then(function(responseJson) {
            self.setState({puzzle: <img src={responseJson.Image}></img>});
            self.setState({puzzleText: responseJson.Text});
        }).catch(function(err) {
            console.log(err);
        })

    }

    componentDidMount() {
        this.getPuzzle();
    }


    render() {
        return (
            <div>
                <div>
                    {this.state.puzzle}
                </div>
                <div style={{textAlign:"center"}}>
                    {this.state.puzzleText}
                </div>
            </div>
        )
    }
}