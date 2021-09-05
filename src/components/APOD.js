import React from 'react';
import loading from "../static/images/loading.gif";
import "../static/css/App.css";

export class APOD extends React.Component {
    // Reference: https://api.nasa.gov/
    // Note: Normally you would keep your API key hidden and read it from an environment variable or something

    constructor(props) {
        super(props);
        this.state = {
            api_key: "BJA0YkRpMfHqJ5MBXTdPZEIaLDfsoz3QNqeD7HJe",
            pageContent: <img src={loading} style={{width:"50px", height:"50px"}}/>,
            explanation: "",
            copyright: ""
        };
        this.getAPOD = this.getAPOD.bind(this);
    }

    // Don't need to set this as a state variable because it will never need updating
    baseURL = "https://api.nasa.gov/planetary/apod"

    getAPOD() {
        var self = this;
        var method = "GET";
        var url = this.baseURL + "?api_key=" + this.state.api_key;
        // TODO: if (param_provided) {extend url}
        
        fetch(url, {method: method}).then(
            function(response) {
                if (!response.ok) {
                    // Catches HTML error responses
                    console.log("Response not 'OK' for APOD");
                } else {
                    console.log("returning response.json()");
                    //console.log(response.json());
                    return response.json();
                }
            }
        ).then(function(responseJson) {
            console.log(responseJson.url);
            //self.setState({explanation: responseJson.explanation}); 
            self.setState({pageContent: <img src={responseJson.url} alt={responseJson.explanation} title={responseJson.explanation} style={{maxHeight:"50vh"}}></img>});
            self.setState({copyright: responseJson.copyright}); 
        }
        ).catch(function(err) {
            console.log(err);
        })

    }

    componentDidMount() {
        this.getAPOD();
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.pageContent}
                </div>
                {/* <div style={{fontSize:"10px"}}>
                    {this.state.explanation}
                </div> */}
                <div style={{textAlign:"center"}}>
                    {this.state.copyright}
                </div>
            </div>
        )
    }
}


// Response Format
// {
// "copyright":"Dennis Huff",
// "date":"2021-09-04",
// "explanation":"Not the Hubble Space Telescope's latest view of a distant galactic nebula, this illuminated cloud of gas and dust dazzled early morning spacecoast skygazers on August 29. The snapshot was taken at 3:17am from Space View Park in Titusville, Florida. That's about 3 minutes after the launch of a SpaceX Falcon 9 rocket on the CRS-23 mission to resupply the International Space Station. It captures drifting plumes and exhaust from the separated first and second stage of the rocket rising through still dark skies. The lower bright dot is the second stage continuing on to low Earth orbit. The upper one is the rocket's first stage performing a boostback burn. Of course the first stage booster returned to make the first landing on the latest autonomous drone ship to arrive in the Atlantic, A Short Fall of Gravitas.",
// "hdurl":"https://apod.nasa.gov/apod/image/2109/DSC06988copy2.jpg",
// "media_type":"image",
// "service_version":"v1",
// "title":"A Falcon 9 Nebula",
// "url":"https://apod.nasa.gov/apod/image/2109/DSC06988copy2_1024.jpg"
// }