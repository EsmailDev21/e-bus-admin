import { Th, Tr , Stack, IconButton,Text,useDisclosure} from '@chakra-ui/react'
import React from 'react'
import User from '../classes/User'
import {BsPencilSquare, BsPersonX, BsX} from 'react-icons/bs'
import { Line } from '../classes/Line'
import { Location } from '../classes/Location'
import { Station } from '../classes/Station'
import { StationDataServer } from '../classes/StationDataServer'
import { GeoLocationHandler } from '../classes/GeoLocationHandler'
import { LocationDataServer } from '../classes/LocationDataServer'
import PathModal from './PathModal'

interface SingleLineProps extends Line{
    deleteLine:(id:string)=>void,
    updateLine:(id:string)=>void
}
const SingleLine:React.FC<SingleLineProps > = ({
    id,
    label,
    departureStationId,
    arriveStationId,
    addedOn,
    updateLine,
    deleteLine,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
    const [departureStation, setDepartureStation] = React.useState<Station>({
        id:"",label:"",locationId:""
    })
    const [arriveStation, setArriveStation] = React.useState<Station>({
        id:"",label:"",locationId:""
    })
    const [depLocation, setdepLocation] = React.useState<Location>({id:"",latitude:0,longitude:0})
    const [arrLocation, setarrpLocation] = React.useState<Location>({id:"",latitude:0,longitude:0})
    const stationDataServer = new StationDataServer();
    const geoLocationHandler = new GeoLocationHandler();
    const locationDataServer = new LocationDataServer();
    const getDepartureStation = async (id:string) => {
        const data = await stationDataServer.getSingle("station/"+id);
        setDepartureStation(data);
    }
    const getDepartureStationLocation = async (id:string) => {
      const data = await locationDataServer.getSingle("location/"+id)
      setdepLocation(data);
  }
    const getArriveStation = async (id:string) => {
        const data = await stationDataServer.getSingle("station/"+id);
        setArriveStation(data);
    }
    const getArriveStationLocation = async (id:string) => {
      const data = await locationDataServer.getSingle("location/"+id);
      setarrpLocation(data);
  }
    React.useEffect(() => {
        const abortController = new AbortController();
        getDepartureStation(departureStationId);
        getArriveStation(arriveStationId);
        setTimeout(
          ()=>{
            getArriveStationLocation(arriveStation.locationId)
        getDepartureStationLocation(departureStation.locationId)
        console.log({depLocation,arrLocation})
          },2000
        )
             return () => {
        abortController.abort();
      }
    }, [arriveStationId,departureStationId])
    
  return (
  <> <Tr key={id}>
      <Th fontWeight={'normal'}>{label}</Th>
      <Th fontWeight={'normal'}><Text>{departureStation.label}</Text></Th>
      <Th fontWeight={'normal'}><Text>{arriveStation.label}</Text></Th>
      <Th fontWeight={'normal'}>{new Date(addedOn).toUTCString().slice(0, 16)}</Th>
      <Th>
        <Stack direction={"column"}>
        <Stack width={'50px'} direction="row" spacing={2}>
          <IconButton
            onClick={() => deleteLine(id)}
            colorScheme='gray'
            aria-label={`Delete`}
            icon={<BsX />} />
          <IconButton
            onClick={() => updateLine(id)}
            colorScheme='gray'
            aria-label={`Update`}
            icon={<BsPencilSquare />} />
             </Stack>
          <PathModal start={{lat:depLocation.latitude,lon:depLocation.longitude}} end={{lat:arrLocation.latitude,lon:arrLocation.longitude}} />
 
       
        </Stack>
      </Th>
    </Tr></>
  )
}

export default SingleLine
