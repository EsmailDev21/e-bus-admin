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
import AddLine from '../../components/AddLine'
import { Stack, Divider } from '@chakra-ui/react'
const lines = () => {
   const [lines, setLines] = React.useState<Line[]>([])
    const lineDataServer = new LineDataServer(); 
    
    const getData = async () => {
        const data : Line[] = await lineDataServer.get("line");
        console.log(data)
        setLines(data);
      };
    React.useEffect(() => {
      const abortController = new AbortController()
        getData();
      return () => {
        abortController.abort();
      }
    }, [])

  return (
    <Layout>
        <Stack direction={"column"} spacing={5}>
        <AddLine lines={lines} setLines={setLines}  />
        <Divider />
        <LineTable setLines={setLines} lines={lines}  />
        </Stack>
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

