import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
  } from "@chakra-ui/react";
  import React from "react";
import { Bus } from "../classes/Bus";
import { BusDataServer } from "../classes/BusDataServer";
  import { CustomerDataServer } from "../classes/CustomerDataServer";
  import { Station } from "../classes/Station";
  import { StationDataServer } from "../classes/StationDataServer";
  import User from "../classes/User";
  import { deleteUser } from "../functions/userActions";
import SingleBus from "./SingleBus";
  import SingleStation from "./SingleStation";
  import SingleUser from "./SingleUser";
  
  interface BusTableProps {
    buses: Bus[];
    setBuses:React.Dispatch<React.SetStateAction<Array<Bus>>>
  }
  const BusTable: React.FC<BusTableProps> = ({ buses,setBuses }) => {
    const busDataServer = new BusDataServer();
    const deleteBus = async (id: string) => {
      const data = await busDataServer.delete("bus/" + id);
      setBuses(buses.filter(bus=>bus.id != data.id))
    };
    return (
      <TableContainer>
        <Table variant={"striped"} colorScheme={"purple"}>
          <Thead>
            <Tr>
            <Th>Serie number</Th>
              <Th>Bus type</Th>
              <Th>Current state</Th>
              <Th>Number of places</Th>
              <Th>Current location</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {buses &&
              buses.map((bus: Bus) => (
                <SingleBus
                  deleteBus={function (id: string): void {
                    deleteBus(id)
                  }}
                  updateBus={function (id: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={bus.id}
                  busType={bus.busType}
                  locationId={bus.locationId}
                  numberOfPlaces={bus.numberOfPlaces}
                  serieNumber={bus.serieNumber}
                  state={bus.state}
                  key={bus.id}
                />
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
            <Th>Serie number</Th>
              <Th>Bus type</Th>
              <Th>Current state</Th>
              <Th>Number of places</Th>
              <Th>Current location</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    );
  };
  
  export default BusTable;
  