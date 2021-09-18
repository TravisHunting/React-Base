import React from 'react';

export class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            colorData: props.colorData || [],
            file: null,
            break: ""
        }
        // References allow us to access our elements, as if we were using document.GetELementByID (or whatever)
        this.canvasRef = React.createRef();
        this.imageRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
    }

    componentDidMount() {
        let self = this;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d")
        const img = this.imageRef.current;

        // Set an onload effect for the img element
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            this.setState({
                break: <br/>
            })
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
        //console.log("coloradata from canvas: ", this.state.colorData)
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d")
        
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        if (this.state.colorData && this.state.colorData.length > 0) {
            
            for (let i = 0; i < imageData.data.length; i+=4) {
                let pixel = [imageData.data[i], imageData.data[i+1], imageData.data[i+2]];
                let closestColorIdx = this.comparePixelToColorDataArray(pixel, this.state.colorData);
                imageData.data[i] = this.state.colorData[closestColorIdx][0];
                imageData.data[i+1] = this.state.colorData[closestColorIdx][1];
                imageData.data[i+2] = this.state.colorData[closestColorIdx][2];
            }

            ctx.putImageData(imageData, 0, 0);
        }
    }

    comparePixelToColorDataArray(pixelData, colorData) {
        // returns the index in colordata that matches pixelData most closely
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
        // Retuns a number difference between 2 arrays of 3 members each
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
                <canvas ref={this.canvasRef} width="1" height="1" onClick={this.resetImage.bind(this)} title="Click to reset the image"/>
                {this.state.break}
                <input type="file" onChange={this.handleChange}/>
                <img src={this.state.file} ref={this.imageRef} style={{display: "none"}}/>
            </div>
        )
    }
}