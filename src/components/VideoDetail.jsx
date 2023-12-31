import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import { Typography,Box,Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
 
import {Videos} from './';
import { useGetVideoQuery,useGetRelatedQuery,useGetchannelQuery } from '../services/youtubeApi';
const VideoDetail = () => {
  const {id} =useParams();
  const {data,isFetching,error} =useGetVideoQuery(id);
  const {data:relatedVideos} =useGetRelatedQuery(id);
  const [videoDetail,setVideoDetail]=useState(null);
  const [videos,setVideos] =useState(null)

  const [channelThumbnail, setChannelThumbnail] = useState(null);
  const [channel, setChannel] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      
        if (data?.items[0]) {
          setVideoDetail(data.items[0]);
          

        }
        if (relatedVideos?.items) {
          setVideos(relatedVideos.items);
        }
        if(!videoDetail?.snippet) return <>Loading..</>
   
        const {snippet:{channelId}}=videoDetail;
        setChannel(channelId);
        
    };

    fetchData();
    
  }, [id,data,relatedVideos]);


  

  





   if(!videoDetail?.snippet) return <>Loading..</>
   
  const {snippet:{title,channelId,channelTitle},statistics:{viewCount,likeCount}}=videoDetail;

  return (
   <Box minHeight="95vh">
    <Stack direction={{xs:"column",md:"row"}}>
      <Box flex={1}>
        <Box sx={{width:'100%',position:'stick',top:'86px'}}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls/>
          <Typography color='#fff' variant="h5" fontWeight="bold" p={2}>
          <img src={channelThumbnail}/> {title}
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{color:'#fff'}} py={1} px={2}>
            <Link to={`/channel/${channelId}`}>
              <Typography variant={{sm:'subtitle1',md:'h6'}} color="#fff">
               {channelTitle}
                <CheckCircle sx={{fontSize:'12px',color:'gray', ml:'5px'}}/>
              </Typography>
            </Link>
            <Stack direction="row" gap="20px" alignItems="center">
              <Typography variant='body1' sx={{opacity:0.7}}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant='body1' sx={{opacity:0.7}}>
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Box px={2} py={{md:1,xs:5}} justifyContent="center" alignContent="center" 
    >
      <Videos videos={videos} direction="column"></Videos>
    </Box>
    </Stack>
    
   </Box>
  )
}

export default VideoDetail
