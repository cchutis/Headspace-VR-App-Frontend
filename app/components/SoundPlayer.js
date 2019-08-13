import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";

export default class SoundPlayer extends Component {
    render() {
        return (
          <Entity
            primitive="a-sound"
            src={this.props.sound}
            autoplay="true"
            loop="true"
          />
        );
    }
}
