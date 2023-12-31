import React from 'react'
import {useState,useEffect} from 'react'
import {Box,Stack,Typography} from '@mui/material'
import {Videos} from './'
import { useParams } from 'react-router-dom'
import { useGetResultQuery } from '../services/youtubeApi'
const SearchFeed = () => {
  const [videos,setVideos]=useState([]);
  const {searchTerm} =useParams();
  const {data,isFetching,error} =useGetResultQuery(searchTerm);
 console.log(data);

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
    
  }, [data,searchTerm]);

  if (isFetching) {
    return <p>Loading videos...</p>;
  }
  return (
    
    <Box p={2} sx={{overflowY:'auto', height:'90vh',flex:2}}>
      <Typography variant='h4' fontWeight="bold" mb={2} sx={{color:'white'}}>
        Search results for:  <span style={{color:'#f31503'}}>{searchTerm}</span>Videos
      </Typography>
      <Videos videos={videos}/>
    </Box>
    
  )
}

export default SearchFeed
//