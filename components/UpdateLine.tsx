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
  } from "@chakra-ui/react";
  import GoogleMapReact from "google-map-react";
  import React, { useState } from "react";
  import { BsCheck2, BsChevronDown, BsPlus, BsX } from "react-icons/bs";
  
  import { Draggable, Map, Marker } from "pigeon-maps";
  import { LineDataServer } from "../classes/LineDataServer";
  import { LocationDataServer } from "../classes/LocationDataServer";
  import { Line } from "../classes/Line";
  import { StationDataServer } from "../classes/StationDataServer";
  import { Station } from "../classes/Station";
  
  interface UpdateLineProps {
    lines: Line[];
    setLines: React.Dispatch<React.SetStateAction<Array<Line>>>;
    line : Line
  }
  const updateLine: React.FC<UpdateLineProps> = ({ setLines, lines,line }) => {
    const [station, setstation] = useState<Station[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [label, setlabel] = useState(line.label)
    const stationDataServer = new StationDataServer();
    const lineDataServer = new LineDataServer();
    const [selectedDepStation,setSelectedDepStation] = useState<Station>({id:"",label:"",locationId:""})
    const [selectedArrStation,setSelectedArrStation] = useState<Station>({id:"",label:"",locationId:""})
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const handleAddLocation = async (latitude: number, longitude: number) => {};
    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data : Line = await lineDataServer.update("line",{
        label:label,
        departureStationId : selectedDepStation.id,
        arriveStationId : selectedArrStation.id
      })
      setLines([...lines,data]);
    };
    const getData = async () => {
      const data : Station[] = await stationDataServer.get("station");
      console.log(data)
      setstation(data);
    };
  React.useEffect(() => {
    const abortController = new AbortController();
   getData();
  console.log(station)
    return () => {
      abortController.abort()
    }
  }, [])
  
    return (
      <>
        <Button
          w={"fit-content"}
          leftIcon={<BsPlus size={24} />}
          colorScheme="purple"
          onClick={onOpen}
        >
          Add Line
        </Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <form onSubmit={submitHandler}>
            <ModalContent>
              <ModalHeader>Update Line</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>Label</FormLabel>
                  <Input
                    ref={initialRef}
                    value={label}
                    onChange={(e)=>setlabel(e.target.value)}
                    placeholder="Label..."
                    focusBorderColor="purple.400"
                  />
                </FormControl>
  
                <FormControl isRequired mt={4}>
                  <FormLabel>Departure Station</FormLabel>
                  <Menu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton
                          color={"purple.100"}
                          isActive={isOpen}
                          as={Button}
                          bg={"purple.400"}
                          _hover={{ bg: "purple.300" }}
                          rightIcon={<BsChevronDown size={18} />}
                        >
                          {(selectedDepStation.id != "") ? selectedDepStation.label : "Open" }
                        </MenuButton>
                        <MenuList id={selectedDepStation.id}>
                          {
                            station && station.map(
                              (station:Station) => <MenuItem onClick={()=>setSelectedDepStation(station)}>{station.label}</MenuItem>
                            )
                          }
                        </MenuList>
                      </>
                    )}
                  </Menu>
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel>Arrive Station</FormLabel>
                  <Menu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton
                          color={"purple.100"}
                          isActive={isOpen}
                          as={Button}
                          bg={"purple.400"}
                          _hover={{ bg: "purple.300" }}
                          rightIcon={<BsChevronDown size={18} />}
                        >
                          {(selectedArrStation.id!="")? selectedArrStation.label :  "Open"}
                        </MenuButton>
                        <MenuList id={selectedArrStation.id}>
                        {
                            station && station.map(
                              (station:Station) => <MenuItem onClick={()=>setSelectedArrStation(station)}>{station.label}</MenuItem>
                            )
                          }
                        </MenuList>
                      </>
                    )}
                  </Menu>
                </FormControl>
              </ModalBody>
  
              <ModalFooter>
                <Button
                  type="submit"
                  leftIcon={<BsPlus size={24} />}
                  colorScheme="purple"
                  mr={3}
                  onClick={onClose}
                >
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
  export default updateLine;
  