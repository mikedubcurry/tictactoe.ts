class Board {
	state: Array<string | undefined> = [
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
	];
	winningStates = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 4, 8],
		[2, 4, 6],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
	];
	playerOnesTurn = true;

	drawBoard() {
		console.clear();
		console.log(`Player ${this.getTurn()}'s turn.\n`);
		console.log(`
    ${this.state[0] ? this.state[0] : 0}  |${
			this.state[1] ? this.state[1] : 1
		}  |${this.state[2] ? this.state[2] : 2}  
    ___|___|___
    ${this.state[3] ? this.state[3] : 3}  |${
			this.state[4] ? this.state[4] : 4
		}  |${this.state[5] ? this.state[5] : 5}  
    ___|___|___
    ${this.state[6] ? this.state[6] : 6}  |${
			this.state[7] ? this.state[7] : 7
		}  |${this.state[8] ? this.state[8] : 8}  
       |   |
    
       `);
	}

	getState() {
		return this.state;
	}

	takeTurn() {
		this.playerOnesTurn = !this.playerOnesTurn;
	}

	getTurn() {
		return this.playerOnesTurn ? "X" : "O";
	}

	setState(nextState: Array<string | undefined>) {
		this.state = nextState;
	}

	isGameOver() {
		if (this.state.every((val) => Boolean(val))) {
			return true;
		}
	}

	endGame(winner: string) {
		console.log(`${winner} wins!`);
		process.exit(0);
	}

	getWinner() {
		const x: Array<number | null> = [];
		const o: Array<number | null> = [];

		this.state.forEach((box, idx) => {
			if (box === "X") {
				x.push(idx);
			} else if (box === "O") {
				o.push(idx);
			}
		});
		let didXWin = false;
		let didOWin = false;
		this.winningStates.forEach((j) => {
			if (
				j.every((item) => {
					return x.includes(item);
				})
			) {
				didXWin = true;
			}
			if (
				j.every((item) => {
					return o.includes(item);
				})
			) {
				didOWin = true;
			}
		});
		if (didXWin) {
			this.endGame("X");
		}
		if (didOWin) {
			this.endGame("O");
		}
	}
}

export default Board;
