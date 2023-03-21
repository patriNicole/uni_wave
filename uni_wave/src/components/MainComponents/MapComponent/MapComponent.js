import React, { useState } from "react";
import "./MapComponent.css";
import CampusMap from "../../../pictures/map/Campus.png";
//map info components
import MapInfoEngineering from "./MapInfoComponents/MapInfoEngineering.js";
import MapInfoKilburn from "./MapInfoComponents/MapInfoKilburn/MapInfoKilburn.js";
import MapInfoAliG from "./MapInfoComponents/MapInfoAliG.js";
import MapInfoLibrary from "./MapInfoComponents/MapInfoLibrary.js";
import MapInfoStudentUnion from "./MapInfoComponents/MapInfoStudentUnion.js";
import MapInfoUniversityPlace from "./MapInfoComponents/MapInfoUniversityPlace.js";
import MapInfoMainBuilding from "./MapInfoComponents/MapInfoMainBuilding.js";
import MapInfoSports from "./MapInfoComponents/MapInfoSports.js";

export default function MapComponent(props) {

  //get the coordinates of the image
  const [state, setState] = useState({ x: 0, y: 0 });
  const { x, y } = state;
  
  function _onMouseMove(e) {
    setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  //info pages components' states for map
  const [showEngineering, setShowEngineering] = useState(false);
  const [showKilburn, setShowKilburn] = useState(false);
  const [showAliG, setShowAliG] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showStudentUnion, setShowStudentUnion] = useState(false);
  const [showUniversityPlace, setShowUniversityPlace] = useState(false);
  const [showMainBuilding, setShowMainBuilding] = useState(false);
  const [showSports, setShowSports] = useState(false);

  return (
    <>
      <div className="mapComponent">
        <div className="map">
        <img src={CampusMap} alt="CampusMap" className="campusImage" useMap="#campusmap" onMouseMove={_onMouseMove.bind(this)}/>
          <map name="campusmap">
            <area shape="rect" coords="76,19,216,91" alt="Engineering Building" 
            onClick={() => {
              setShowEngineering(true);
              setShowKilburn(false);
              setShowLibrary(false);
              setShowAliG(false);
              setShowStudentUnion(false);
              setShowUniversityPlace(false);
              setShowMainBuilding(false);
              setShowSports(false);
            }}/> 
            <area shape="rect" coords="43,211,222,345" alt="Kilburn" 
            onClick={() => {
              setShowKilburn(true);
              setShowEngineering(false);
              setShowLibrary(false);
              setShowAliG(false);
              setShowStudentUnion(false);
              setShowUniversityPlace(false);
              setShowMainBuilding(false);
              setShowSports(false);
            }}/>
            <area shape="rect" coords="462,583,534,633" alt="Alan Gilbert Learning Commons" 
            onClick={() => {
              setShowAliG(true);
              setShowKilburn(false);
              setShowEngineering(false);
              setShowLibrary(false);
              setShowStudentUnion(false);
              setShowUniversityPlace(false);
              setShowMainBuilding(false);
              setShowSports(false);
            }}/>
            <area shape="rect" coords="300,643,510,769" alt="Main Library" 
            onClick={() => {
              setShowAliG(false);
              setShowKilburn(false);
              setShowEngineering(false);
              setShowLibrary(true);
              setShowStudentUnion(false);
              setShowUniversityPlace(false);
              setShowMainBuilding(false);
              setShowSports(false);
            }}/>
            <area shape="rect" coords="537,623,624,704" alt="Student Union" 
            onClick={() => {
              setShowEngineering(false);
              setShowKilburn(false);
              setShowLibrary(false);
              setShowAliG(false);
              setShowStudentUnion(true);
              setShowUniversityPlace(false);
              setShowMainBuilding(false);
              setShowSports(false);
            }}/> 
            <area shape="rect" coords="222,327,288,407" alt="University Place" 
            onClick={() => {
              setShowEngineering(false);
              setShowKilburn(false);
              setShowLibrary(false);
              setShowAliG(false);
              setShowStudentUnion(false);
              setShowUniversityPlace(true);
              setShowMainBuilding(false);
              setShowSports(false);
            }}/> 
            <area shape="rect" coords="108,385,459,516" alt="University Main Bulding" 
            onClick={() => {
              setShowEngineering(false);
              setShowKilburn(false);
              setShowLibrary(false);
              setShowAliG(false);
              setShowStudentUnion(false);
              setShowUniversityPlace(false);
              setShowMainBuilding(true);
              setShowSports(false);
            }}/> 
            <area shape="rect" coords="10,7,75,30" alt="Sports" 
            onClick={() => {
              setShowEngineering(false);
              setShowKilburn(false);
              setShowLibrary(false);
              setShowAliG(false);
              setShowStudentUnion(false);
              setShowUniversityPlace(false);
              setShowMainBuilding(false);
              setShowSports(true);
            }}/> 
          </map>
        </div>
        <div className="mapInfo">
          {showEngineering && <MapInfoEngineering pageColor={props.pageColor} setPageColor={props.setPageColor}/>}
          {showKilburn && <MapInfoKilburn pageColor={props.pageColor} setPageColor={props.setPageColor}/>}
          {showAliG && <MapInfoAliG pageColor={props.pageColor} setPageColor={props.setPageColor}/>}
          {showLibrary && <MapInfoLibrary pageColor={props.pageColor} setPageColor={props.setPageColor}/>}
          {showStudentUnion && <MapInfoStudentUnion pageColor={props.pageColor} setPageColor={props.setPageColor}/>}
          {showUniversityPlace && <MapInfoUniversityPlace pageColor={props.pageColor} setPageColor={props.setPageColor}/>}
          {showMainBuilding && <MapInfoMainBuilding pageColor={props.pageColor} setPageColor={props.setPageColor}/>}
          {showSports && <MapInfoSports pageColor={props.pageColor} setPageColor={props.setPageColor}/>}
        </div>
        {/* Show space coordinates image */}
        <p className="mousePos">
          {/*{x} {y}*/}
        </p>
      </div>
    </>
  );
}
