import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";
import MenuContainer from './containers/MenuContainer'
import SoundPlayer from "./components/SoundPlayer";


export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: true,
      background: "img/sky.jpg",
      immersive: false,
      environments: [],
      sfx: 'menumusic.mp3'
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
              transparent: 'true'
            }}
            position="0 3 -3"
          />
        ) : null}
        <Entity primitive="a-camera" look-controls>
          <Entity primitive="a-cursor" cursor={{fuse: false}} material={{color: 'white', shader: 'flat', opacity: 0.75}} geometry={{radiusInner: 0.005, radiusOuter: 0.007}} />
        </Entity>
        <SoundPlayer sound={this.state.sfx} />
        <Entity
          primitive="a-sky"
          src={this.state.background}
          rotation="0 -50 0"
        />
        <Entity
          particle-system={{
            preset: "dust",
            particleCount: 3000,
            size: 0.2
          }}
        />
        {this.state.showMenu ? <MenuContainer changeEnvironment={this.changeEnvironment.bind(this)} immersiveClicked={this.immersiveClicked.bind(this)} environments={this.state.environments} immersive={this.state.immersive}/> : null}
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
