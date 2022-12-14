import { Th, Tr , Stack, IconButton,Text, Wrap, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box} from '@chakra-ui/react'
import React, { useState } from 'react'
import User from '../classes/User'
import {BsPencilSquare, BsPersonX, BsX} from 'react-icons/bs'
import { Station } from '../classes/Station'
import { Location } from '../classes/Location'
import { StationDataServer } from '../classes/StationDataServer'
import { LocationDataServer } from '../classes/LocationDataServer'
import { GeoLocationHandler } from '../classes/GeoLocationHandler'
import LocationModal from './LocationModal'
import { LineDataServer } from '../classes/LineDataServer'
import { Bus } from '../classes/Bus'

interface SingleBusProps extends Bus{
    deleteBus:(id:string)=>void,
    updateBus:(id:string)=>void
}
const SingleBus:React.FC<SingleBusProps > = ({
    id,
busType,
numberOfPlaces,
serieNumber,
state,
locationId,
    updateBus,
    deleteBus,
}) => {
    const [location, setLocation] = React.useState<Location>({
        id:"",latitude:0,longitude:0
    })
    const [adress,setAdress] = useState("");
    const [loading,setLoading] = useState(true)
    const geoLocationHandler = new GeoLocationHandler();
    const locationDataServer = new LocationDataServer();
    const getLocation = async (id:string) => {
        const data = await locationDataServer.getSingle("location/"+id);
        

        setLocation(data);

        setLoading(false)
        geoLocationHandler.getAdressFromLocation(data.longitude,data.latitude).then((res)=>setAdress(res.data.results[0].formatted))
    }
    
    
    
    React.useEffect(() => {
        const abortController = new AbortController();
        
        getLocation(locationId);
        
       
      return () => {
        abortController.abort();
      }
    }, [])
    
  return (
    <>
    <Tr key={id}>
        <Th fontWeight={'normal'}>{serieNumber}</Th>
        <Th fontWeight={'normal'}><Text>{busType.label}</Text></Th>
        <Th fontWeight={'normal'} ><Box fontWeight={"semibold"} textAlign={"center"} bg={getStateColor(state)} padding={1} color="white" borderRadius={9999}><Text opacity={0.8}>{state}</Text></Box></Th>
        <Th fontWeight={'normal'}>{numberOfPlaces} Place</Th>
        <Th fontWeight={'normal'}>

          
              <LocationModal adress={adress} lon={location.longitude} lat={location.latitude} />


        </Th>
        <Th>
          <Stack width={'50px'} direction="row" spacing={2}>
            <IconButton
              onClick={() => deleteBus(id)}
              colorScheme='gray'
              aria-label={`Delete`}
              icon={<BsX />} />
            <IconButton
              onClick={() => updateBus(id)}
              colorScheme='gray'
              aria-label={`Update`}
              icon={<BsPencilSquare />} />
          </Stack>
        </Th>
      </Tr></>
  )
}

export default SingleBus

const getStateColor = (state:string) => {
  switch (state.toLowerCase()) {
    case "active":
      return "green.300"
      break;
    case "inactive":
      return "gray.300"
      break;
    default:
      return "red.300"
      break;
  }
}