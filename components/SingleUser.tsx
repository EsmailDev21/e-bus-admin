import { Th, Tr , Stack, IconButton} from '@chakra-ui/react'
import React from 'react'
import User from '../classes/User'
import {BsPersonX} from 'react-icons/bs'

interface SingleUserProps extends User{
    deleteUser:(id:string)=>void
}
const SingleUser:React.FC<SingleUserProps> = ({
    id,
    name,
    surname,
    email,
    phoneNumber,
    deleteUser
}:SingleUserProps) => {
  return (
    <Tr key={id}>
    <Th fontWeight={'normal'} >{name}</Th>
    <Th fontWeight={'normal'}>{surname}</Th>
    <Th fontWeight={'normal'}>{email}</Th>
    <Th fontWeight={'normal'}>{phoneNumber}</Th>
    <Th >
        <Stack width={'50px'}>
        <IconButton
        onClick={()=>deleteUser(id)}
  colorScheme='gray'
  aria-label={`Delete ${name} ${surname}`}
  icon={<BsPersonX  />}
/>
        </Stack>
    </Th>
  </Tr>
  )
}

export default SingleUser