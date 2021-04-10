import React, { useState, useEffect } from 'react';
import axios from 'axios';

import apiData from './apiData.json';
import './App.css';
import {ItemCard} from './ItemCard.js';

const corsProxy = 'https://api.codetabs.com/v1/proxy/?quest=';
const EndpointOfHealthProducts = `www.snailsmall.com/Goods/FindPage?data={"Criterion":{"GodCategoryCode":"57115bc2-bd99-4678-aff4-7ec259d14b72"},"PageIndex":0,"PageSize":50}`
export const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(corsProxy+EndpointOfHealthProducts);
      setData(result.data.Data.DataBody);
    };
 
    fetchData();
  }, []);
 
 
  return (
    <>
      {data.map((item) => <ItemCard key={item.GodId} details={item}/>)}
    </>
  );

};
