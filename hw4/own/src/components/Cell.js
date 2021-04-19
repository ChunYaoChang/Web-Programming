import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types'

const Cell = ({handleChangeCell, key, r, c, value, executeFormula}) => {

    var timer = 0
    var delay = 200
    var prevent = false

    const [singleEdit, setSingleEdit] = useState(false)
    const [doubleEdit, setDoubleEdit] = useState(false)
    const [selected, setSelected] = useState(false)
    const [displayValue, setDisplayValue] = useState(value)
    const [nowValue, setNowValue] = useState(value)
    useEffect(() => {
        setDisplayValue(determineDisplay(r, c, nowValue))
        window.document.addEventListener('unselectAll', handleUnselectAll)
        return () => {
            window.document.removeEventListener('unselectAll', handleUnselectAll)
        }
    })
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState(), [])

    const onChange = (e) => {
        setNowValue(e.target.value)
        setDisplayValue(determineDisplay(r, c, e.target.value))
        // console.log(displayValue)
        forceUpdate()
    }

    const onKeyPressOnInput = (e) => {
        if (e.key == 'Enter') {
            hasNewValue(e.target.value)
        }
    }

    const onKeyPressOnTd = (e) => {
        if (!singleEdit) {
            setSingleEdit(true)
        }
        if (e.keyCode == 8) {
            console.log("backspace")
            setDisplayValue("")
            setNowValue("")
        } else {
            setDisplayValue(e.key)
        }
        console.log(displayValue)
    }

    const onBlur = (e) => {    
        hasNewValue(e.target.value)
    }

    const handleUnselectAll = () => {
        if (selected || doubleEdit) {
            setSelected(false)
            setDoubleEdit(false)
        }
    }

    const hasNewValue = (value) => {
        handleChangeCell(r, c, value)
        setDoubleEdit(false)
        setSingleEdit(false)
    }

    const emitUnselectAllEvent = () => {
        const unselectAllEvent = new Event('unselectAll')
        window.document.dispatchEvent(unselectAllEvent)
    }

    const clicked = () => {
        timer = setTimeout(() => {
            if (!prevent) {
                emitUnselectAllEvent()
                setSelected(true)
            }
            prevent = false
        }, delay)
    }

    const doubleClicked = () => {
        clearTimeout(timer)
        prevent = true
        emitUnselectAllEvent()
        setDoubleEdit(true)
        setSelected(true)
    }

    const determineDisplay = (r, c, value) => {
        if (value.slice(0, 1) === '=') {
            const res = executeFormula({r, c}, value.slice(1))
            // console.log(res)
            if (res.error !== null) {
                return "ERROR!"
            } else {
                return res.result
            }
        } else {
            return value
        }
    }
    /**
   * Calculates a cell's CSS values
   */
    const calculateCss = () => {
        const css = {
            width: '80px',
            padding: '4px',
            margin: '0',
            height: '25px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'inline-block',
            color: 'black',
            border: '1px solid #cacaca',
            textAlign: 'left',
            verticalAlign: 'top',
            fontSize: '14px',
            lineHeight: '15px',
            overflow: 'hidden',
            fontFamily: 'Calibri, \'Segoe UI\', Thonburi, Arial, Verdana, sans-serif',
        }

        if (r === 0 || c === 0) {
            css.textAlign = 'center'
            css.backgroundColor = '#f0f0f0'
            css.fontWeight = 'bold'
        }

        return css
    }

    const css = calculateCss()
    if (c == 0) {
        return  (
            <td style={css}>
                {r}
            </td>
        )
    }
    if (r == 0) {
        const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('')
        return (
            <td style={css}>
                {alpha[c]}
            </td>
        )
    }
    if (selected) {
        css.outlineColor = 'blue'
        css.outlineStyle = 'solid'
    }
    if (singleEdit) {
        return (
            <input
                style={css}
                type="text"
                onBlur={onBlur}
                onKeyPress={onKeyPressOnInput}
                value={displayValue}
                onChange={onChange}
                autoFocus
            />
        )
    }
    if (doubleEdit) {
        return (
                <input
                    style={css}
                    type="text"
                    onBlur={onBlur}
                    onKeyPress={onKeyPressOnInput}
                    value={nowValue}
                    onChange={onChange}
                    autoFocus
                />
        )
    }
    return (
        <td 
            style={css}
            onClick={e => clicked(e)}
            onKeyPress={onKeyPressOnTd}
            onDoubleClick={e => doubleClicked(e)}
            tabIndex="0"
        >
        {displayValue}
        </td>
    )
}

Cell.propTypes = {
    handleChangeCell: PropTypes.func.isRequired,
}
export default Cell;