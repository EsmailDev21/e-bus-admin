import { Th, Tr , Stack, IconButton,Text,useDisclosure, Spinner, Skeleton, Box, SkeletonCircle} from '@chakra-ui/react'
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
import { useAppSelector } from '../redux/hooks'
import { selectLine } from '../redux/linesSlice'
import { LineDataServer } from '../classes/LineDataServer'
import axios from 'axios'

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
    const [departureStation, setDepartureStation] = React.useState<Station>({
        id:"",label:"",locationId:""
    })
    const [arriveStation, setArriveStation] = React.useState<Station>({
        id:"",label:"",locationId:""
    })
    const [coords, setCoords] = React.useState([])
    const [route,setRoute] = React.useState<Location[]>([])
    const [loading,setLoading] = React.useState(true)
    const lineDataServer = new LineDataServer();
    const linesLocations = useAppSelector(selectLine);
    const stationDataServer = new StationDataServer();
    const getDepartureStation = async (id:string) => {
        const data = await stationDataServer.getSingle("station/"+id);
        setDepartureStation(data);
    }
    
    const getArriveStation = async (id:string) => {
        const data = await stationDataServer.getSingle("station/"+id);
        setArriveStation(data);
    }
    const getRoute = async (id:string) => {
      return await lineDataServer.getRoute("line/route/"+id);
      
    }
   
    React.useEffect(() => {
        const abortController = new AbortController();
        getDepartureStation(departureStationId);
        getArriveStation(arriveStationId);
        getRoute(id).then(
          res=>{

            axios.get(`https://api.geoapify.com/v1/routing?waypoints=${res[0].latitude},${res[0].longitude}|${res[1].latitude},${res[1].longitude}&mode=drive&apiKey=8caca332f2584c7d9fe6c9451d54e2d1`).then(function (response) {
            
            setCoords(response.data.features[0].geometry.coordinates)
            setLoading(false)
            console.log(coords)
        }).catch(function (error) {
            console.error(error);
        });
          }
        )
        return () => {
          abortController.abort()
        }
    }, [departureStationId,arriveStationId,id])
    
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
             { loading===true? <Spinner size='sm' color='purple.400' /> : <PathModal   coords={coords[0]} />}
             </Stack>
        
 
       
        </Stack>
      </Th>
    </Tr></>
  )
}

export default SingleLine
