import axios from "axios";
import { time } from "console";
import { Location } from "./Location";
    
export class GeoLocationHandler{
    private access_token : string;
    private pathData : any
    constructor(){
        this.access_token = "pk.f74c7cfc50a54eb92f78528e562a1388"
    }

    async getAdressFromLocation(lon:number,lat:number){
        return await axios.get(`https://eu1.locationiq.com/v1/reverse?key=${this.access_token}&lat=${lat.toString()}&lon=${lon.toString()}&format=json`)
        
    }
    async getPathBetweenLocations(stops:string) {
    
      
        const options = {
            method: 'GET',
            url: 'https://trueway-directions2.p.rapidapi.com/FindDrivingRoute',
            params: {
              stops: stops
            },
            headers: {
              'X-RapidAPI-Key': 'cb623a8a24msh29572bccdc813a0p11beccjsn7bbe82b17405',
              'X-RapidAPI-Host': 'trueway-directions2.p.rapidapi.com'
            }
          };
          
         const res = await axios.request(options)
         this.setPathData(res.data)
    }
    setPathData(data:any){
        this.pathData = data
    }
    getPathData(){
return this.pathData
    }
}