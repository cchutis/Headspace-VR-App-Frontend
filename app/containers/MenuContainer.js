import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";
import MainMenu from '../components/MainMenu'
import ImmersiveMenu from "../components/ImmersiveMenu";

export default class MenuContainer extends Component {


    render() {
        return (
            this.props.immersive ?
            <ImmersiveMenu immersiveClicked={this.props.immersiveClicked} environments={this.props.environments} changeEnvironment={this.props.changeEnvironment} />
            : <MainMenu immersiveClicked={this.props.immersiveClicked} enableTheater={this.props.enableTheater}/>
            
        );
    }
}
