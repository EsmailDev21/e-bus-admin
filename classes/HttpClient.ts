import axios from "axios";
import { APIURL } from "../APIURL";

export class HttpClient<T> {
    private data!: T | T[] ;
    private error!: Error;
    private url : string;
    /**
     *
     */
    constructor() {
        this.url = APIURL ; 
        
    }
    setData(data : T | T[]){
        this.data = data
    }
    getData() : T | T[]{
        return this.data ; 
    }
    setError(error : Error){
        this.error = error;
    }
    getError():Error{
        return this.error;
    }
    async get(endPoint: string) : Promise<T[]> {
        let data;
        try {
            const res = await axios.get(`${this.url}/${endPoint}`);
            data = res.data
        } catch (error) {
            console.log(error)
        }
        return data
    }
    async getSingle(endPoint: string) : Promise<T> {
        let data;
        try {
            const res = await axios.get(`${this.url}/${endPoint}`);
            data = res.data
        } catch (error) {
            console.log(error)
        }
        return data
    }
    async post(endPoint: string,body:Partial<T>) : Promise<T> {
        let data;
        try {
            const res = await axios.post(`${this.url}/${endPoint}`,body);
            data = res.data
        } catch (error) {
            console.log(error)
        }
        return data
    }
    async update(endPoint: string,body:Partial<T>) : Promise<T> {
        let data;
        try {
            const res = await axios.put(`${this.url}/${endPoint}`,body);
            data = res.data
        } catch (error) {
            console.log(error)
        }
        return data
    }
    async delete(endPoint: string) : Promise<T> {
        let data;
        try {
            const res = await axios.delete(`${this.url}/${endPoint}`);
            data = res.data
        } catch (error) {
            console.log(error)
        }
        return data
    }
    
    
    
}