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
import Button from '@material-ui/core/Button';

const corsProxy = 'https://api.codetabs.com/v1/proxy/?quest=';
const EndpointOfHealthProducts = `www.snailsmall.com/Goods/FindPage?data={"Criterion":{"GodCategoryCode":"57115bc2-bd99-4678-aff4-7ec259d14b72"},"PageIndex":0,"PageSize":50}`;
const CONST_PAGE_SIZE = 30;
const buildFetchUrl = (tabIndex, subTabIndex, pageIndex) => {
  if (tabIndex === 0) {
    return corsProxy + `https://www.snailsmall.com/Goods/FindPage?data={"Criterion":{"GodIsNew":true},"PageIndex":${pageIndex},"PageSize":${CONST_PAGE_SIZE}}`;
  }
};

export const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();

  const [rootTabValue, setRootTabValueValue] = React.useState(0);
  const [tabPageStatus, setTabPageStatus] = React.useState({index: 0, hasMore: true});
  const [listData, setListData] = useState([]);

  const handleRootTabChange = (event, newValue) => {
    setRootTabValueValue(newValue);
  };

  const loadListData = (newData) => {
    if (newData.length === 0) {
      setTabPageStatus(prevState => ({
        ...prevState,
        hasMore: false,
      }));
    }
    else {
      setListData(listData.concat(newData));
      setTabPageStatus(prevState => ({
        ...prevState,
        index: tabPageStatus.index+1,
      }));
    }
    console.log(tabPageStatus);
  };

  const fetchData = async () => {
    const result = await axios(buildFetchUrl(rootTabValue, 0, tabPageStatus.index));
    loadListData(result.data.Data.DataBody);
  };

  useEffect(() => {
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
        {listData.map((item) => <ItemCard key={item.GodId} details={item}/>)}
        {tabPageStatus.hasMore ? <Button variant="contained" color="primary" fullWidth={true} onClick={fetchData} >
          加载更多
        </Button> : null }
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
