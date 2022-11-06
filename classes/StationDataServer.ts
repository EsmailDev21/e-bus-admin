import { HttpClient } from "./HttpClient";
import { Station } from "./Station";

export class StationDataServer extends HttpClient<Station>{
    /**
     *
     */
    constructor() {
        super();
        
    }
}