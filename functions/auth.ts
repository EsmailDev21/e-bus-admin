import axios from 'axios'
import { NextRouter, useRouter } from 'next/router';
import { APIURL } from '../APIURL'


export const useSigninHandler = async (event:React.FormEvent<HTMLFormElement>,phoneNumber:string,password:string, router:NextRouter) => {

    event.preventDefault();
    await axios.post(`${APIURL}/auth/signin`,{
        phoneNumber:parseInt(phoneNumber),
        password:password
    })
    .then(
        res=> res.data.role!='ADMIN' ? router.push('/error') : router.push('/dashboard')
    )
    .catch(error => console.log(error))
}