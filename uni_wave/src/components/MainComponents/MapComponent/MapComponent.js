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

import { FiMapPin } from "react-icons/fi";
import { BiTrain } from "react-icons/bi";
import { FaBusAlt } from "react-icons/fa";
import { GiHouseKeys, GiMushroomHouse } from "react-icons/gi";
import { MdOutlineHouse, MdOutlineSportsHandball } from "react-icons/md"; 
import { FaUniversity } from "react-icons/fa";
import Campus from "./MapInfoPDF/Campus.pdf";

export default function MapComponent(props) {
  const style = { color: "white", fontSize: "1.5em" };

  //get the coordinates of the image
  const [state, setState] = useState({ x: 0, y: 0 });
  const { x, y } = state;

  function _onMouseMove(e) {
    setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  const [showMainMap, setShowMainMap] = useState(true);

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
        <button
          className="buttonMoreAboutCampus"
          variant="primary"
          onClick={() => {
            setShowMainMap(!showMainMap);
          }}
        >
          More
        </button>
        {showMainMap && (
          <div className="map">
            <img
              src={CampusMap}
              alt="CampusMap"
              className="campusImage"
              useMap="#campusmap"
              onMouseMove={_onMouseMove.bind(this)}
            />
            <map name="campusmap">
              <area
                shape="rect"
                coords="76,19,216,91"
                alt="Engineering Building"
                onClick={() => {
                  setShowEngineering(true);
                  setShowKilburn(false);
                  setShowLibrary(false);
                  setShowAliG(false);
                  setShowStudentUnion(false);
                  setShowUniversityPlace(false);
                  setShowMainBuilding(false);
                  setShowSports(false);
                }}
              />
              <area
                shape="rect"
                coords="43,211,222,345"
                alt="Kilburn"
                onClick={() => {
                  setShowKilburn(true);
                  setShowEngineering(false);
                  setShowLibrary(false);
                  setShowAliG(false);
                  setShowStudentUnion(false);
                  setShowUniversityPlace(false);
                  setShowMainBuilding(false);
                  setShowSports(false);
                }}
              />
              <area
                shape="rect"
                coords="462,583,534,633"
                alt="Alan Gilbert Learning Commons"
                onClick={() => {
                  setShowAliG(true);
                  setShowKilburn(false);
                  setShowEngineering(false);
                  setShowLibrary(false);
                  setShowStudentUnion(false);
                  setShowUniversityPlace(false);
                  setShowMainBuilding(false);
                  setShowSports(false);
                }}
              />
              <area
                shape="rect"
                coords="300,643,510,769"
                alt="Main Library"
                onClick={() => {
                  setShowAliG(false);
                  setShowKilburn(false);
                  setShowEngineering(false);
                  setShowLibrary(true);
                  setShowStudentUnion(false);
                  setShowUniversityPlace(false);
                  setShowMainBuilding(false);
                  setShowSports(false);
                }}
              />
              <area
                shape="rect"
                coords="537,623,624,704"
                alt="Student Union"
                onClick={() => {
                  setShowEngineering(false);
                  setShowKilburn(false);
                  setShowLibrary(false);
                  setShowAliG(false);
                  setShowStudentUnion(true);
                  setShowUniversityPlace(false);
                  setShowMainBuilding(false);
                  setShowSports(false);
                }}
              />
              <area
                shape="rect"
                coords="222,327,288,407"
                alt="University Place"
                onClick={() => {
                  setShowEngineering(false);
                  setShowKilburn(false);
                  setShowLibrary(false);
                  setShowAliG(false);
                  setShowStudentUnion(false);
                  setShowUniversityPlace(true);
                  setShowMainBuilding(false);
                  setShowSports(false);
                }}
              />
              <area
                shape="rect"
                coords="108,385,459,516"
                alt="University Main Bulding"
                onClick={() => {
                  setShowEngineering(false);
                  setShowKilburn(false);
                  setShowLibrary(false);
                  setShowAliG(false);
                  setShowStudentUnion(false);
                  setShowUniversityPlace(false);
                  setShowMainBuilding(true);
                  setShowSports(false);
                }}
              />
              <area
                shape="rect"
                coords="10,7,75,30"
                alt="Sports"
                onClick={() => {
                  setShowEngineering(false);
                  setShowKilburn(false);
                  setShowLibrary(false);
                  setShowAliG(false);
                  setShowStudentUnion(false);
                  setShowUniversityPlace(false);
                  setShowMainBuilding(false);
                  setShowSports(true);
                }}
              />
            </map>
          </div>
        )}
        {!showMainMap && (
          <div className="map-more">
            <p className="infoMapMoreTitle">
              ------------------------------------
            </p>
            <p className="infoMapTitle">
              Interactive Map
              <a
                className="mapInteractiveLink"
                href="https://www.manchester.ac.uk/discover/maps/interactive-map/"
                target="_blank"
              >
                <FiMapPin size={20} style={style} />
              </a>
            </p>
            <p className="infoMapMoreTitle">
              ------------------------------------
            </p>
            <p className="infoMapTitle">
              Bus, Tram or Coach
              <a
                className="mapInteractiveLink"
                href="https://www.manchester.ac.uk/discover/maps/travel-by-bus-coach/"
                target="_blank"
              >
                <FaBusAlt size={20} style={style} />
              </a>
            </p>
            <p className="infoMapMoreTitle">
              ------------------------------------
            </p>
            <p className="infoMapTitle">
              Train
              <a
                className="mapInteractiveLink"
                href="https://www.mytrainpal.com/"
                target="_blank"
              >
                <BiTrain size={20} style={style} />
              </a>
            </p>
            <p className="infoMapMoreTitle">
              ------------------------------------
            </p>
            <p className="infoMapTitle">Student Life</p>
            <p className="infoMapTitle">
              ------------
            </p>
            <p className="infoMapMoreTitle">
              Students' Union 
              <a
                className="mapInteractiveLink"
                href="https://manchesterstudentsunion.com/"
                target="_blank"
              >
                <FaUniversity size={20} style={style} />
              </a>
            </p> 
            <p className="infoMapMoreTitle">
              Student Clubs 
              <a
                className="mapInteractiveLink"
                href="https://manchesterstudentsunion.com/activities"
                target="_blank"
              >
                <MdOutlineSportsHandball size={20} style={style} />
              </a>
            </p>
            <p className="infoMapMoreTitle">
              ------------------------------------
            </p>
            <p className="infoMapMoreTitle">Campus and Accommodation Map </p>
            <iframe
              src={Campus}
              height="83%"
              width="90%"
              className="iframeBuildings"
            ></iframe>
            <p className="infoMapMoreTitle">
              ------------------------------------
            </p>
            <p className="infoMapMoreTitle">Private Student Accommodations</p>
            <p className="infoMapMoreTitle">
              Sanctuary Students
              <a
                className="mapInteractiveLink"
                href="https://www.sanctuary-students.com/student-accommodation/manchester/grafton-street"
                target="_blank"
              >
                <GiHouseKeys size={20} style={style} />
              </a>
            </p>
            <p className="infoMapMoreTitle">
              Unite Students
              <a
                className="mapInteractiveLink"
                href="https://www.unitestudents.com/manchester?gclid=CjwKCAjwq-WgBhBMEiwAzKSH6B_OvxKfkdlQuNcKbgZRbnh3akuKs8Qz6VJgqjTiUdn4wV5q0dyHuRoC1fQQAvD_BwE"
                target="_blank"
              >
                <GiMushroomHouse size={20} style={style} />
              </a>
            </p>
            <p className="infoMapMoreTitle">
              IQ Student Accommodation
              <a
                className="mapInteractiveLink"
                href="https://www.iqstudentaccommodation.com/manchester?year=2023-24&sorting=availability"
                target="_blank"
              >
                <MdOutlineHouse size={20} style={style} />
              </a>
            </p>
          </div>
        )}

        <div className="mapInfo">
          {showEngineering && (
            <MapInfoEngineering
              pageColor={props.pageColor}
              setPageColor={props.setPageColor}
            />
          )}
          {showKilburn && (
            <MapInfoKilburn
              pageColor={props.pageColor}
              setPageColor={props.setPageColor}
            />
          )}
          {showAliG && (
            <MapInfoAliG
              pageColor={props.pageColor}
              setPageColor={props.setPageColor}
            />
          )}
          {showLibrary && (
            <MapInfoLibrary
              pageColor={props.pageColor}
              setPageColor={props.setPageColor}
            />
          )}
          {showStudentUnion && (
            <MapInfoStudentUnion
              pageColor={props.pageColor}
              setPageColor={props.setPageColor}
            />
          )}
          {showUniversityPlace && (
            <MapInfoUniversityPlace
              pageColor={props.pageColor}
              setPageColor={props.setPageColor}
            />
          )}
          {showMainBuilding && (
            <MapInfoMainBuilding
              pageColor={props.pageColor}
              setPageColor={props.setPageColor}
            />
          )}
          {showSports && (
            <MapInfoSports
              pageColor={props.pageColor}
              setPageColor={props.setPageColor}
            />
          )}
        </div>
        {/* Show space coordinates image */}
        <p className="mousePos">{/*{x} {y}*/}</p>
      </div>
    </>
  );
}
