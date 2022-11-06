import { Th, Tr , Stack, IconButton,Text} from '@chakra-ui/react'
import React from 'react'
import User from '../classes/User'
import {BsPencilSquare, BsPersonX, BsX} from 'react-icons/bs'
import { Line } from '../classes/Line'
import { Location } from '../classes/Location'
import { Station } from '../classes/Station'
import { StationDataServer } from '../classes/StationDataServer'

interface SingleLineProps extends Line{
    deleteLine:(id:string)=>void,
    updateLine:(id:string)=>void
}
const SingleLine:React.FC<SingleLineProps > = ({
    id,
    departureStationId,
    arriveStationId,
    addedOn,
    updateLine,
    deleteLine,
}) => {
    const [departureStation, setDepartureStation] = React.useState<Station>({
        id:"",label:"",locationId:""
    })
    const [arriveStation, setArriveStation] = React.useState<Station>({
        id:"",label:"",locationId:""
    })
    const stationDataServer = new StationDataServer();
    const getDepartureStation = async (id:string) => {
        const data = await stationDataServer.getSingle("station/"+id);
        setDepartureStation(data);
    }
    const getArriveStation = async (id:string) => {
        const data = await stationDataServer.getSingle("station/"+id);
        setArriveStation(data);
    }
    React.useEffect(() => {
        const abortController = new AbortController();
        getDepartureStation(departureStationId);
        getArriveStation(arriveStationId);
        console.log(departureStation)
      return () => {
        abortController.abort();
      }
    }, [departureStationId,arriveStationId])
    
  return (
    <Tr key={id}>
    <Th fontWeight={'normal'} >{id}</Th>
    <Th fontWeight={'normal'}><Text>{departureStation.label}</Text></Th>
    <Th fontWeight={'normal'}><Text>{arriveStation.label}</Text></Th>
    <Th fontWeight={'normal'}>{new Date(addedOn).toUTCString().slice(0,16)}</Th>
    <Th >
        <Stack width={'50px'} direction="row" spacing={2}>
        <IconButton
        onClick={()=>deleteLine(id)}
  colorScheme='gray'
  aria-label={`Delete`}
  icon={<BsX  />}
/>
<IconButton
        onClick={()=>updateLine(id)}
  colorScheme='gray'
  aria-label={`Update`}
  icon={<BsPencilSquare  />}
/>
        </Stack>
    </Th>
  </Tr>
  )
}

export default SingleLine
