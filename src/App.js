import './App.css';
import React, {useState, useEffect, useCallback, useMemo, Component,useRef} from 'react';
import Chart from './Chart';
import Layout from './maplayout';
import './layout.css';

import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import './featuredInfo.css';
import Bar from './Bar';
import RadarChart from './RadarChart';


function App() {
  return (
    <div className="App">
    <Topbar/>
    <div className="container">
         <Sidebar/>
         <div className='others'>
         <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Map</span>
            <div className="featuredMapContainer">
            <Layout/>
            </div>
        </div>
        </div>
<div><br/><br/></div>
        <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle"></span>
            <div style ={{ height: "650px", alignItems: "center", marginTop: "1%" }} className="featuredMapContainer">
            <div style={{ position: "relative", width: "60vw", height: "600px",
            marginLeft: "6%", alignItems: "center"}}><Chart/></div>            
            </div>
        </div>
        </div>
           <div><br/><br/></div>


           <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle"></span>
            <div className="featuredMapContainer">
            <div style={{ position: "relative", width: "50vw", height: "500px",
             marginLeft: "10%", alignItems: "center", overflow: "auto"}}>
  <div>
   
  </div>
         <div className='barchart' style ={{ marginTop: "1%"}}><Bar/> </div>
            </div>  
            </div>
        </div>
        </div>
        <div><br/><br/></div>
         
        <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle"></span>
            <div  className="featuredMapContainer">
            <div><RadarChart/></div>  
            </div>
            <div style = {{ height: "500px"}}></div>
        </div>
        </div>
        </div>


</div>      
   </div>
   
  )
  }


export default App;