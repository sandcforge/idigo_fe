import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const App = () => {
  const [data, setData] = useState({ hits: [] });
 
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
    <img src={'https://img.snailsmall.com/6b809b29-9932-425e-acea-09ef2d4840ba.jpg'} />
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
    </>
  );

};
