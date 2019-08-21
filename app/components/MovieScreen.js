import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";

export default class MovieScreen extends Component {

    render() {
        return (
          <Entity
            primitive="a-video"
            autoplay="true"
            loop="false"
            width="16"
            height="9"
            src={this.props.movieChoice}
            position="-18.769 15.270 -47"
            scale="2.2 1.77 2"
          />
        );
    }
}
