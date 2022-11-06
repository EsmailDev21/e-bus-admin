import axios from 'axios'
import { APIURL } from '../APIURL'
import User from '../classes/User'

export const deleteUser  = async (id:string) :Promise<User> => {
     return await axios.delete(`${APIURL}/user/${id}`)
        .then(
            res => res.data
        )
        .catch(
            err => console.log(err)
        )
}