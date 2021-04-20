import Grid from '../components/Grid'
export default function Row (props) {
    var row_idx = props.row_idx
    // console.log(row_idx)
    return (
        <tr>
          {props.row_vector.map((value, column_idx) => (<Grid key={column_idx} row_idx={row_idx} column_idx={column_idx} value={value}/>))}
        </tr>
    );
};