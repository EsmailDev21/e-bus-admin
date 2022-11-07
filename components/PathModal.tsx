import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton, Box } from '@chakra-ui/react'

import React from 'react'

import { Draggable, Map, Marker, Overlay } from "pigeon-maps";
import { GeoLocationHandler } from '../classes/GeoLocationHandler';
import { BsInfo } from 'react-icons/bs';
import axios from 'axios';


interface PathModalProps{
    start:{lat:number,lon:number},
    end:{lat:number,lon:number}
}

const PathModal:React.FC<PathModalProps> = ({start,end}) => {
    const options = {
        method: 'GET',
        url: 'https://trueway-directions2.p.rapidapi.com/FindDrivingRoute',
        params: {
          stops: (start.lat+","+start.lon+";"+end.lat+","+end.lon).toString()
        },
        headers: {
          'X-RapidAPI-Key': 'cb623a8a24msh29572bccdc813a0p11beccjsn7bbe82b17405',
          'X-RapidAPI-Host': 'trueway-directions2.p.rapidapi.com'
        }
      };
    const { isOpen, onOpen, onClose } = useDisclosure()
    const geoLocationHandler = new GeoLocationHandler();
    const [coords, setcoords] = React.useState(null)
    React.useEffect(() => {
        const abortController = new AbortController();
        
          
          axios.request(options).then(function (response) {
            setcoords(response.data);
        }).catch(function (error) {
            console.error(error);
        });
        console.log({coords})
      return () => {
        abortController.abort();
      }
    }, [])
  return (

    <><Button leftIcon={<BsInfo />} colorScheme={"purple"} opacity={0.8} onClick={onOpen}>Details</Button><Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Path</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <Map
                      height={300}
                      defaultCenter={[start.lat, start.lon]}
                      defaultZoom={11}
                  >
                    {
                      /*  coords && coords.route.geometry.coordinates.map(
                            coord=><Overlay anchor={[coord[0],coord[1]]} offset={[120, 79]}>
                           <div style={{height:"5px",width:"5px",backgroundColor:"red"}}></div>
                          </Overlay>
                        )*/
                    }
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

export default PathModal