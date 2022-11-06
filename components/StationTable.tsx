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
  import { CustomerDataServer } from "../classes/CustomerDataServer";
  import { Station } from "../classes/Station";
  import { StationDataServer } from "../classes/StationDataServer";
  import User from "../classes/User";
  import { deleteUser } from "../functions/userActions";
  import SingleStation from "./SingleStation";
  import SingleUser from "./SingleUser";
  
  interface StationTableProps {
    stations: Station[];
    setStations:React.Dispatch<React.SetStateAction<Array<Station>>>
  }
  const StationTable: React.FC<StationTableProps> = ({ stations,setStations }) => {
    const stationDataServer = new StationDataServer();
    const deleteStation = async (id: string) => {
      const data = await stationDataServer.delete("station/" + id);
      setStations(stations.filter(station=>station.id != data.id))
    };
    return (
      <TableContainer>
        <Table variant={"striped"} colorScheme={"purple"}>
          <Thead>
            <Tr>
            <Th>Id</Th>
              <Th>Label</Th>
              <Th>Location</Th>

              
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stations &&
              stations.map((station: Station) => (
                <SingleStation
                  deleteStation={function (id: string): void {
                    deleteStation(id)
                  }}
                  updateStation={function (id: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={station.id}
                  label={station.label}
                  locationId={station.locationId}
                />
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Id</Th>
              <Th>Label</Th>
              <Th>Location</Th>
              <Th>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    );
  };
  
  export default StationTable;
  