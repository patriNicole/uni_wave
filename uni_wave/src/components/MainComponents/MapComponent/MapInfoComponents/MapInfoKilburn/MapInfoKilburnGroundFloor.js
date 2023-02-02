import React, { useState } from "react";
//Ground Floor
import KilburnGroundFloor from "../../../../../pictures/map/Kilburn-FloorPlan1.png";
import KilburnGroundFloorPlan from "../../../../../pictures/map/Kilburn-building-Ground-Floor.jpeg";

import "./MapInfoKilburn.css";

export default function MapInfoKilburnGroundFloor(props) {
  //get the coordinates of the image
  const [state, setState] = useState({ x: 0, y: 0 });
  const { x, y } = state;

  function _onMouseMove(e) {
    setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  return (
    <>
      {/* Ground Floor */}
      {props.showGroundFloor && (
        <img
          alt={KilburnGroundFloor}
          src={KilburnGroundFloor}
          className="campusImage"
          useMap="#kilburngroundfloormap"
          onMouseMove={_onMouseMove.bind(this)}
        />
      )}
      {props.showGroundFloor && (
        <button
          className="buttonViewFloor"
          variant="primary"
          onClick={() => {
            props.setShowGroundFloor(false);
            props.setShowGroundFloorPlan(true);
            props.setShowFirstFloorLower(false);
            props.setShowLowerFirstFloorPlan(false);
            props.setShowFirstFloor(false);
            props.setShowFirstFloorPlan(false);
            props.setShowSecondFloor(false);
            props.setShowSecondFloorPlan(false);
          }}
        >
          Floor Plan
        </button>
      )}
      {props.showGroundFloorPlan && <img alt={KilburnGroundFloorPlan} src={KilburnGroundFloorPlan} className="floorImage" />}
      {props.showGroundFloorPlan && (
        <button
          className="buttonViewFloor"
          variant="primary"
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
        >
          Back
        </button>
      )}

      {/* Add The Mapping */}
      {/* Ground Floor */}
      <map name="kilburngroundfloormap">
        <area
          shape="rect"
          coords="255,601,413,588"
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
          coords="11,6,150,35"
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
      </map>
      <p className="mousePos">
        {props.showGroundFloor && (x)} {props.showGroundFloor && (y)}
      </p>
    </>
  );
}
