import React, { useState } from "react";
//Lower First Floor
import KilburnLowerFirstFloor from "../../../../../pictures/map/Kilburn-FloorPlan2.png";
import KilburnLowerFirstFloorPlan from "../../../../../pictures/map/Kilburn-Building-Lower-First-Floor.jpeg";

import "./MapInfoKilburn.css";

export default function MapInfoKilburnLowerFirstFloor(props) {
  //get the coordinates of the image
  const [state, setState] = useState({ x: 0, y: 0 });
  const { x, y } = state;

  function _onMouseMove(e) {
    setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  return (
    <>
      {/* Lower First Floor */}
      {props.showFirstFloorLower && (
        <img
          alt={KilburnLowerFirstFloor}
          src={KilburnLowerFirstFloor}
          className="campusImage"
          useMap="#kilburnlowerfirstfloormap"
          onMouseMove={_onMouseMove.bind(this)}
        />
      )}
      {props.showFirstFloorLower && (
        <button
          className="buttonViewLowerFirstFloor"
          variant="primary"
          onClick={() => {
            props.setShowGroundFloor(false);
            props.setShowGroundFloorPlan(false);
            props.setShowFirstFloorLower(false);
            props.setShowLowerFirstFloorPlan(true);
            props.setShowFirstFloor(false);
            props.setShowFirstFloorPlan(false);
            props.setShowSecondFloor(false);
            props.setShowSecondFloorPlan(false);
          }}
        >
          Floor Plan
        </button>
      )}
      {props.showLowerFirstFloorPlan && <img src={KilburnLowerFirstFloorPlan} className="floorImage" />}
      {props.showLowerFirstFloorPlan && (
        <button
          className="buttonViewFloor"
          variant="primary"
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
        >
          Back
        </button>
      )}

      {/* Add The Mapping */}
      {/* Ground Floor */}
      <map name="kilburnlowerfirstfloormap">
        <area
          shape="rect"
          coords="326,531,368,550"
          alt="Kilburn Ground Floor"
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
        <area
          shape="rect"
          coords="318,503,366,528"
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
          coords="85,530,165,577"
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
      </map>
      <p className="mousePos">
        {/*{props.showFirstFloorLower && (x)} {props.showFirstFloorLower && (y)}*/}
      </p>
    </>
  );
}
