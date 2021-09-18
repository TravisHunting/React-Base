import React from 'react';
import slime from "../static/images/slime_small.jpg";

 
export class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            colorData: props.colorData || false,
            imgSource: {slime}
        }
        // References allow us to access our elements, as if we were using document.GetELementByID (or whatever)
        this.canvasRef = React.createRef();
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d")
        const img = this.imageRef.current;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            //img.src = "";
        }
    }

    // Necessary to update state from props
    static getDerivedStateFromProps(props, state) {
        if (props.colorData != state.colorData) {
            return {colorData: props.colorData};
        }
        return null;
    }

    // Runs when we pass new props to this component
    componentDidUpdate() {

        console.log("coloradata from canvas: ", this.state.colorData)

        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d")
        const img = this.imageRef.current;

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        console.log("Prior image data: ", imageData);

        if (this.state.colorData) {
            
            for (let i = 0; i < imageData.data.length; i+=4) {
                let pixel = [imageData.data[i], imageData.data[i+1], imageData.data[i+2]];
                //console.log("a: ", pixel)
                let closestColorIdx = this.comparePixelToColorDataArray(pixel, this.state.colorData);
                //console.log("b: ", this.state.colorData[closestColorIdx])
                //console.log(closestColorIdx)
                imageData.data[i] = this.state.colorData[closestColorIdx][0];
                imageData.data[i+1] = this.state.colorData[closestColorIdx][1];
                imageData.data[i+2] = this.state.colorData[closestColorIdx][2];

                
            }


            //console.log("post image data: ", imageData);
            ctx.putImageData(imageData, 0, 0);


            
        }

    }

    comparePixelToColorDataArray(pixelData, colorData) {
        let differences = [];

        for (let i = 0; i < colorData.length; i++) {
            differences.push(this.comparePixelToColor(pixelData,colorData[i]));
        }

        let closestColor = Math.min(...differences);
        let coloridx = differences.findIndex((e) => e === closestColor);

        return coloridx;
    }

    comparePixelToColor(pixelData, color) {
        // pixelData = [x,y,z]
        // color = [a,b,c]
        let diffx = Math.abs(pixelData[0] - color[0]);
        let diffy = Math.abs(pixelData[1] - color[1]);
        let diffz = Math.abs(pixelData[2] - color[2]);

        let difference = (diffx + diffy + diffz) / 3;

        return difference;
    }

    invertColors(data) {
        // https://css-tricks.com/manipulating-pixels-using-canvas/
        // Use:
        // this.invertColors(imageData.data);
        // ctx.putImageData(imageData, 0, 0);
        for (let i = 0; i < data.length; i+= 4) {
          data[i] = data[i] ^ 255; // Invert Red
          data[i+1] = data[i+1] ^ 255; // Invert Green
          data[i+2] = data[i+2] ^ 255; // Invert Blue
        }
    }

    resetImage() {
        console.log("Resetting Image");
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d")
        const img = this.imageRef.current;
        ctx.drawImage(img, 0, 0);
    }


    render() {

        return (


            <div >
                <canvas ref={this.canvasRef} width="100" height="100" onClick={this.resetImage.bind(this)}/>
                <img ref={this.imageRef} src={slime} style={{display: "none"}}/>
            </div>

    
        )
    }
}