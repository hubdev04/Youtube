import React from 'react'
import {useState,useEffect} from 'react'
import {Box,Stack,Typography} from '@mui/material'
import {SideBar,Videos} from './'
import { useGetResultQuery } from '../services/youtubeApi'
const Feed = () => {
  const [selectedCategory,setSelectedCategory]= useState('New');
  const [videos,setVideos]=useState([]);
  const {data,isFetching,error} =useGetResultQuery(selectedCategory);
  
 // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data?.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log(selectedCategory);
  }, [data, selectedCategory]);

  if (isFetching) {
    return <p>Loading videos...</p>;
  }
  return (
    <Stack sx={{flexDirection:{sx:"column",md:"row"}}}>

      <Box sx={{height:{sx:'auto', md:'92vh'},borderRight: '1px solid #3d3d33d',px:{sx:0,md:2}}}>
        <SideBar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          
        />
        <Typography className='copyright' variant="body" sx={{mt:1.5,color:'#fff'}}>
          copyright 2023 Devansh 
        </Typography>
      </Box>
      <Box p={2} sx={{overflowY:'auto', height:'90vh',flex:2}}>
        <Typography variant='h4' fontWeight="bold" mb={2} sx={{color:'white'}}>
         {selectedCategory} <span style={{color:'#f31503'}}>videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed
//