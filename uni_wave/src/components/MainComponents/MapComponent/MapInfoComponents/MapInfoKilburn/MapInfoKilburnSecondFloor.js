import React, { useState } from "react";
//Ground Floor
import KilburnSecondFloor from "../../../../../pictures/map/Kilburn-FloorPlan4.png";
import KilburnSecondFloorPlan from "../../../../../pictures/map/Kilburn-Building-Second-Floor.jpeg";

import "./MapInfoKilburn.css";

export default function MapInfoKilburnSecondFloor(props) {
  //get the coordinates of the image
  const [state, setState] = useState({ x: 0, y: 0 });
  const { x, y } = state;

  function _onMouseMove(e) {
    setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  return (
    <>
      {/* Second Floor */}
      {props.showSecondFloor && (
        <img
          src={KilburnSecondFloor}
          className="campusImage"
          useMap="#kilburnsecondfloormap"
          onMouseMove={_onMouseMove.bind(this)}
        />
      )}
      {props.showSecondFloor && (
        <button
          className="buttonViewLowerFirstFloor"
          variant="primary"
          onClick={() => {
            props.setShowGroundFloor(false);
            props.setShowGroundFloorPlan(false);
            props.setShowFirstFloorLower(false);
            props.setShowLowerFirstFloorPlan(false);
            props.setShowFirstFloor(false);
            props.setShowFirstFloorPlan(false);
            props.setShowSecondFloor(false);
            props.setShowSecondFloorPlan(true);
          }}
        >
          Floor Plan
        </button>
      )}
      {props.showSecondFloorPlan && <img src={KilburnSecondFloorPlan} className="floorImage" />}
      {props.showSecondFloorPlan && (
        <button
          className="buttonViewFloor"
          variant="primary"
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
        >
          Back
        </button>
      )}

      {/* Add The Mapping */}
      {/* Second Floor */}
      <map name="kilburnsecondfloormap">
        <area
          shape="rect"
          coords="247,493,337,548"
          alt="Kilburn First Floor"
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
        />
        <area
          shape="rect"
          coords="171,47,224,69"
          alt="Kilburn First Floor"
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
        />
        <area
          shape="rect"
          coords="695,468,732,501"
          alt="EXIT"
          onClick={() => {
            props.setShowGroundFloor(true);
            props.setShowGroundFloorPlan(false);
            props.setShowFirstFloorLower(false);
            props.setShowLowerFirstFloorPlan(false);
            props.setShowFirstFloor(false);
            props.setShowFirstFloorPlan(false);
            props.setShowSecondFloor(false);
            props.setShowSecondFloorPlan(false);
          }}
        />
      </map>
      <p className="mousePos">
        {props.showSecondFloor && (x)} {props.showSecondFloor && (y)}
      </p>
    </>
  );
}
