import constants from '../constants';  
import { useQuery, useMutation, useSubscription } from "@apollo/client";
// Look at this file and see how the watchList is strucutred
import { STATSCOUNT_QUERY } from '../graphql';

export default function WatchList() {

    // TODO
    // query countStats
    // save the result in a counts variable
    console.log(STATSCOUNT_QUERY)
    const {loading, error, previousData, data, subscribeToMore} = useQuery(STATSCOUNT_QUERY, {
        varaibles: {severity: 1, locationKeywords: constants.watchList},
    })
    console.log(data)
    const counts = data;

    // TODO
    // use subscription
    
    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => 
                    <tr key={keyword}>
                        <td>{keyword}</td>
                        {/* You might need to see this */}
                        <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}