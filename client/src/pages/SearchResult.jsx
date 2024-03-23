import SearchItem from '@/components/video/SearchItem';
import { addSearchItems, removeSearchItems, setSearchPageToken } from '@/store/slices/videoSlice';
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const SearchResult = () => {
  const { search } = useParams();
  const dispatch = useDispatch();
  const searchByQuery = async () => {
    dispatch(addSearchItems([]))
    // const options = {
    //   method: 'GET',
    //   url: 'https://youtube-v31.p.rapidapi.com/search',
    //   params: {
    //     q: search,
    //     part: 'snippet,id',
    //     regionCode: 'US',
    //     type: 'video',
    //     maxResults: '5',
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': '2aa9f3290bmsh892e52f642bf32ep1b2933jsn5309c1d34b86',
    //     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    //   }
    // };
    // const response = await axios.request(options);
    const response = await axios.get(`
    https://youtube.googleapis.com/youtube/v3/search?q=${search}&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`)
    dispatch(addSearchItems(response.data.items))
    dispatch(setSearchPageToken(response.data.nextPageToken));
  }

  useEffect(() => {
    searchByQuery();

    return () => {
      dispatch(removeSearchItems())
      dispatch(setSearchPageToken(""));
    };
  }, [search])

  const { searchedItems } = useSelector(state => state.video);

  return (
    <div className='md:w-[50%] xl:w-[60%] mx-auto'>
      {
        searchedItems && searchedItems.length > 0 &&
        searchedItems.map((video) => (
          <SearchItem video={video} />
        ))
      }
    </div>
  )
}

export default SearchResult