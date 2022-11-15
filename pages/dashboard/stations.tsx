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
import { Button, Center, Divider, Spinner, Stack, useDisclosure } from '@chakra-ui/react'
import { BsPlus } from 'react-icons/bs'
import AddStation from '../../components/AddStation'
import Search from '../../components/Search'
const stations = () => {
   const [stations, setStations] = React.useState<Station[]>([])
   const [loading, setloading] = React.useState(true)
   const { isOpen, onOpen, onClose } = useDisclosure()
    const stationDataServer = new StationDataServer(); 
    const [query,setQuery] = React.useState("");
    const searchHandler = (stations:Station[],event:React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
       setStations(stations.filter(station=> station.label.includes(query)))
      
      // if(query.length===0) getData();
    }
    const getData = async () => {
        const data : Station[] = await stationDataServer.get("station");
        console.log(data)
        setStations(data);
        setloading(false)
      };
    React.useEffect(() => {
      const abortController = new AbortController()
      if(query.length===0)
        getData();
      return () => {
        abortController.abort();
      }
    }, [query])

  return (
    <Layout>
        
        <Stack direction={"column"} spacing={5}>
          <Stack  width={{md:"50%", base:"full"}}  direction={"row"}>
          <AddStation stations={stations} setStations={setStations} initialLocation={{lat:33.346326,lon:10.490181}} />
      
          <Search value={query} onChange={(event)=>searchHandler(stations,event)} onClick={()=>console.log("clicked")} />
          </Stack>
          <Divider />
        {loading ? <Center> <Spinner color='purple.300' /></Center> : <StationTable stations={stations} setStations={setStations}  />}
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

