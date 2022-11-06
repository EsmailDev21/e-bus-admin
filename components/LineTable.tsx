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
import { Line } from "../classes/Line";
import { LineDataServer } from "../classes/LineDataServer";
import User from "../classes/User";
import { deleteUser } from "../functions/userActions";
import SingleLine from "./SingleLine";
import SingleUser from "./SingleUser";

interface LineTableProps {
  lines: Line[];
}
const LineTable: React.FC<LineTableProps> = ({ lines }) => {
  const lineDataServer = new LineDataServer();
  const deleteLine = async (id: string) => {
    const data = await lineDataServer.delete("line/" + id);
  };
  return (
    <TableContainer>
      <Table variant={"striped"} colorScheme={"purple"}>
        <Thead>
          <Tr>
          <Th>Id</Th>
            <Th>Departure Station</Th>
            <Th>Arrive Station</Th>
            <Th>Added on</Th>
            
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lines &&
            lines.map((line: Line) => (
              <SingleLine
                deleteLine={function (id: string): void {
                  throw new Error("Function not implemented.");
                }}
                updateLine={function (id: string): void {
                  throw new Error("Function not implemented.");
                }}
                id={line.id}
                departureStationId={line.departureStationId}
                arriveStationId={line.arriveStationId}
                addedOn={line.addedOn}
              />
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
          <Th>Id</Th>
            <Th>Departure Station</Th>
            <Th>Arrive Station</Th>
            <Th>Added on</Th>
            
            <Th>Actions</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default LineTable;
