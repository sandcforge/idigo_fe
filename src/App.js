import React, { useState, useEffect } from 'react';
import axios from 'axios';

import apiData from './apiData.json';
import './App.css';
import {ItemCard} from './ItemCard.js';


export const App = () => {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    const fetchData = async () => {

      // axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
      setData(result.data);
    };
 
    fetchData();
  }, []);
 
 
  return (
    <>
      {apiData.map((item) => <ItemCard key={item.GodId} details={item}/>)}
    </>
  );

};
