import React, { useState } from "react";
import "./sidebar.css";

export default function Sidebar() {
  const [ScrollY, setScrollY] = useState(0);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Hospital Infomation</h3>
          <ul className="sidebarList">
            <li
              className="sidebarListItem active"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setScrollY(0);
              }}
            >
              지도
            </li>
            <li
              className="sidebarListItem active"
              onClick={() => {
                window.scrollTo({
                  top: 650,
                  behavior: "smooth",
                });
                setScrollY(0);
              }}
            >
              검색하기
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Hospital Graph</h3>
          <ul className="sidebarList">
            <li
              className="sidebarListItem active"
              onClick={() => {
                window.scrollTo({
                  top: 1300,
                  behavior: "smooth",
                });
                setScrollY(0);
              }}
            >
              병상수 TOP 10위 보기
            </li>
            <li
              className="sidebarListItem active"
              onClick={() => {
                window.scrollTo({
                  top: 1800,
                  behavior: "smooth",
                });
                setScrollY(0);
              }}
            >
              TOP 5 상세비교 레이더 차트 보기
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}