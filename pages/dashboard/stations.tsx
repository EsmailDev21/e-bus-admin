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
import StationTable from '../../components/StationTable'
import { StationDataServer } from '../../classes/StationDataServer'
import { Station } from '../../classes/Station'
import { Button, Divider, Stack, useDisclosure } from '@chakra-ui/react'
import { BsPlus } from 'react-icons/bs'
import AddStation from '../../components/AddStation'
const stations = () => {
   const [stations, setStations] = React.useState<Station[]>([])
   const { isOpen, onOpen, onClose } = useDisclosure()
    const stationDataServer = new StationDataServer(); 
    
    const getData = async () => {
        const data : Station[] = await stationDataServer.get("station");
        console.log(data)
        setStations(data);
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
        <AddStation initialLocation={{lat:33.346326,lon:10.490181}} />
        <Divider />
        <StationTable stations={stations} setStations={setStations}  />
        </Stack>
    </Layout>
  )

}

export async function getServerSideProps() {
  // Fetch data from external API
  const stationDataServer = new StationDataServer(); 
  const data : Station[] = await stationDataServer.get("station");
  // Pass data to the page via props
  return { props: { data } }
}



export default stations

