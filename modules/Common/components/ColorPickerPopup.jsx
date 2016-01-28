import ColorPicker from 'react-color';
import { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class ColorPickerPopup extends Component {
    state = {showColor: false};
    static propTypes = {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        fluid: React.PropTypes.any
    };
    static defaultProps = {
        value: {r: 255, g: 255, b: 255},
        fluid: false
    };

    rgbToHex(r, g, b) {
        let componentToHex = (c) => {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        };
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    colorPickerClose(e) {
        this.setState({showColor: false});
    }

    onColorChange(e) {
        let rgb = _.omit(e.rgb, 'a');
        this.props.onChange(rgb);
    }

    clickPickColor(e) {
        this.setState({showColor: !this.state.showColor});
    }

    render() {
        let readOnly = !!this.props.onColorChange;
        let {r,g,b} = this.props.value || {};
        let colorStyle = {'backgroundColor': `rgb(${r},${g},${b})`};
        let buttonStyle = classNames("ui right labeled basic icon button", {fluid: this.props.fluid});
        return (
            <div>
                <div className={buttonStyle} onClick={this.clickPickColor.bind(this)}>set color
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