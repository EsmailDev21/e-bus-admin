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
import { Station } from "../classes/Station";

interface AddStationProps {
  initialLocation: {
    lon: number;
    lat: number;
  };
  stations:Station[],
  setStations:React.Dispatch<React.SetStateAction<Array<Station>>>
}
const AddStation: React.FC<AddStationProps> = ({ initialLocation,setStations,stations }) => {
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

  const stationDataServer = new StationDataServer();
  const locationDataServer = new LocationDataServer();
  const handleAddLocation = async (latitude:number,longitude:number) => {
    const data = await locationDataServer.post("location",{
        latitude:latitude,
        longitude:longitude
    }).then(data=>setlocationID(data.id))
    
    
  }
  const submitHandler = async (event:React.FormEvent<HTMLFormElement>, label:string,lon:number,lat:number ) => {
    event.preventDefault();
    const data = await stationDataServer.postWithLocation("station/with-location",{
        label:label,
        location:{
            create:{
                latitude:lat,
                longitude:lon
            }
        }
    })
    setStations([...stations,data]);
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
        <form onSubmit={(e)=>submitHandler(e,label,finalLocation[1],finalLocation[0])}>
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
                  anchor={[anchor[0],anchor[1]]}
                  onDragEnd={setAnchor}

                >
                  <Marker width={50} anchor={[anchor[0],anchor[1]]} />
                  
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
