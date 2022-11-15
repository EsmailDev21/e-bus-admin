import React from 'react'
import Layout from '../../components/Layout'
import UserTable from '../../components/UserTable'
import axios from 'axios'
import { APIURL } from '../../APIURL'
import User from '../../classes/User'
import { CustomerDataServer } from '../../classes/CustomerDataServer'
import { Line } from '../../classes/Line'
import LineTable from '../../components/LineTable'
import { LineDataServer } from '../../classes/LineDataServer'
import AddLine from '../../components/AddLine'
import { Stack, Divider, Spinner, Center } from '@chakra-ui/react'
import { useAppDispatch } from '../../redux/hooks'
import { LineState, setLine } from '../../redux/linesSlice'
import { StationDataServer } from '../../classes/StationDataServer'
import { LocationDataServer } from '../../classes/LocationDataServer'
import Search from '../../components/Search'
const lines = () => {
   const [lines, setLines] = React.useState<Line[]>([])
    const lineDataServer = new LineDataServer(); 
    const [query,setQuery] = React.useState("");
    const [loading,setLoading] = React.useState(true)
    const searchHandler = (lines:Line[],event:React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
       setLines(lines.filter(line=> line.label.includes(query)))
      
      // if(query.length===0) getData();
    }
    const getData = async () => {
        const data : Line[] = await lineDataServer.get("line");
        console.log(data)
        setLines(data);
        setLoading(false)
        
      };
    React.useEffect(() => {
      const abortController = new AbortController()
      if(query.length===0) 
        getData();
        
     
    }, [query])

  return (
    <Layout>
     
        <Stack direction={"column"} spacing={5}>
          <Stack width={{md:"50%", base:"full"}} direction={"row"}>
          <AddLine lines={lines} setLines={setLines}  />
        <Search value={query} onChange={(event)=>searchHandler(lines,event)} onClick={()=>console.log("clicked")} />
       
          </Stack>
         <Divider />
        {loading ? <Center> <Spinner color='purple.300'  /></Center> : <LineTable setLines={setLines} lines={lines}  />}
        </Stack>
    </Layout>
  )

}





export default lines

