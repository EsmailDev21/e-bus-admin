import axios from "axios";
import { HttpClient } from "./HttpClient";
import { Line } from "./Line";
import { Location } from "./Location";

export class LineDataServer extends HttpClient<Line>{
    /**
     *
     */
    constructor() {
        super();
        
    }
    async getRoute(endPoint: string) : Promise<Location[]> {
        let data;
        try {
            const res = await axios.get(`${this.url}/${endPoint}`);
            data = res.data
        } catch (error) {
            console.log(error)
        }
        return data
    }
}