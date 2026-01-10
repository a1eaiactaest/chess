<script lang="ts">
    import { onMount } from 'svelte';
    import { Chessground } from '@lichess-org/chessground';
    import type { Api } from '@lichess-org/chessground/api';
    import { Chess } from 'chess.js';

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
            }
        });
        // initial position with chess.js
        chessground.set({ fen: chess.fen() });
    });
</script>

<div bind:this={el} style="width: 670px; height: 670px;">
</div>