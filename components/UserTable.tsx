import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import React from 'react'
import { CustomerDataServer } from '../classes/CustomerDataServer'
import User from '../classes/User'
import { deleteUser } from '../functions/userActions'
import SingleUser from './SingleUser'

interface UserTableProps{
    users:User[]
}
const UserTable:React.FC<UserTableProps> = ({users}) => {
    const userDataServer = new CustomerDataServer();
    const deleteUser = async (id:string) => {
      const data = await userDataServer.delete("user/"+id);
     
    }
  return (
    <TableContainer>
  <Table variant={'striped'} colorScheme={'purple'}>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Surname</Th>
        <Th>Email</Th>
        <Th>Phone number</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        users && users.map(
            (user:User) => <SingleUser deleteUser={()=>deleteUser(user.id)} id={user.id} name={user.name} surname={user.surname} email={user.email} phoneNumber={user.phoneNumber} />
        )
      }
    </Tbody>
    <Tfoot>
      <Tr>
      <Th>Name</Th>
        <Th>Surname</Th>
        <Th>Email</Th>
        <Th>Phone number</Th>
        <Th>Actions</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
  )
}

export default UserTable