import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import { seoul_gu } from "./data/seoul_municipalities_geo_simple";
import seoul_info from "./data/seoul_emer_info_.json";

const center = [37.549605, 126.988386];

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: require("./data/emerg.png"),
    iconSize: [_iconSize],
  });
}
const SeoulMap = () => {
  return (
    <MapContainer
      center={center}
      zoom={11}
      minZoom={11}
      style={{ display: "flex", flexDirection: "row" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=Qw6XogZhQmbzCfPnpqjm"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      {seoul_info.map((v, idx) => (
        <Marker position={[v.lat, v.lon]} key={idx} icon={GetIcon(30)}>
          <Popup>
            <b>
              <h3>
                <b> {v.name} </b>
              </h3>
              <b> {v.categori}</b>
              <hr />
              <br />
              {"주소 : " + v.address} <br />
              {"전화번호 : " + v.phone}
            </b>
          </Popup>
        </Marker>
      ))}

      {seoul_gu.features.map((gu) => {
        const coordinates = gu.geometry.coordinates[0].map((item) => [
          item[1] + 0.0028,
          item[0] - 0.0025,
        ]);

        return (
          <Polygon
            pathOptions={{
              fillColor: "#5587ED",
              fillOpacity: 0.4,
              weight: 1,
              opacity: 0.7,
              dashArray: 2,
              color: "blue",
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 5,
                  dashArray: 3,
                  color: "#0054FF",
                  fillColor: "pink",
                });
              },
              // 위와 동일하게 설정하여 over시 바뀌었던 걸 수정
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: "#5587ED",
                  fillOpacity: 0.4,
                  weight: 1,
                  opacity: 0.7,
                  dashArray: 2,
                  color: "blue",
                });
              },
              click: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: "red",
                  fillOpacity: 0.1,
                  opacity: 0.9,
                  weight: 10,
                  dashArray: 5,
                });
                // 클릭한 곳 포함하는 구 데이터에서 빼내기
              },
            }}
          />
        );
      })}

      {/* {seoulData.features.map (strict => (
                            <MapContainer key={strict.geometry.coordinates}
                            ) {})} */}
    </MapContainer>
  );
};

export default SeoulMap;
