import React from 'react'
import {Box} from '@mui/material'
import index from './index.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import {Feed,VideoDetail,SearchFeed,ChannelDetail,Navbar} from './componenets'
const App = () => {
  return (
    <BrowserRouter>
        <Box sx={{backgroundColor:'#000'}}>
            <Navbar/>
            <Routes>
                <Route exact path='/' element={<Feed/>} ></Route>
                <Route exact path='/video/:id' element={<VideoDetail/>} ></Route>
                <Route exact path='/channel/:id' element={<ChannelDetail/>} ></Route>
                <Route exact path='/search/:searchTerm' element={<SearchFeed/>} ></Route>
            </Routes>
        </Box>
    </BrowserRouter>
  )
}

export default App
