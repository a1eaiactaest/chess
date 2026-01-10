import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

import '@lichess-org/chessground/assets/chessground.base.css';
import '@lichess-org/chessground/assets/chessground.brown.css';
import '@lichess-org/chessground/assets/chessground.cburnett.css';


const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
