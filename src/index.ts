import Board from "./board";
import { emitKeypressEvents, createInterface } from "readline";

// clear console
console.clear();

emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

const board = new Board();

function nextFrame() {
	board.drawBoard();
	rl.question(
		"Enter a number 0-8\nor enter 'exit' to quit\n",
		(answer) => {
			if (answer === "exit") {
				return rl.close();
			} else if ("012345678".includes(answer)) {
				// do something with answer
				const nextState = board.getState().map((st, i) => {
					if (parseInt(answer) === i) {
						return board.getTurn();
					} else {
						return st;
					}
				});

				board.takeTurn();
				board.setState(nextState);
        board.drawBoard();
        board.getWinner();
				if (board.isGameOver()) {
					console.log("GAME OVER");
					process.exit(0);
				}
			}
			// kick off next player's turn
			nextFrame();
		}
	);
}

nextFrame();
