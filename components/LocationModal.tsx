import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'

import React from 'react'

import { Draggable, Map, Marker } from "pigeon-maps";
import { GeoLocationHandler } from '../classes/GeoLocationHandler';


interface LocationModalProps{
    lon:number,
    lat:number
}
const LocationModal:React.FC<LocationModalProps> = ({lon,lat}) => {
    const [adress, setadress] = React.useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const geoLocationHandler = new GeoLocationHandler();
    React.useEffect(() => {
        const abortController = new AbortController();
        
        geoLocationHandler.getAdressFromLocation(lon,lat).then(res=>console.log(setadress(res.data.display_name)))
      return () => {
        abortController.abort();
      }
    }, [])
  return (
    
    <><Button onClick={onOpen}>{"{Longitude : " + lat + ", Latitude : " + lon + "}"}</Button><Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>{adress}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <Map
                      height={300}
                      defaultCenter={[lon, lat]}
                      defaultZoom={11}
                  >

                      <Marker color='#9F7AEA' width={50} anchor={[lon, lat]} />

                  </Map>
              </ModalBody>

              <ModalFooter>
                  <Button colorScheme='purple' mr={3} onClick={onClose}>
                      Close
                  </Button>
              </ModalFooter>
          </ModalContent>
      </Modal></>
  )
}

export default LocationModal