import React, { useState } from "react";
import RowButton from "../components/RowButton";
import Body from "../components/Body";

const FakeSheet = () => {

    const [data, setData] = useState({})
    const [numRow, setNumRow] = useState(10)
    const [numCol, setNumCol] = useState(5)

    const handleChangeCell = (row, col, value) => {
        const modifiedData = Object.assign({}, data)
        if (!modifiedData[row]) modifiedData[row] = {}
        modifiedData[row][col] = value
        setData(modifiedData)
    }

    // console.log(typeof handleChangeCell)

    return (
        <div className="wrapper">
            <RowButton className="c0"/>
            <Body 
                data={data}
                handleChangeCell={handleChangeCell}
                numRow={numRow}
                numCol={numCol}
            />

        </div>
    )
}

export default FakeSheet;

