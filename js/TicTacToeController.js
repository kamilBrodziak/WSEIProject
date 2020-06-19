class TicTacToeController {
    constructor(gameContainer, startingForm) {
        this.gameContainer = gameContainer;
        this.startingForm = startingForm;
        this.round = 0;
        this.moves = [{index: 0, value: ''}, {index: 1, value: ''}, {index: 2, value: ''},
            {index: 3, value: ''}, {index: 4, value: ''}, {index: 5, value: ''},
            {index: 6, value: ''}, {index: 7, value: ''}, {index: 8, value: ''}];
        this.playerChar = 'X';
        this.difficulty = "easy";
        this.whoseMove = 'X';
        this.movesToCheck =
            [[0, 2, 1], [3, 5, 1], [6, 8, 1], // on X axis
                [0, 6, 3], [1, 7, 3], [2, 8, 3], // on Y axis
                [0, 8, 4], [2, 6, 2] // diagonals
            ];
    }

    addStartByForm() {
        const _this = this;
        this.startingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            _this.moves = [{index: 0, value: ''}, {index: 1, value: ''}, {index: 2, value: ''},
                {index: 3, value: ''}, {index: 4, value: ''}, {index: 5, value: ''},
                {index: 6, value: ''}, {index: 7, value: ''}, {index: 8, value: ''}];
            _this.whoseMove = 'X';
            _this.round = 0;
            const gameDifficulties = _this.startingForm.getElementsByClassName('gameDifficulty');
            for(let i = 0; i < gameDifficulties.length; ++i) {
                if(gameDifficulties[i].checked) {
                    _this.difficulty = gameDifficulties[i].value;
                    break;
                }
            }
            const gameChars = _this.startingForm.getElementsByClassName('gameChar');
            for(let i = 0; i < gameChars.length; ++i) {
                if(gameChars[i].checked) {
                    _this.playerChar = gameChars[i].value;
                    break;
                }
            }
            _this.startingForm.classList.add('hide');
            _this.startGame();
        });
    }

    startGame() {
        this.nextRound(true);
    }

    nextRound(isStart = false) {
        const _this = this;

        const isWin = this.calculateResult();
        if(!isStart && !isWin) {
            this.whoseMove = (this.whoseMove === 'X') ? 'O' : 'X';
        }
        this.print(this.whoseMove === this.playerChar && !isWin);
        if(++this.round <= 9 && !isWin) {
            if(this.whoseMove !== this.playerChar) {
                setTimeout(function () {
                    _this.computerMove();
                    _this.nextRound();
                }, 1000);
            }
        } else {
            this.printResult(isWin);
        }
    }

    printResult(isWin) {
        const _this = this;
        const resultHtml = !isWin ? 'Wynik: REMIS' :
            (this.whoseMove === this.playerChar ? 'Wynik: WYGRAŁEŚ!' : 'Wynik: PRZEGRAŁEŚ!');
        const result = createElement({type: 'div', id: 'gameResult', html: resultHtml});
        const playAgain = createElement({type: 'button', id: 'gamePlayAgainButton', html: 'Zagraj ponownie!'});
        this.gameContainer.appendChild(result);
        this.gameContainer.appendChild(playAgain);
        playAgain.addEventListener('click', function (e) {
            _this.gameContainer.innerHTML = '';
            _this.startingForm.classList.remove('hide');
        })

    }

    computerMove() {
        const availableMoves = this.moves.filter(v => v.value === '');
        const index = (Math.random() * availableMoves.length) | 0;
        let computerMoveIndex = availableMoves[index].index;
        switch (this.difficulty) {
            case "normal":
                const indexN = this.normalDifficulty();
                if(indexN !== -1)
                    computerMoveIndex = indexN;
                break;
            case "hard":
                const indexH = this.hardDifficulty();
                if(indexH !== -1)
                    computerMoveIndex = indexH;
                break;
        }
        this.moves[computerMoveIndex].value = (this.playerChar === "X") ? 'O' : "X";
    }

    normalDifficulty() {
        let computerMoveIndex = -1;
        let moveToBlockPlayer = -1;
        for(let i = 0; i < this.movesToCheck.length; ++i) {
            const moves = this.checkMoves(this.movesToCheck[i][0], this.movesToCheck[i][1], this.movesToCheck[i][2]);
            if(moves.computer.length === 2 && moves.available.length === 1)
                return moves.available[0];
            else if(moves.player.length === 2 && moves.available.length === 1)
                moveToBlockPlayer = moves.available[0];
            if(i + 1 === this.movesToCheck.length)
                return moveToBlockPlayer;
        }
        return computerMoveIndex;
    }

    hardDifficulty() {
        let computerMoveIndex = -1;
        let computerSecondMove = -1;
        let moveToBlockPlayer = -1;

        for(let i = 0; i < this.movesToCheck.length; ++i) {
            const moves = this.checkMoves(this.movesToCheck[i][0], this.movesToCheck[i][1], this.movesToCheck[i][2]);
            if(moves.computer.length === 2 && moves.available.length === 1)
                return moves.available[0];
            else if(moves.player.length === 2 && moves.available.length === 1)
                moveToBlockPlayer = moves.available[0];
            else if(moves.computer.length === 1 && moves.available.length === 2)
                computerSecondMove = moves.available[0];
            if(i + 1 === this.movesToCheck.length) {
                if(moveToBlockPlayer !== -1)
                    return moveToBlockPlayer;
                return computerSecondMove;
            }
        }
        return computerMoveIndex;
    }

    checkMoves(iterationStart, maxLength, iterationStep) {
        let computerMovesIndexes = [];
        let playerMovesIndexes = [];
        let availableMoveIndexes = [];
        for(let i = iterationStart; i <= maxLength; i += iterationStep) {
            if(this.moves[i].value === this.playerChar) {
                playerMovesIndexes.push(i);
            } else if(this.moves[i].value === '') {
                availableMoveIndexes.push(i);
            } else {
                computerMovesIndexes.push(i);
            }
        }

        return {computer: computerMovesIndexes, player: playerMovesIndexes, available: availableMoveIndexes};
    }

    calculateResult() {
        for(let i = 0; i < this.movesToCheck.length; ++i) {
            const moves = this.checkMoves(this.movesToCheck[i][0], this.movesToCheck[i][1], this.movesToCheck[i][2]);
            if(moves.computer.length === 3 || moves.player.length === 3)
                return true;
        }
        return false;
    }

    print(isPlayerMove = false) {
        this.gameContainer.innerHTML = '';
        const tableRows = [], _this = this;
        for(let i = 0; i < 3; ++i) {
            const tableRowCells = [];
            for(let j = 0; j < 3; ++j) {
                const gameChar = this.moves[i * 3 + j].value;
                const cell = createElement({type: 'td', html: gameChar, classes: "gameTableCell"});
                if(gameChar === '' && isPlayerMove) {
                    cell.classList.add('empty');
                    cell.addEventListener('click', function (e) {
                        _this.moves[i * 3 + j].value = _this.playerChar;
                        _this.nextRound();
                    })
                }
                tableRowCells.push(cell);
            }
            tableRows.push(createElement({type: 'tr', classes: "gameTableRow"}, tableRowCells));
        }
        const table = createElement({type: 'table', classes:'gameTable'}, tableRows);
        this.gameContainer.appendChild(table);
    }

}