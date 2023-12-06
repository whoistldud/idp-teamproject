import React, {useState, useEffect} from "react";
import "./layout.css";
import Maps from "./Maps";
import SeoulMap from "./SeoulMap";

const center = [37.549605, 126.988386]

const Layout = () => {
    return(
        <div className="layout">
        <SeoulMap/>
        <div className='App'><Maps/></div>
    </div>
    )

}

export default Layout;