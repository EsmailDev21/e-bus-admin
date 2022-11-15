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
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spinner,
  } from "@chakra-ui/react";
  import GoogleMapReact from "google-map-react";
  import React, { useState } from "react";
  import { BsCheck2, BsChevronDown, BsPlus, BsX } from "react-icons/bs";
  
  import { Draggable, Map, Marker } from "pigeon-maps";
  import { StationDataServer } from "../classes/StationDataServer";
  import { LocationDataServer } from "../classes/LocationDataServer";
  import { Station } from "../classes/Station";
import { Bus } from "../classes/Bus";
import { BusDataServer } from "../classes/BusDataServer";
import { BusType } from "../classes/BusType";
import { BusTypeDataServer } from "../classes/BusTypeDataServer";
  
  interface AddBusProps {
    initialLocation:{
        lat:number,
        lon:number
    }
    buses:Bus[],
    setBuses:React.Dispatch<React.SetStateAction<Array<Bus>>>
  }
  const AddBus: React.FC<AddBusProps> = ({ buses,setBuses, initialLocation }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [anchor, setAnchor] = useState([
      initialLocation.lat,
      initialLocation.lon,
    ]);
    const [finalLocation,setFinalLocation] = useState([0,0])
    console.log(finalLocation)
    const [serieNumber, setSerieNumber] = useState("");
    const [numberOfPlaces, setNumberOfPlaces] = useState("");
    const [busType, setBusType] = useState("");
    const [state, setState] = useState("");
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [locationID, setlocationID] = useState("");
    const [loading,setLoading] = useState(false)
    const busDataServer = new BusDataServer();
    const locationDataServer = new LocationDataServer();
    const busTypeDataServer = new BusTypeDataServer();
    const [busTypes, setBusTypes] = useState<BusType[]>([])
    const handleAddLocation = async (latitude:number,longitude:number) => {
      const data = await locationDataServer.post("location",{
          latitude:latitude,
          longitude:longitude
      }).then(data=>setlocationID(data.id))
      
      
    }
    const submitHandler = async (event:React.FormEvent<HTMLFormElement>, serieNumber:string,numberOfPlaces:string,busType:string,state:string,lon:number,lat:number ) => {
      event.preventDefault();
     setLoading(true)
      const data = await busDataServer.postWithLocation("bus/",{
          serieNumber:parseInt(serieNumber),
          numberOfPlaces : parseInt(numberOfPlaces),
          busType:{
            label:busType
          },
          location:{
              create:{
                  latitude:lat,
                  longitude:lon
              }
          },
          state:state
      })
      setBuses([...buses,data]);
      setLoading(false)
      onClose();
      console.log(data)
    }
    return (
      <>
        <Button
          w={"fit-content"}
          leftIcon={<BsPlus size={24} />}
          colorScheme="purple"
          onClick={onOpen}
          borderRadius={9999}
        >
          Add Bus
        </Button>
  
        <Modal
        size={"4xl"}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <form onSubmit={(e)=>submitHandler(e,serieNumber,numberOfPlaces,busType,state,finalLocation[1],finalLocation[0])}>
          <ModalContent>
            <ModalHeader>Add Bus</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
             
              <FormControl isRequired>
                <FormLabel>Serie Number</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Serie number"
                  focusBorderColor="purple.400"
                  value={serieNumber}
                  type={"number"}
                  onChange={event=>setSerieNumber(event.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Number of places</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Number of places"
                  focusBorderColor="purple.400"
                  value={numberOfPlaces}
                  type={"number"}
                  onChange={event=>setNumberOfPlaces(event.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Current state</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Current state"
                  focusBorderColor="purple.400"
                  value={state}
                  type={"text"}
                  onChange={event=>setState(event.target.value)}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Bus Type</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Bus Type"
                  focusBorderColor="purple.400"
                  value={busType}
                  type={"text"}
                  onChange={event=>setBusType(event.target.value)}
                />
              </FormControl>
              
              <FormControl isRequired mt={4}>
                <FormLabel>Current Location</FormLabel>
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
                <Button borderRadius={9999} onClick={()=>{
                  setFinalLocation(anchor);
                  handleAddLocation(finalLocation[0],finalLocation[1])
              }}  float={"right"} bg={"#00ff84"} _hover={{bg:"#42ffa4"}} leftIcon={<BsCheck2 size={24} />}>Set location</Button>
              </FormControl>
              
            </ModalBody>
  
            <ModalFooter>
              <Button borderRadius={9999} type="submit" leftIcon={<BsPlus size={24} />} colorScheme="purple" mr={3}>
                {loading ? <Spinner color="white" size={"md"} /> : "Save"}
              </Button>
              <Button borderRadius={9999} leftIcon={<BsX size={24} />} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
          </form>
        </Modal>
      </>
    );
  };
  export default AddBus;
  