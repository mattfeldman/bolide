import ColorPicker from 'react-color';
import { Component, PropTypes } from 'react';

export default class ColorPickerPopup extends Component {
    state = {showColor: false};
    static propTypes = {
        rgb: React.PropTypes.object.isRequired,
        onColorChange: React.PropTypes.func.isRequired
    };

    colorPickerClose(e){
        this.setState({showColor: false});
    }

    onColorChange(e){
        let rgb = _.omit(e.rgb, 'a');
        this.props.onColorChange(rgb);
    }

    clickPickColor(e) {
        this.setState({showColor: !this.state.showColor});
    }

    render(){
        let {r,g,b} = this.props.rgb || {};
        let colorStyle = {'background-color': `rgb(${r},${g},${b})`};
        return(
            <div>
                <div className="ui right labeled basic icon button" onClick={this.clickPickColor.bind(this)}>set color
                    <i className="icon" style={colorStyle}></i>
                </div>
                <div >
                    <ColorPicker type="photoshop"
                                 color={this.props.rgb}
                                 position="above"
                                 display={this.state.showColor}
                                 onChange={this.onColorChange.bind(this)}
                                 onClose={this.colorPickerClose.bind(this)}/>
                </div>
            </div>
        );
    }
}