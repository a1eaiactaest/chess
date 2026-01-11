import { SQUARES } from "chess.js";
import type { Chess } from "chess.js";
import type { Api } from "@lichess-org/chessground/api";
import type { Color, Key } from "@lichess-org/chessground/types";

export function toDests(chess: Chess): Map<Key, Key[]> {
    const dests = new Map();
    SQUARES.forEach((s) => {
        const moves = chess.moves({ square: s, verbose: true });
        if (moves.length) {
            dests.set(s, moves.map((m) => m.to));
        }
    });
    return dests;
}

export function toColor(chess: Chess): Color {
    return chess.turn() === "w" ? "white" : "black";
}

export function playOtherSide(chessground: Api, chess: Chess) {
    return (orig: Key, dest: Key) => {
        chess.move({ from: orig, to: dest });
        chessground.set({
            turnColor: toColor(chess),
            movable: {
                color: toColor(chess),
                dests: toDests(chess), 
            }
        });
    };
}
