type Player = "X" | "O" | null;

class TicTacToc {
    private board: Player[] = [];
    private currentPlayer: Player = "X";
    private isGameOver: boolean = false;
    private status: HTMLElement;
    private reset: HTMLElement;

    constructor(status: HTMLElement, reset: HTMLElement) {
        this.status = status;
        this.reset = reset;

        for (let i = 0; i < 9; i++) {
            this.board.push(null);
        }

        // for (const p of this.board) {
        //     console.log(p);
        // }

        this.initializeGame();
    }

    private initializeGame = () => {
        const boardContainer = document.querySelectorAll<HTMLElement>(".grid-item");
        boardContainer.forEach((cell, index) => {
            cell.addEventListener("click", () => this.handleMove(index))
        })

        this.renderBoard();
        this.status.textContent = `Turno: ${this.currentPlayer}`;
    }

    private renderBoard = () => {
        const boardContainer = document.querySelectorAll<HTMLElement>(".grid-item");
        boardContainer.forEach((cell, index) => {
            cell.textContent = this.board[index];
        })
    }

    private handleMove = (index: number) => {
        // console.log(`Se hizo click en la celda ${index}`);

        if (this.board[index]) return;

        this.board[index] = this.currentPlayer;
        this.renderBoard();

        if (this.checkWinner()) {
            this.status.textContent = `Ganador: ${this.currentPlayer}`
            this.isGameOver = true;
        } else if (this.board.every((cell) => cell)) {
            this.status.textContent = "Empate"
        } else {
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
            this.status.textContent = `Turno: ${this.currentPlayer}`;
        }
    }

    private checkWinner = () => {
        const winningCombs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [1, 4, 7],
            [2, 4, 6],
            [0, 3, 6],
            [2, 5, 8]
        ]
        for (let i = 0; i < winningCombs.length; i++) {
            const [a ,b, c] = winningCombs[i];
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return true;
            }
        }
        return false;
    }
}

const main = () => {
    const status = document.getElementById("game-status")!;
    const reset = document.getElementById("reset-button")!;

    new TicTacToc(status, reset);
}

main()