import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";

export default class Settings extends Component {
    render() {
        return (
          <a-gui-flex-container
            flex-direction="column"
            justify-content="center"
            align-items="center"
            component-padding="0.1"
            opacity="0.5"
            width="3.5"
            height="2.5"
            position="0 1 -4"
            rotation="0 0 0"
            panel-color="#000"
            class="clickable"
          >
            <a-gui-button
              width="2.5"
              height="0.75"
              onclick={this.props.toggleMute}
              key-code="13"
              value={this.props.volume === 0 ? "Muted" : "Mute Sounds"}
              font-family="Muli"
              margin="0.05 0 0.05 0"
              background-color="#301171"
              border-color="#000"
            />
            <a-gui-button
              width="2.5"
              height="0.75"
              onclick={this.props.backToList}
              key-code="16"
              value="Change Scene"
              font-family="Muli"
              margin="0 0 0.05 0"
              background-color="#301171"
            />
          </a-gui-flex-container>
        );
    }
}
