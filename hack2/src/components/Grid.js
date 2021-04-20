export default function Grid (props) {
    // console.log(props)
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}
    // let grid_id = `grid-0-0`;
    // let value_id = `value-0-0`;
    let temp_class_name = 'grid';

    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    // #########################
    let grid_id = `grid-${props.row_idx}-${props.column_idx}`;
    let value_id = `value-${props.row_idx}-${props.column_idx}`;
    let value = props.value === 0 ? "" : props.value;
    if (value !== "") {
        temp_class_name = temp_class_name + ` level-${value}`;
    }
    value = mapping[value]
    return (
        <td>
            <div className={temp_class_name} id={grid_id}>
                <div className="school-name" id={value_id}>{value}</div>
            </div>
        </td>
    );
}