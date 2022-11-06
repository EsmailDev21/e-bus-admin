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

interface AddLineProps {
  lines: Line[];
  setLines: React.Dispatch<React.SetStateAction<Array<Line>>>;
}
const AddLine: React.FC<AddLineProps> = ({ setLines, lines }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handleAddLocation = async (latitude: number, longitude: number) => {};
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
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
        <form>
          <ModalContent>
            <ModalHeader>Add Line</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Label</FormLabel>
                <Input
                  ref={initialRef}
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
                        {isOpen ? "Close" : "Open"}
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Download</MenuItem>
                        <MenuItem onClick={() => alert("Kagebunshin")}>
                          Create a Copy
                        </MenuItem>
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
                        {isOpen ? "Close" : "Open"}
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Download</MenuItem>
                        <MenuItem onClick={() => alert("Kagebunshin")}>
                          Create a Copy
                        </MenuItem>
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
export default AddLine;
