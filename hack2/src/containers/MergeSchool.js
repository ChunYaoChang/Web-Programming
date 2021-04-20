// Designed by Ming-Yang, Ho (https://github.com/Kaminyou)
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Board2048 from '../components/Board2048'
import '../containers/MergeSchool.css';

let secret_seed = 1;
const tokenString = "Kaminyou".split("");
for(let i = 0; i < tokenString.length; i++){
    secret_seed *= tokenString[i].charCodeAt(0);
    secret_seed = secret_seed % 0xffffffff;
}

function MergeSchool() {
    var body = document.querySelector('body')
    const blankBoard = [[0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [1,1,0,0]];
    const [newGridBoard, setNewGridBoard] = useState([[0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [1,1,0,0]]);
    const [board, setBoard] = useState([[0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [2,2,0,0]]);
    const [qs_ranking, setQs_ranking] = useState(32768);
    const [best_qs_ranking, setBest_qs_ranking] = useState(32768);
    const [gameover, setGameover] = useState(false);
    const [step, setStep] = useState(0);
    const [win, setWin] = useState(false);
    const [seed, setSeed] = useState(secret_seed);

    // Pesudo random number generator
    // 4 bytes hashing function By Thomas Wang or Robert Jenkins
    const prng = (seed, salt, mod) => {
        let temp = seed + salt;
        temp = (temp+0x7ed55d16) + (temp<<12);
        temp = (temp^0xc761c23c) ^ (temp>>19);
        temp = (temp+0x165667b1) + (temp<<5);
        temp = (temp+0xd3a2646c) ^ (temp<<9);
        temp = (temp+0xfd7046c5) + (temp<<3);
        temp = (temp^0xb55a4f09) ^ (temp>>16);
        if( temp < 0 ) temp = 0xffffffff + temp;
        return (temp % mod);
    }   

    // Rotate the matrix clockwisely
    const rotateClockwise = (matrix) => {
        let result = [];
        for(let i = 0; i < matrix[0].length; i++) {
            let row = matrix.map(e => e[i]).reverse();
            result.push(row);
        }
        return result;
    }
    
    // Rotate the matrix counterclockwisely
    const rotateCounterClockwise = (matrix) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        
        let result = [];
        for(let i = 0; i < matrix[0].length; i++) {
            let row = matrix.map(e => e[i]).reverse();
            result.push(row);
        }
        return result;
    }

    // Create board and add two "2" and reset everything required
    const initializeBoard = () => {
        let board = [[0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0],
                     [0,0,0,0]];
        let boardset = putGridRandom(board, true);
        boardset = putGridRandom(boardset.board, true);
        
        // #########################
        // # 7 Add something yourself
        // boardset.board will be the initial board, please use it directly
        // #########################
        setBoard(boardset.board)
        setQs_ranking(32768)
        setStep(0)
        setGameover(false)
        setWin(false)
    }

    
    
    // Get all empty x y coordinates in board
    const getEmptyGrid = (board) => {
        let empty_grid = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j<4; j++) {
                if (board[i][j] === 0) {
                    empty_grid.push([i, j])
                }
            }
        }
        return empty_grid;
    }
    
    // Put one "2" in random empty grid
    const putGridRandom = (board, init) => {
        let empty_grid = getEmptyGrid(board);
        let random_num = prng(seed, step, empty_grid.length);
        if (init){
            random_num = prng(seed, 0, empty_grid.length);
        } 
        let random_empty_grid = empty_grid[random_num];
        board[random_empty_grid[0]][random_empty_grid[1]] = 2;
        let newGBroad = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        newGBroad[random_empty_grid[0]][random_empty_grid[1]] = 1;
        setNewGridBoard(newGBroad);
        return {board};
    }
    
    // Check if one move is effecitve
    const justifyMove = (prev, next) => {
        let prev_string = JSON.stringify(prev)
        let new_string = JSON.stringify(next)
        return (prev_string !== new_string) ? true : false;
    }
    
    // Moveright function
    const moveRight = (prevBoard) => {
        let board = [];
        let combination = 0;
    
        for (let r = 0; r < prevBoard.length; r++) {
            let row = [];      
            for (let c = 0; c < prevBoard[r].length; c++) {
                let current = prevBoard[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }
    
        for (let r = 0; r < board.length; r++) {
            // special case
            if ((board[r][0] === board[r][1]) && (board[r][0] !== 0) && (board[r][2] === board[r][3]) && (board[r][2] !== 0)) {
                board[r][3] = board[r][3] * 2;
                board[r][2] = board[r][1] * 2;
                board[r][1] = 0;
                board[r][0] = 0;
                combination += 2;
                continue;
            }

            for (let c = board[r].length - 1; c > 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    combination += 1;
                } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }
        }
    
        return {board, combination};
    }
    
    // Moveup function
    const moveUp = (prevBoard) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        var board = rotateClockwise(prevBoard)
        var nextBoard = moveRight(board)
        var combination =  nextBoard.combination;
        // console.log(combination)
        board = rotateClockwise(nextBoard.board)
        board = rotateClockwise(board)
        board = rotateClockwise(board)
        // let board = prevBoard;
    
        return {board, combination};
    }

    // Movedown function
    const moveDown = (prevBoard) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        var board = rotateClockwise(prevBoard)
        board = rotateClockwise(board)
        board = rotateClockwise(board)
        var nextBoard = moveRight(board)
        var combination =  nextBoard.combination;
        // console.log(combination)
        board = rotateClockwise(nextBoard.board)
    
        return {board, combination};
    }
    
    // Moveleft function
    const moveLeft = (prevBoard) => {
        // #########################
        // # 8 Implement yourself
        // #########################
        var board = rotateClockwise(prevBoard)
        board = rotateClockwise(board)
        var nextBoard = moveRight(board)
        var combination =  nextBoard.combination;
        // console.log(combination)
        board = rotateClockwise(nextBoard.board)
        board = rotateClockwise(board)
    
        return {board, combination};
    }
    
    // Move
    const moveGrid = (direction) => {
        if (!gameover) {
            if (direction === 'right') {
                const nextBoard = moveRight(board);
                checkAndUpdateAfterMove(nextBoard);
            } 
            if (direction === 'left') {
                const nextBoard = moveLeft(board);
                checkAndUpdateAfterMove(nextBoard);
            }
            if (direction === 'up') {
                // console.log(board)
                const nextBoard = moveUp(board);
                // console.log(nextBoard)
                checkAndUpdateAfterMove(nextBoard);
            }
            if (direction === 'down') {
                const nextBoard = moveDown(board);
                checkAndUpdateAfterMove(nextBoard);
            }
            // #########################
            // # 8 Implement yourself
            // #########################
        } 
    }

    // Check everything after one move including gameover and win
    // Also, the step, ranking, best ranking should be updated here
    const checkAndUpdateAfterMove = (nextBoard) => {
        if (justifyMove(board, nextBoard.board)) {
            const nextBoardSetWithRandom = putGridRandom(nextBoard.board, false);
            let qsRankNow = qs_ranking;
            let stepNow = step;
            // #########################
            // # 4 Implement yourself
            // #########################
            stepNow += 1
            // console.log(stepNow)
            setStep(stepNow)
            // #########################
            // # 5 Implement yourself
            // #########################
            qsRankNow -= nextBoard.combination
            setBoard(nextBoardSetWithRandom.board);
            setQs_ranking(qsRankNow);
            setStep(stepNow);
            
            // #########################
            // # 7 Implement yourself
            // #########################
            let bestQsRankNow = best_qs_ranking
            if (qsRankNow < bestQsRankNow) {
                setBest_qs_ranking(qsRankNow);
            }

            if (checkWin(nextBoardSetWithRandom.board)) {
                setWin(true)
            } else if (checkGameover(nextBoardSetWithRandom.board)) {
                setGameover(true);
            }
        }
    }
    const checkIsTheSame = (nextBoard, board) => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] !== nextBoard[i][j]) return false
            }
        }
        return true;
    }
    
    // Check if it is gameover
    const checkGameover = (board) => {
        // #########################
        // # 9 Implement yourself
        // #########################
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) return false
            }
        }
        // console.log("full")
        var nextBoard = moveRight(board)
        if (checkIsTheSame(nextBoard.board, board) === false) return false
        // console.log("right")
        nextBoard = moveUp(board)
        if (checkIsTheSame(nextBoard.board, board) === false) return false
        nextBoard = moveDown(board)
        if (checkIsTheSame(nextBoard.board, board) === false) return false
        nextBoard = moveLeft(board)
        if (checkIsTheSame(nextBoard.board, board) === false) return false
        // console.log("over")
        return true;
    }

    // Check if it is win
    const checkWin = (board) => {
        // #########################
        // # 10 Implement yourself
        // #########################
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] == 65536) return true
            }
        }
        return false;
    }
    
    const handleKeyDown = (event) => {
        event.preventDefault();
        if (event.keyCode === 39) {
            moveGrid("right");
        } else if (event.keyCode === 40) {
            moveGrid("down");
        } else if (event.keyCode === 38) {
            moveGrid("up");
        } else if (event.keyCode === 37) {
            moveGrid("left");
        }
        // #########################
        // # 8 Implement yourself
        // #########################

    }
    
    // #########################
    // # 4 Implement yourself
    // You might need something to capture keyboard input
    // #########################
    useEffect(() => {
        body.addEventListener('keydown', handleKeyDown);
        return () => {
            body.removeEventListener('keydown', handleKeyDown);
        }
    })

    
    // Useful function for you to check the endgame
    const setBadEnd = () => {
        let nextBoard = [[2,4,2,4],
                        [4,2,4,2],
                        [2,4,2,128],
                        [4,128,2,2]];
        setBoard(nextBoard);
    }
    
    // Useful function for you to check the best result
    const setGoodEnd = () => {
        let nextBoard = [[2,2,4,8],
                        [128,64,32,16],
                        [256,512,1024,2048],
                        [32768,16384,8192,4096]];
        setBoard(nextBoard);
    }


    return (
        <>      
            <Header qs_ranking={qs_ranking} step={step} best_qs_ranking={best_qs_ranking} initializeBoard={initializeBoard}/>
            <Board2048 className="wrapper" board={board} win={win} gameover={gameover} initializeBoard={initializeBoard} newGridBoard={newGridBoard}/>
            <div className="btn-groups">
                <div className="btn-useful" id="badend-btn" onClick={setBadEnd}>BadEnd</div>
                <div className="btn-useful" id="goodend-btn" onClick={setGoodEnd}>GoodEnd</div>
            </div>
        </>
    );
}

export default MergeSchool;