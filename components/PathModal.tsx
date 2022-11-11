import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton, Box } from '@chakra-ui/react'

import React, { useState } from 'react'

import { Draggable, Map, Marker, Overlay } from "pigeon-maps";
import { GeoLocationHandler } from '../classes/GeoLocationHandler';
import { BsInfo } from 'react-icons/bs';
import axios from 'axios';


interface PathModalProps{
    coords:any[]

}

const PathModal:React.FC<PathModalProps> = ({coords}) => {
 
  
  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const geoLocationHandler = new GeoLocationHandler();
    const [iconColor, seticonColor] = useState(false)
  return (

    <><IconButton  icon={<BsInfo size={18} color={!iconColor? "#4A5568" : "#48BB78"} />} colorScheme="gray" onMouseEnter={()=>seticonColor(true)} onMouseLeave={()=>seticonColor(false)}  onClick={onOpen} aria-label={'info'} /><Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Path</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <Map
                      height={500}
                      defaultCenter={[33.346326,10.490181]}
                      defaultZoom={11}
                  >
                    <Marker color='#FC8181' anchor={[coords[0][1],coords[0][0]]} />
                      {coords && coords.map(coord=> {
                        console.log(coord)
                        return ( <Overlay anchor={[coord[1],coord[0]]} >
                           <Box bgColor={"red.400"} w={1} h={1}></Box>
                      </Overlay>)})
                      }
                      {
                  
                    <Marker color='#FC8181' anchor={[coords[coords.length-1][1],coords[coords.length-1][0]]} />}

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