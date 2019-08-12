import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'
import MenuContainer from './MenuContainer';


export default class MainContainer extends Component {
    
    constructor() {
        super()
        this.state = {
            showMenu: true,
            image: 'space.jpg'
        }
    }
    
    test() {
        this.setState({
            showMenu: false,
            image: 'aurora.jpg'
        })
    }


    render() {
        return (
            <Scene>
                {this.state.showMenu ?
                <Entity geometry={{
                    primitive: 'plane', 
                    width: '2', 
                    height: '1'}} 
                    material={{
                        src: 'url(logo.png)', 
                        alphaTest: 0.5}} 
                        position="0 3 -3" 
                /> : null}
                <Entity primitive="a-camera" position="0 0 0" />
                <Entity primitive="a-sky" src={this.state.image} rotation="0 -50 0" />
                <Entity particle-system={{preset: "dust", particleCount: 3000, size: .2}} />
                {this.state.showMenu ? <MenuContainer test={this.test}/> : null }
            </Scene>
        )
    }
}
