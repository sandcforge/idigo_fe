import React, { useState, useEffect } from 'react';
import axios from 'axios';

import apiData from './apiData.json';
import './App.css';
import {ItemCard} from './ItemCard.js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const corsProxy = 'https://api.codetabs.com/v1/proxy/?quest=';
const EndpointOfHealthProducts = `www.snailsmall.com/Goods/FindPage?data={"Criterion":{"GodCategoryCode":"57115bc2-bd99-4678-aff4-7ec259d14b72"},"PageIndex":0,"PageSize":50}`;
const EndpointOfNewProducts = `https://www.snailsmall.com/Goods/FindPage?data={"Criterion":{"GodIsNew":true},"PageIndex":0,"PageSize":50}`;



export const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();

  const [rootTabValue, setRootTabValueValue] = React.useState(0);

  const handleRootTabChange = (event, newValue) => {
    setRootTabValueValue(newValue);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(corsProxy+EndpointOfNewProducts);
      setData(result.data.Data.DataBody);
    }; 
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={rootTabValue}
          onChange={handleRootTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="新品" {...a11yProps(0)} />
          <Tab label="分类" {...a11yProps(1)} />
          <Tab label="折扣" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={rootTabValue} index={0}>
        {data.map((item) => <ItemCard key={item.GodId} details={item}/>)}
      </TabPanel>
      <TabPanel value={rootTabValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={rootTabValue} index={2}>
        Item Three
      </TabPanel>
    </div>
  );

};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};
