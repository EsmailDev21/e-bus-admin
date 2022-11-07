import { Th, Tr , Stack, IconButton,Text, Wrap, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import User from '../classes/User'
import {BsPencilSquare, BsPersonX, BsX} from 'react-icons/bs'
import { Station } from '../classes/Station'
import { Location } from '../classes/Location'
import { StationDataServer } from '../classes/StationDataServer'
import { LocationDataServer } from '../classes/LocationDataServer'
import { GeoLocationHandler } from '../classes/GeoLocationHandler'
import LocationModal from './LocationModal'

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
    const [adress, setadress] = React.useState()
    
    
    const locationDataServer = new LocationDataServer();
    const getLocation = async (id:string) => {
        const data = await locationDataServer.getSingle("location/"+id);
        setLocation(data);
    }
    
    React.useEffect(() => {
        const abortController = new AbortController();
        
        getLocation(locationId);
        //geoLocationHandler.getAdressFromLocation(location.longitude,location.latitude).then(res=>console.log(setadress(res.data.display_name)))
      return () => {
        abortController.abort();
      }
    }, [])
    
  return (
    <>
    <Tr key={id}>
        <Th fontWeight={'normal'}>{id}</Th>
        <Th fontWeight={'normal'}><Text>{label}</Text></Th>
        <Th fontWeight={'normal'}>

          
              <LocationModal lon={location.longitude} lat={location.latitude} />


        </Th>
        <Th>
          <Stack width={'50px'} direction="row" spacing={2}>
            <IconButton
              onClick={() => deleteStation(id)}
              colorScheme='gray'
              aria-label={`Delete`}
              icon={<BsX />} />
            <IconButton
              onClick={() => updateStation(id)}
              colorScheme='gray'
              aria-label={`Update`}
              icon={<BsPencilSquare />} />
          </Stack>
        </Th>
      </Tr></>
  )
}

export default SingleStation
