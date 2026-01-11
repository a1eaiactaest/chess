<script lang="ts">
    import { onMount } from 'svelte';
    import { Chessground } from '@lichess-org/chessground';
    import { Chess } from 'chess.js';
    import type { Api } from '@lichess-org/chessground/api';

    import { toDests, toColor, playOtherSide } from './lib/utils'

    let el: HTMLDivElement;
    let chessground: Api;

    const chess = new Chess();

    onMount(() => {
        // NOTE: chessground config docs: https://github.com/lichess-org/chessground/blob/master/src/config.ts
        chessground = Chessground(el, {
            orientation: 'white',
            movable: {
                color: 'white',
                free: false,
                dests: toDests(chess)
                /*
                events: {
                    after: (from, to) => {
                        const move = chess.move({ from: from, to: to, promotion: 'q' });
                        if (!move) {
                            // illegal -> revert by re-sending current position
                            chessground.set({ fen: chess.fen() });
                            return;
                        }
                        chessground.set({
                            fen: chess.fen(),
                            turnColor: chess.turn() === 'w' ? 'white' : 'black',
                        });
                    }
                }
                */
            },
            draggable: {
                showGhost: true,
            }
        });
        // initial position with chess.js
        //chessground.set({ fen: chess.fen() });
        chessground.set({
            movable: {
                events: {
                    after: playOtherSide(chessground, chess)
                }
            }
        });
    });
</script>

<div bind:this={el} style="width: 670px; height: 670px;">
</div>