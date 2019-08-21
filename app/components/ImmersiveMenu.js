import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";

export default class ImmersiveMenu extends Component {

    renderEnvironments() {
        return this.props.environments.map(environment => {
          return <a-gui-button key={environment.id} width="2.5" height="0.75" onclick={() => this.props.changeEnvironment(environment.asset_path, environment.audio)} key-code="13" value={environment.name} font-family="Muli" margin="0.05 0 0.05 0" background-color="#301171" border-color="#000" />
        })
    }

  render() {
    return (
      <a-gui-flex-container
        flex-direction="column"
        justify-content="flexEnd"
        align-items="center"
        component-padding="0.1"
        opacity="0.0"
        width="3.5"
        height="4.5"
        position="0 2.5 -4"
        rotation="0 0 0"
        panel-color="#000"
        class="clickable">
        {this.renderEnvironments()}
        <a-gui-button
          width="2.5"
          height="0.75"
          onclick={this.props.immersiveClicked}
          key-code="13"
          value="Back"
          font-family = "Muli"
          margin="0.05 0 0.05 0"
          background-color="#301171"
          border-color="#000" />
      </a-gui-flex-container>
    );
  }
}
