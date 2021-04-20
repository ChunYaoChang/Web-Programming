import Row from './Row'

export default function Board2048 (props) {

    let boardClassName = "board";
    let infoClassName = "info";
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";
    let overBoardClassName = "game-over-board"
    let overInfoClassName = "game-over-wrapper end-fade-in"
    if (props.win) {
        return (
            <>
            <table className={overBoardClassName} id="board-full">
                <tbody>
                    {props.board.map((row_vector, row_idx) => (<Row key={row_idx} row_vector={row_vector} row_idx={row_idx}/>))}
                </tbody>
            </table>
            <div className={overInfoClassName} id="game-over-info">
                <span id="game-over-text">{phdSentence}</span>
                <div className="button" id="game-over-button" onClick={props.initializeBoard}>Try again</div>
            </div>
            </>
        );
    } else if (props.gameover) {
        return (
            <>
            <table className={overBoardClassName} id="board-full">
                <tbody>
                    {props.board.map((row_vector, row_idx) => (<Row key={row_idx} row_vector={row_vector} row_idx={row_idx}/>))}
                </tbody>
            </table>
            <div className={overInfoClassName} id="game-over-info">
                <span id="game-over-text">{outSentence}</span>
                <div className="button" id="game-over-button" onClick={props.initializeBoard}>Try again</div>
            </div>
            </>
        );
    } else {
        return (
            <>
            <table className={boardClassName} id="board-full">
                <tbody>
                    {props.board.map((row_vector, row_idx) => (<Row key={row_idx} row_vector={row_vector} row_idx={row_idx}/>))}
                </tbody>
            </table>
            <div className={infoClassName} id="game-over-info">
                <span id="game-over-text">{outSentence}</span>
                <div className="button" id="game-over-button" onClick={props.initializeBoard}>Try again</div>
            </div>
            </>
        );
    }

};