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