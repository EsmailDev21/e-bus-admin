import { BusType } from "./BusType"

export interface Bus{
    id:string
    serieNumber : number
    busType :BusType
    numberOfPlaces : number
    state : string
    locationId : string
}