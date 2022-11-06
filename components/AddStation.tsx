import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import React, { useState } from "react";
import { BsCheck2, BsPlus, BsX } from "react-icons/bs";

import { Draggable, Map, Marker } from "pigeon-maps";
import { StationDataServer } from "../classes/StationDataServer";
import { LocationDataServer } from "../classes/LocationDataServer";

interface AddStationProps {
  initialLocation: {
    lon: number;
    lat: number;
  };
}
const AddStation: React.FC<AddStationProps> = ({ initialLocation }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [anchor, setAnchor] = useState([
    initialLocation.lat,
    initialLocation.lon,
  ]);
  const [finalLocation,setFinalLocation] = useState([0,0])
  console.log(finalLocation)
  const [label, setlabel] = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [locationID, setlocationID] = useState("");
  console.log(locationID)
  const stationDataServer = new StationDataServer();
  const locationDataServer = new LocationDataServer();
  const handleAddLocation = async (latitude:number,longitude:number) => {
    const data = await locationDataServer.post("location",{
        latitude,
        longitude
    }).then(data=>setlocationID(data.id))
    
    
  }
  const submitHandler = async (event:React.FormEvent<HTMLFormElement>, label:string,locationId:string ) => {
    event.preventDefault();
    const data = await stationDataServer.post("station",{
        label:label,
        locationId:locationId
    })
    console.log(data)
  }
  return (
    <>
      <Button
        w={"fit-content"}
        leftIcon={<BsPlus size={24} />}
        colorScheme="purple"
        onClick={onOpen}
      >
        Add Station
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={(e)=>submitHandler(e,label,locationID)}>
        <ModalContent>
          <ModalHeader>Add Station</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
           
            <FormControl isRequired>
              <FormLabel>Label</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Label..."
                focusBorderColor="purple.400"
                value={label}
                onChange={event=>setlabel(event.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Location</FormLabel>
              <Map
                height={300}
                defaultCenter={[initialLocation.lat, initialLocation.lon]}
                defaultZoom={11}
              >
                <Draggable
                  offset={[60, 87]}
                  anchor={anchor}
                  onDragEnd={setAnchor}

                >
                  <Marker width={50} anchor={anchor} />
                  
                </Draggable>
              </Map>
              <Button onClick={()=>{
                setFinalLocation(anchor);
                handleAddLocation(finalLocation[0],finalLocation[1])
            }}  float={"right"} bg={"#00ff84"} _hover={{bg:"#42ffa4"}} leftIcon={<BsCheck2 size={24} />}>Set location</Button>
            </FormControl>
            
          </ModalBody>

          <ModalFooter>
            <Button type="submit" leftIcon={<BsPlus size={24} />} colorScheme="purple" mr={3}>
              Save
            </Button>
            <Button leftIcon={<BsX size={24} />} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default AddStation;
