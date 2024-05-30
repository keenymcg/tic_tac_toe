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
        setStatus(`Let's begin! It's Bird's turn!`);
        
        // Tell Cells to handle Click & Hover events
        boardCells.forEach(cell => {
            cell.addEventListener("click", handleCellClick);
            cell.addEventListener("mouseover", handleHover);
            cell.addEventListener("mouseout", handleMouseout); 
        }); 

        // Initialize Restart Button
        restartButton.addEventListener('click', restart);
    };

    // Renders the Board
    function renderBoard() {
        board.forEach((value, index) => { 
            boardCells[index].style.backgroundSize = 'cover';

            if (value === 'x') {
                boardCells[index].style.backgroundImage = 'url("images/bird.png")';
                boardCells[index].style.opacity = '1'; // Set opacity to 100%
            } else if (value === 'o') {
                boardCells[index].style.backgroundImage = 'url("images/snake.png")';
                boardCells[index].style.opacity = '1'; // Set opacity to 100%
            } else {
                boardCells[index].style.backgroundImage = '';
            }
        });
    };

    // Set Status of Game, like: Whose Turn, the Winner, or It's a Draw
    function setStatus(message) {
        statusMessage.textContent = message;
    };

    // Handle Click Events
    function handleCellClick(event) {
        const index = event.target.dataset.cell;

        // If the cell already has a value, return early to prevent the rest of the function from executing
        if (board[index] !== '') {
            return;
        };

        console.log(`${currentPlayer} clicked the board at index ${index}!`)

        if (board[index] === '') {
            board[index] = currentPlayer;
            renderBoard();
        } 
        
        if (checkWin(currentPlayer)) {
            console.log(`${currentPlayer} wins!`)
            if (currentPlayer === player1) {
                setStatus(`Bird wins!`);
            } else {
                setStatus(`Snake wins!`);
            };
            endGame();
            return;
        };

        if (board.every(cell => cell !== '')) {
            setStatus(`It's a draw!`)
            endGame();
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        let currentAnimal = currentPlayer === player1 ? 'Bird' : 'Snake';
        setStatus(`It's ${currentAnimal}'s turn!`);
    };

    // Handle Hover Events
    function handleHover(event) {
        const index = event.target.dataset.cell; // grab the index of the cell
        
        // Check if the cell already has an image
        if (board[index] === '') {
            // Check whose turn it is and set the appropriate image
            if (currentPlayer === player1) {
                boardCells[index].style.backgroundImage = 'url("images/bird.png")';
            } else if (currentPlayer === player2) {
                boardCells[index].style.backgroundImage = 'url("images/snake.png")';
            }

            // Set the opacity to 60%
            boardCells[index].style.opacity = '0.6';
        }

        // Make the image fit the cell
        boardCells[index].style.backgroundSize = 'cover';
    };

    // Handle Mouseout Events
    function handleMouseout(event) {
        const index = event.target.dataset.cell; // grab the index of the cell

        // Check if the cell has a value of '' (empty)
        if (board[index] === '') {
            // Remove the background image
            boardCells[index].style.backgroundImage = '';
        }
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
        boardCells.forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
            cell.removeEventListener('mouseover', handleHover);
            cell.removeEventListener('mouseout', handleMouseout);
        })
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