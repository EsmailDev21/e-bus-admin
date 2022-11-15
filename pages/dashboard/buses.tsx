import React from 'react'
import Layout from '../../components/Layout'
import StationTable from '../../components/StationTable'
import { StationDataServer } from '../../classes/StationDataServer'
import { Station } from '../../classes/Station'
import { Center, Divider, Spinner, Stack, useDisclosure } from '@chakra-ui/react'
import AddStation from '../../components/AddStation'
import { Bus } from '../../classes/Bus'
import { BusDataServer } from '../../classes/BusDataServer'
import AddBus from '../../components/AddBus'
import BusTable from '../../components/BusTable'
const buses = () => {
   const [buses, setBuses] = React.useState<Bus[]>([])
   const [loading, setloading] = React.useState(true)
   const { isOpen, onOpen, onClose } = useDisclosure()
    const busDataServer = new BusDataServer(); 
    
    const getData = async () => {
        const data : Bus[] = await busDataServer.get("bus");
        console.log(data)
        setBuses(data);
        setloading(false)
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
        <AddBus buses={buses} setBuses={setBuses} initialLocation={{lat:33.346326,lon:10.490181}}  />
        <Divider />
        {loading ? <Center> <Spinner color='purple.300' /></Center> : <BusTable buses={buses} setBuses={setBuses}  />}
        </Stack>
    </Layout>
  )

}





export default buses

