import axios from "axios";
import { Bus } from "./Bus";
import { HttpClient } from "./HttpClient";

export class BusDataServer extends HttpClient<Bus>{
    /**
     *
     */
    constructor() {
        super();
        
    }
    async postWithLocation(endPoint: string,body:Object) : Promise<Bus> {
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