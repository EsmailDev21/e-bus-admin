import React from 'react'
import Layout from '../../components/Layout'
import UserTable from '../../components/UserTable'
import axios from 'axios'
import { APIURL } from '../../APIURL'
import User from '../../classes/User'
import { CustomerDataServer } from '../../classes/CustomerDataServer'
const users = ({data}:any) => {
   const [users, setusers] = React.useState<User[]>([])
   /* const customerDataServer = new CustomerDataServer(); 
    
    const getData = async () => {
        const data : User[] = await customerDataServer.get("user");
        console.log(data)
        setusers(data);
      };
    React.useEffect(() => {
      const abortController = new AbortController()
        getData();
      return () => {
        abortController.abort();
      }
    }, [])
*/
  return (
    <Layout>
        <UserTable users={data}  />
    </Layout>
  )

}

export async function getServerSideProps() {
  // Fetch data from external API
  const customerDataServer = new CustomerDataServer(); 
  const data : User[] = await customerDataServer.get("user");
  // Pass data to the page via props
  return { props: { data } }
}



export default users

