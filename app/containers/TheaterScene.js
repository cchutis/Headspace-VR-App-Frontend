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
            {/* <MovieScreen movieChoice={this.props.movieChoice} /> */}
            <MovieContainer
              playMovie={this.props.playMovie}
              movieList={this.props.movieList}
            />
          </Entity>
        );
    }
}
