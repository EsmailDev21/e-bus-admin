import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { BsSearch } from 'react-icons/bs';


interface SearchProps{
    value:string;
    onChange : React.ChangeEventHandler<HTMLInputElement>
    onClick : React.MouseEventHandler<HTMLButtonElement>
}
const Search:React.FC<SearchProps> = ({onChange,value, onClick}) => {
  return (
    <InputGroup size='md'>
      <Input
      onChange={onChange}
      value={value}
        pr='4.5rem'
        type={'text'}
        placeholder='Search ...'
        variant={"filled"}
        focusBorderColor="purple.300"
        borderRadius={99999}
      />
      <InputRightElement width='4.5rem'>
        <IconButton bg={'transparent'} borderRadius={99999} icon={<BsSearch color='#718096' />} onClick={onClick} aria-label={'search'} /> 
      </InputRightElement>
    </InputGroup>
  )
}

export default Search