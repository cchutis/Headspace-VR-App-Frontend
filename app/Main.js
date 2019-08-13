import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";
import MenuContainer from './containers/MenuContainer'
import SoundPlayer from "./components/SoundPlayer";
import Settings from './components/Settings'


export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: true,
      background: "img/sky.jpg",
      immersive: false,
      environments: [],
      sfx: 'menumusic.mp3',
      showSettings: false
    };
  }

  componentDidMount() {
    this.fetchEnvironments()
  }

  fetchEnvironments(){
    fetch('http://localhost:3000/environments')
    .then(r => r.json())
    .then(data => {
      this.setState({
        environments: data
      })
    })
  }

  changeEnvironment(image, sfx) {
    this.setState({
      background: image,
      sfx: sfx,
      showMenu: false
    })
  }

  immersiveClicked() {
    this.setState({
      immersive: !this.state.immersive,
      background: "img/sky.jpg"
    });
  }

  settingsToggle() {
    this.setState({
      showSettings: !this.state.showSettings
    })
  }

  render() {
    return (
      <Scene>
        {!this.state.immersive ? (
          <Entity
            geometry={{
              primitive: "plane",
              width: "2",
              height: "1"
            }}
            material={{
              src: "url(logo.png)",
              transparent: "true"
            }}
            position="0 3 -3"
          />
        ) : null}
        <Entity primitive="a-camera" look-controls>
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: "white", shader: "flat", opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
          />
        </Entity>
        <SoundPlayer sound={this.state.sfx} />
        <Entity
          primitive="a-sky"
          src={this.state.background}
          rotation="0 -50 0"
        />
        {/* <Entity
          particle-system={{
            preset: "dust",
            particleCount: 3000,
            size: 0.2
          }}
        /> */}
        {this.state.showMenu ? (
          <MenuContainer
            changeEnvironment={this.changeEnvironment.bind(this)}
            immersiveClicked={this.immersiveClicked.bind(this)}
            environments={this.state.environments}
            immersive={this.state.immersive}
          />
        ) : null}
        {this.state.showSettings ? <Settings /> : null}
        <a-gui-flex-container
          flex-direction="column"
          justify-content="center"
          align-items="center"
          component-padding="0.1"
          opacity="0.0"
          width="3.5"
          height="2.5"
          position="0 -3 -2"
          rotation="-45 0 0"
          panel-color="#000"
        >
          <a-gui-button
            width="2.5"
            height="0.75"
            onclick={this.settingsToggle.bind(this)}
            key-code="16"
            value="SETTINGS"
            font-family="Muli"
            margin="0.05 0 0.05 0"
            background-color="#301171"
            border-color="#000"
          />
        </a-gui-flex-container>
      </Scene>
    );
  }
}

// function msp(state){
//   return {
//     showMenu: state.showMenu,
//     background: state.background
//   }
// }

// function mdp(dispatch) {
//   return {
//     showMenu: () => {
//       dispatch({type: "MENU"})
//     },
//     background: () => {
//       dispatch({type: "BACKGROUND"})
//     }
//   }
// }

// export default connect(msp,mdp)(Main)
