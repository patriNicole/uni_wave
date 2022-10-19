import React, { useState } from "react";
//Ground Floor
import KilburnFirstFloor from "../../../../../pictures/map/Kilburn-FloorPlan3.png";
import KilburnFirstFloorPlan from "../../../../../pictures/map/Kilburn-Building-First-Floor.jpeg";

import "./MapInfoKilburn.css";

export default function MapInfoKilburnFirstFloor(props) {
  //get the coordinates of the image
  const [state, setState] = useState({ x: 0, y: 0 });
  const { x, y } = state;

  function _onMouseMove(e) {
    setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  return (
    <>
      {/* First Floor */}
      {props.showFirstFloor && (
        <img
          src={KilburnFirstFloor}
          className="campusImage"
          useMap="#kilburnfirstfloormap"
          onMouseMove={_onMouseMove.bind(this)}
        />
      )}
      {props.showFirstFloor && (
        <button
          className="buttonViewFirstFloor"
          variant="primary"
          onClick={() => {
            props.setShowGroundFloor(false);
            props.setShowGroundFloorPlan(false);
            props.setShowFirstFloorLower(false);
            props.setShowLowerFirstFloorPlan(false);
            props.setShowFirstFloor(false);
            props.setShowFirstFloorPlan(true);
            props.setShowSecondFloor(false);
            props.setShowSecondFloorPlan(false);
          }}
        >
          Floor Plan
        </button>
      )}
      {props.showFirstFloorPlan && <img src={KilburnFirstFloorPlan} className="floorImage" />}
      {props.showFirstFloorPlan && (
        <button
          className="buttonViewFloor"
          variant="primary"
          onClick={() => {
            props.setShowGroundFloor(false);
            props.setShowGroundFloorPlan(false);
            props.setShowFirstFloorLower(false);
            props.setShowLowerFirstFloorPlan(false);
            props.setShowFirstFloor(true);
            props.setShowFirstFloorPlan(false);
            props.setShowSecondFloor(false);
            props.setShowSecondFloorPlan(false);
          }}
        >
          Back
        </button>
      )}

      {/* Add The Mapping */}
      {/* First Floor */}
      <map name="kilburnfirstfloormap">
        <area
          shape="rect"
          coords="574,390,636,400"
          alt="Kilburn Lower First Floor"
          onClick={() => {
            props.setShowGroundFloor(false);
            props.setShowGroundFloorPlan(false);
            props.setShowFirstFloorLower(true);
            props.setShowLowerFirstFloorPlan(false);
            props.setShowFirstFloor(false);
            props.setShowFirstFloorPlan(false);
            props.setShowSecondFloor(false);
            props.setShowSecondFloorPlan(false);
          }}
        />
        <area
          shape="rect"
          coords="571,356,632,368"
          alt="Kilburn Second Floor"
          onClick={() => {
            props.setShowGroundFloor(false);
            props.setShowGroundFloorPlan(false);
            props.setShowFirstFloorLower(false);
            props.setShowLowerFirstFloorPlan(false);
            props.setShowFirstFloor(false);
            props.setShowFirstFloorPlan(false);
            props.setShowSecondFloor(true);
            props.setShowSecondFloorPlan(false);
          }}
        />
        <area
          shape="rect"
          coords="15,140,121,171"
          alt="Kilburn Second Floor"
          onClick={() => {
            props.setShowGroundFloor(false);
            props.setShowGroundFloorPlan(false);
            props.setShowFirstFloorLower(false);
            props.setShowLowerFirstFloorPlan(false);
            props.setShowFirstFloor(false);
            props.setShowFirstFloorPlan(false);
            props.setShowSecondFloor(true);
            props.setShowSecondFloorPlan(false);
          }}
        />
      </map>
      <p className="mousePos">
        {props.showFirstFloor && (x)} {props.showFirstFloor && (y)}
      </p>
    </>
  );
}