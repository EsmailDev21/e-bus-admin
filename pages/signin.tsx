import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSigninHandler } from '../functions/auth';
  

  export default function signin() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
                <form action="" onSubmit={event => useSigninHandler(event,phoneNumber,password,router)}>
            <Stack spacing={4}>
              <FormControl id="phone ">
                <FormLabel>Phone number</FormLabel>
                <Input _focus={{border:'purple.800', bg:'purple.100'}} value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} type="tel" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input _focus={{border:'purple.300', bg:'purple.100'}} value={password} onChange={e=>setPassword(e.target.value)} type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox colorScheme={'purple'}>Remember me</Checkbox>
                  <Link color={'purple.400'}>Forgot password?</Link>
                </Stack>
                <Button
                type='submit'
                  bg={'purple.400'}
                  color={'white'}
                  _hover={{
                    bg: 'purple.300',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }