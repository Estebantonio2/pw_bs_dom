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
        this.board[index] = this.currentPlayer;
        this.renderBoard();
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.status.textContent = `Turno: ${this.currentPlayer}`;
    }
}

const main = () => {
    const status = document.getElementById("game-status")!;
    const reset = document.getElementById("reset-button")!;

    new TicTacToc(status, reset);
}

main()