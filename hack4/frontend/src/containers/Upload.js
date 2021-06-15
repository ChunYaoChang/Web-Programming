import Uploader from '../components/Uploader';
import { useQuery, useMutation, useSubscription } from "@apollo/client";

import "./Upload.css";
import {UPLOAD_MUTATION} from '../graphql/mutation';

export default function Upload() {

    // TODO get the mutation function
    // pass it to the Uploader component
    const [insertPeople] = useMutation(UPLOAD_MUTATION);

    return <div id="Upload">
        <div id="PeopleUploader">
            <Uploader tag="People" mutation={insertPeople}/>
        </div>
    </div>;
}
