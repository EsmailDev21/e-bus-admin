import { Th, Tr , Stack, IconButton,Text} from '@chakra-ui/react'
import React from 'react'
import User from '../classes/User'
import {BsPencilSquare, BsPersonX, BsX} from 'react-icons/bs'
import { Station } from '../classes/Station'
import { Location } from '../classes/Location'
import { StationDataServer } from '../classes/StationDataServer'
import { LocationDataServer } from '../classes/LocationDataServer'

interface SingleStationProps extends Station{
    deleteStation:(id:string)=>void,
    updateStation:(id:string)=>void
}
const SingleStation:React.FC<SingleStationProps > = ({
    id,
label,
locationId,
    updateStation,
    deleteStation,
}) => {
    const [location, setLocation] = React.useState<Location>({
        id:"",latitude:0,longitude:0
    })

    const locationDataServer = new LocationDataServer();
    const getLocation = async (id:string) => {
        const data = await locationDataServer.getSingle("location/"+id);
        setLocation(data);
    }
   
    React.useEffect(() => {
        const abortController = new AbortController();
        getLocation(locationId);
      return () => {
        abortController.abort();
      }
    }, [locationId])
    
  return (
    <Tr key={id}>
    <Th fontWeight={'normal'} >{id}</Th>
    <Th fontWeight={'normal'}><Text>{label}</Text></Th>
    <Th fontWeight={'normal'}>
        <Stack>
            <Text>Longitude : {location.longitude}</Text>
            <Text>Latitude : {location.latitude}</Text>
        </Stack>
    </Th>
    <Th >
        <Stack width={'50px'} direction="row" spacing={2}>
        <IconButton
        onClick={()=>deleteStation(id)}
  colorScheme='gray'
  aria-label={`Delete`}
  icon={<BsX  />}
/>
<IconButton
        onClick={()=>updateStation(id)}
  colorScheme='gray'
  aria-label={`Update`}
  icon={<BsPencilSquare  />}
/>
        </Stack>
    </Th>
  </Tr>
  )
}

export default SingleStation
