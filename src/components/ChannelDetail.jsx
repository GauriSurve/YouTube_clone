import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Box, Stack, Typography } from '@mui/material';
import { Videos, ChannelCard } from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items));
  },[id])

  return (
    <Box minHeight="95vh">
      <Box>
      <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(81,81,157,1) 82%)',
          zIndex: 10,
        }}/>
        <ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
    </Box>
     <Box display="flex" p="2">
      <Box sx={{ mr: {sm: '100px' }}} />
        <Videos videos={videos}/>
     </Box>
  </Box>
  )
}

export default ChannelDetail