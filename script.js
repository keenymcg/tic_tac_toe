// Define Game Module
const game = (() => {
    // Set Board Values
    const board = ['', '', '', '', '', '', '', '', ''];
    // const testBoard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x']; // useful for renderBoard() test

    // Define Players
    const player1 = 'x'
    const player2 = 'o'
    let currentPlayer = player1

    // Gather DOM elements
    const boardCells = document.querySelectorAll(".board div");
    const restartButton = document.getElementById("restartButton");
    const statusMessage = document.querySelector(".status-message-text");

    // Starting the Game
    function start() {
        console.log("Let the game begin!")

        // Render the board
        renderBoard();

        // Set the Status, like: Whose turn, the Winner, or It's a Draw
        setStatus(`${currentPlayer}'s turn!`);

        // Tell Cells to handle click events
        boardCells.forEach(cell => cell.addEventListener("click", handleCellClick)); 

        // Initialize Restart Button
        restartButton.addEventListener('click', restart);
    };

    // Renders the Board
    function renderBoard() {
        board.forEach((value, index) => { 
            boardCells[index].textContent = value 
        })
    };

    // Set Status of Game, like: Whose Turn, the Winner, or It's a Draw
    function setStatus(message) {
        statusMessage.textContent = message;
    };

    // Handle Click Events
    function handleCellClick(event) {
        const index = event.target.dataset.cell;
        console.log(`You've clicked the board at index ${index}!`)

        if (board[index] === '') {
            board[index] = currentPlayer;
            renderBoard();
        } 
        
        if (checkWin(currentPlayer)) {
            setStatus(`${currentPlayer} wins!`)
            endGame();
            return;
        };

        if (board.every(cell => cell !== '')) {
            setStatus(`It's a draw!`)
            endGame();
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        setStatus(`It's ${currentPlayer}'s turn!`);
    };

    // Check for Winner or Draw
    function checkWin(player) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Returns True if every index in any combination of winnable arrays all equal "player,"
        // which is either "x" or "o"
        return winConditions.some(combination => 
            combination.every(index => board[index] === player)
        )
    };

    function endGame() {
        // No more clicks allowed
        boardCells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    };

    function restart() {
        // Clear Board array values, Change current player, & Start game again
        board.fill("");
        currentPlayer = player1
        start();

        // Need to reinstate event listener here?
    };


    return { start };
})();

game.start();

// // TESTS 
// // REMEMBER: Always return the function you want at the end of the Game IIFE if you want to use it
// // for example: return { start, renderBoard };
// game.renderBoard(); 
// game.setStatus("Player One's Turn");