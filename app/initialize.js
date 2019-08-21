/**
 * @fileoverview 
 * This file imports all our required packages.
 * It also includes 3rd party A-Frame components.
 * Finally, it mounts the app to the root node.
 */

import 'aframe'
import 'aframe-animation-component'
import 'aframe-event-set-component'
import 'aframe-particle-system-component'
import 'aframe-gui'
import 'aframe-video-controls'
import './components/aframe-custom'
import './components/aframe-environment'
import './components/aframe-effects'

// import {createStore} from 'preact-redux'
// import reducer from './reducer'
// import {Provider} from 'preact-redux'

// const store = createStore(reducer)

import { h, render } from 'preact'
import Main from './Main'

document.addEventListener('DOMContentLoaded', () => {
  render(<Main />, document.querySelector('#app'))
})


// document.addEventListener("DOMContentLoaded", () => {
//   render(
//     <Provider store={store}>
//       <Main />
//     </Provider>,
//     document.querySelector("#app")
//   );
// });