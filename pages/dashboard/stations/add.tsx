import {
    Button,
    Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../../../components/Layout";
import { BsPlus } from "react-icons/bs";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }:any) => <div>{text}</div>;
const add = () => {
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };
  return (
    <Layout>
      <Stack width={"container.sm"} spacing={5}>
        <Text fontWeight={"semibold"} fontSize={24} color={"purple.400"} >Add a station</Text>
        <form>
          <FormControl>
            <FormLabel color={"gray.500"}>Label</FormLabel>
            <Input placeholder="Label" focusBorderColor="purple.400" type="text" />
          </FormControl>
           <Container>
           <GoogleMapReact
            
            bootstrapURLKeys={{ key: "my key" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}>
            <Text>Some text</Text>
        </GoogleMapReact>
           </Container>
          <Button my={5} colorScheme={"purple"} leftIcon={<BsPlus size={24}/>}>Submit</Button>
          
        </form>
      </Stack>
    </Layout>
  );
};

export default add;
