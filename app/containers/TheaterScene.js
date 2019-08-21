import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";
import MovieContainer from './MovieContainer'
import MovieScreen from '../components/MovieScreen'

export default class TheaterScene extends Component {

    render() {
        return (
          <Entity
            gltf-model="living_room/scene.gltf"
            position="19 -10 20"
            rotation="0 0 0"
            scale="1 1 1">
          <a-obj-model src="#frame-obj" mtl="#frame-mtl" scale="30 30 30" position="-18.234 4.644 16.915" rotation="0 -76.543 -112.59"></a-obj-model>
          <a-obj-model src="#petframe-obj" mtl="#petframe-mtl" scale="30 30 30" position="-24.363 4.644 14.387" rotation="0 -117.45 -112.58"></a-obj-model>
            <Entity
              primitive="a-video"
              autoplay="true"
              loop="false"
              width="16"
              height="9"
              src={`#${this.props.movieChoice}`}
              position="-18.769 15.270 -47"
              scale="2.2 1.77 2"
            />
            <MovieContainer
              playMovie={this.props.playMovie}
              movieList={this.props.movieList}
            />
          </Entity>
        );
    }
}
