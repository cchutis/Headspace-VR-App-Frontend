import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";

export default class MovieContainer extends Component {

  
  
  renderMovies() {
      return this.props.movieList.map(movie => {
          return <a-gui-button key={movie.id} width="3.5" height="0.75" onclick={() => this.props.playMovie(movie.path)} key-code="13" value={movie.name} font-family="Muli" margin="0.25 0.25 0.25 0.25" background-color="#301171" border-color="#000"/>
      })
  }

  render() {
      return (
        <a-gui-flex-container
          flex-direction="row"
          justify-content="center"
          align-items="center"
          component-padding="0.5"
          opacity="0.0"
          width="3.5"
          height="2.5"
          position="-18.96 8.540 -29.15"
          rotation="-8.766 0 0"
          panel-color="#000"
          class="clickable">
          {this.renderMovies()}
        </a-gui-flex-container>
      );
  }
}
