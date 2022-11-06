import axios from "axios";
import { HttpClient } from "./HttpClient";
import { Station } from "./Station";

export class StationDataServer extends HttpClient<Station>{
    /**
     *
     */
    constructor() {
        super();
        
    }
    async postWithLocation(endPoint: string,body:Object) : Promise<Station> {
        let data;
        try {
            const res = await axios.post(`${this.url}/${endPoint}`,body);
            data = res.data
        } catch (error) {
            console.log(error)
        }
        return data
    }
}