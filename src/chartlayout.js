import React, {useState, useEffect} from "react";
import Bar from "./Bar";
import RadarChart from "./RadarChart";
import "./chartlayout.css";


const Layout2 = () => {
    return(
        <div className="layout2">
        <Bar/>
        <RadarChart/>
    </div>
    )
}

export default Layout2;