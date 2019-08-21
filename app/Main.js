import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";
import MenuContainer from './containers/MenuContainer'
import SoundPlayer from "./components/SoundPlayer";
import Settings from './components/Settings'
import TheaterScene from './containers/TheaterScene'


export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: true,
      background: "img/sky.jpg",
      immersive: false,
      theater: false,
      environments: [],
      sfx: '',
      volume: 1,
      showSettings: false,
      movies: [],
      movieChoice: "movies/DVD.mp4"
    };
  }

  componentDidMount() {
    this.fetchEnvironments()
    this.fetchMovies()
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

  fetchMovies() {
      fetch('http://localhost:3000/movies')
      .then(r => r.json())
      .then(movies => {
          this.setState({
            movies: movies
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

  backToList() {
    this.setState({
      immersive: !this.state.immersive,
      background: "img/sky.jpg",
      showSettings: false,
      sfx: 'menumusic.mp3',
      showMenu: true
    });
  }

  toggleMute() {
    if(this.state.volume) {
      this.setState({
        volume: 0,
        buttonLabel: "Muted",
        showSettings: false
      }, () => this.setState({ showSettings: true}))
    } else {
      this.setState({
        volume: 1,
        buttonLabel: "Mute Sound",
        showSettings: false
      }, () => this.setState({ showSettings: true }))
    }
  }

  enableTheater() {
    this.setState({
      theater: !this.state.theater,
      showMenu: false
    })
  }

  playMovie(path) {
    this.setState({
      movieChoice: `movies/${path}`
    })
  }

  render() {
    return (
      <Scene>
        <a-assets>
          <video
            id={this.state.movieChoice}
            autoplay
            loop="false"
            src={this.state.movieChoice}
          />
        </a-assets>
        {this.state.immersive || this.state.theater ? null : (
          <Entity
            geometry={{ primitive: "plane", width: "2", height: "1" }}
            material={{ src: "url(logo.png)", transparent: "true" }}
            position="0 3 -3"
          />
        )}
        <Entity primitive="a-camera" look-controls>
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: "white", shader: "flat", opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
            raycaster={{ objects: ".clickable" }}
          />
        </Entity>
        <SoundPlayer sound={this.state.sfx} volume={this.state.volume} />
        <Entity
          primitive="a-sky"
          src={this.state.background}
          rotation="0 -50 0"
        />
        {this.state.theater ? null : (
          <Entity
            particle-system={{
              preset: "dust",
              particleCount: 3000,
              size: 0.2
            }}
          />
        )}
        {this.state.showMenu ? (
          <MenuContainer
            changeEnvironment={this.changeEnvironment.bind(this)}
            immersiveClicked={this.immersiveClicked.bind(this)}
            environments={this.state.environments}
            immersive={this.state.immersive}
            enableTheater={this.enableTheater.bind(this)}
          />
        ) : null}
        {this.state.showSettings ? (
          <Settings
            volume={this.state.volume}
            toggleMute={this.toggleMute.bind(this)}
            backToList={this.backToList.bind(this)}
          />
        ) : null}
        {this.state.showMenu ? null : (
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
            class="clickable"
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
        )}
        {this.state.theater ? (
          <TheaterScene
            playMovie={this.playMovie.bind(this)}
            movieList={this.state.movies}
            movieChoice={this.state.movieChoice}
          />
        ) : null}
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
