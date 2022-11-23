import React, { useState } from "react";
//Ground Floor
import KilburnGroundFloor from "./MapInfoKilburnGroundFloor.js";
//Lower First Floor
import KilburnLowerFirstFloor from "./MapInfoKilburnLowerFirstFloor.js";
//First Floor
import KilburnFirstFloor from "./MapInfoKilburnFirstFloor.js";
//Second Floor
import KilburnSecondFloor from "./MapInfoKilburnSecondFloor.js";

import "./MapInfoKilburn.css";

export default function MapInfoKilburn(props) {
  //floor plans
  //ground floor
  const [showGroundFloor, setShowGroundFloor] = useState(true);
  const [showGroundFloorPlan, setShowGroundFloorPlan] = useState(false);
  //lower first floor
  const [showFirstFloorLower, setShowFirstFloorLower] = useState(false);
  const [showLowerFirstFloorPlan, setShowLowerFirstFloorPlan] = useState(false);
  //first floor
  const [showFirstFloor, setShowFirstFloor] = useState(false);
  const [showFirstFloorPlan, setShowFirstFloorPlan] = useState(false);
  //second floor
  const [showSecondFloor, setShowSecondFloor] = useState(false);
  const [showSecondFloorPlan, setShowSecondFloorPlan] = useState(false);

  return (
    <>
      <KilburnGroundFloor
        showGroundFloor={showGroundFloor}
        setShowGroundFloor={setShowGroundFloor}
        showGroundFloorPlan={showGroundFloorPlan}
        setShowGroundFloorPlan={setShowGroundFloorPlan}
        showFirstFloorLower={showFirstFloorLower}
        setShowFirstFloorLower={setShowFirstFloorLower}
        showLowerFirstFloorPlan={showLowerFirstFloorPlan}
        setShowLowerFirstFloorPlan={setShowLowerFirstFloorPlan}
        showFirstFloor={showFirstFloor}
        setShowFirstFloor={setShowFirstFloor}
        showFirstFloorPlan={showFirstFloorPlan}
        setShowFirstFloorPlan={setShowFirstFloorPlan}
        showSecondFloor={showSecondFloor}
        setShowSecondFloor={setShowSecondFloor}
        showSecondFloorPlan={showSecondFloorPlan}
        setShowSecondFloorPlan={setShowSecondFloorPlan}
      />
      <KilburnLowerFirstFloor
        showGroundFloor={showGroundFloor}
        setShowGroundFloor={setShowGroundFloor}
        showGroundFloorPlan={showGroundFloorPlan}
        setShowGroundFloorPlan={setShowGroundFloorPlan}
        showFirstFloorLower={showFirstFloorLower}
        setShowFirstFloorLower={setShowFirstFloorLower}
        showLowerFirstFloorPlan={showLowerFirstFloorPlan}
        setShowLowerFirstFloorPlan={setShowLowerFirstFloorPlan}
        showFirstFloor={showFirstFloor}
        setShowFirstFloor={setShowFirstFloor}
        showFirstFloorPlan={showFirstFloorPlan}
        setShowFirstFloorPlan={setShowFirstFloorPlan}
        showSecondFloor={showSecondFloor}
        setShowSecondFloor={setShowSecondFloor}
        showSecondFloorPlan={showSecondFloorPlan}
        setShowSecondFloorPlan={setShowSecondFloorPlan}
      />
      <KilburnFirstFloor
        showGroundFloor={showGroundFloor}
        setShowGroundFloor={setShowGroundFloor}
        showGroundFloorPlan={showGroundFloorPlan}
        setShowGroundFloorPlan={setShowGroundFloorPlan}
        showFirstFloorLower={showFirstFloorLower}
        setShowFirstFloorLower={setShowFirstFloorLower}
        showLowerFirstFloorPlan={showLowerFirstFloorPlan}
        setShowLowerFirstFloorPlan={setShowLowerFirstFloorPlan}
        showFirstFloor={showFirstFloor}
        setShowFirstFloor={setShowFirstFloor}
        showFirstFloorPlan={showFirstFloorPlan}
        setShowFirstFloorPlan={setShowFirstFloorPlan}
        showSecondFloor={showSecondFloor}
        setShowSecondFloor={setShowSecondFloor}
        showSecondFloorPlan={showSecondFloorPlan}
        setShowSecondFloorPlan={setShowSecondFloorPlan}
      />
      <KilburnSecondFloor
        showGroundFloor={showGroundFloor}
        setShowGroundFloor={setShowGroundFloor}
        showGroundFloorPlan={showGroundFloorPlan}
        setShowGroundFloorPlan={setShowGroundFloorPlan}
        showFirstFloorLower={showFirstFloorLower}
        setShowFirstFloorLower={setShowFirstFloorLower}
        showLowerFirstFloorPlan={showLowerFirstFloorPlan}
        setShowLowerFirstFloorPlan={setShowLowerFirstFloorPlan}
        showFirstFloor={showFirstFloor}
        setShowFirstFloor={setShowFirstFloor}
        showFirstFloorPlan={showFirstFloorPlan}
        setShowFirstFloorPlan={setShowFirstFloorPlan}
        showSecondFloor={showSecondFloor}
        setShowSecondFloor={setShowSecondFloor}
        showSecondFloorPlan={showSecondFloorPlan}
        setShowSecondFloorPlan={setShowSecondFloorPlan}
      />
    </>
  );
}
