import ColorPicker from 'react-color';
import { Component, PropTypes } from 'react';

export default class ColorPickerPopup extends Component {
    state = {showColor: false};
    static propTypes = {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    };

    rgbToHex(r, g, b) {
        let componentToHex = (c) => {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        };
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    colorPickerClose(e){
        this.setState({showColor: false});
    }

    onColorChange(e){
        let rgb = _.omit(e.rgb, 'a');
        this.props.onChange(rgb);
    }

    clickPickColor(e) {
        this.setState({showColor: !this.state.showColor});
    }

    render(){
        let readOnly = !!this.props.onColorChange;
        let {r,g,b} = this.props.value || {};
        let colorStyle = {'background-color': `rgb(${r},${g},${b})`};
        return(
            <div>
                <div className="ui right labeled basic icon button" onClick={this.clickPickColor.bind(this)}>set color
                    <i className="icon" style={colorStyle}></i>
                </div>
                <div >
                    <ColorPicker type="photoshop"
                                 color={this.props.value}
                                 position="aboBve"
                                 display={this.state.showColor}
                                 onChange={this.onColorChange.bind(this)}
                                 onClose={this.colorPickerClose.bind(this)}/>
                </div>
            </div>
        );
    }
}