import React from 'react'
import Layout from '../../components/Layout'
import UserTable from '../../components/UserTable'
import axios from 'axios'
import { APIURL } from '../../APIURL'
import User from '../../classes/User'
import { CustomerDataServer } from '../../classes/CustomerDataServer'
import { Line } from '../../classes/Line'
import LineTable from '../../components/LineTable'
import { LineDataServer } from '../../classes/LineDataServer'
const lines = ({data}:any) => {
   const [users, setusers] = React.useState<Line[]>([])
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
        <LineTable lines={data}  />
    </Layout>
  )

}

export async function getServerSideProps() {
  // Fetch data from external API
  const lineDataServer = new LineDataServer(); 
  const data : Line[] = await lineDataServer.get("line");
  // Pass data to the page via props
  return { props: { data } }
}



export default lines

