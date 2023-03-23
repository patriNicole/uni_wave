import React from "react";
import "./MainComponent.css";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import planner from "../../../pictures/mainpage/planner.png";
import chat from "../../../pictures/mainpage/chat.png";
import setting from "../../../pictures/mainpage/setting.png";
import teaching from "../../../pictures/mainpage/teaching.png";
import map from "../../../pictures/map/Campus.png";

export default function MainComponent() {
    /* Used user info as appears (Redux) when logged in in application */
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <>
            <div className="mainComponentWelcome">
            </div>
            <div className="mainComponentPlanner">
                <Link to="/planner">
                  <img
                    src={planner}
                    alt="mainPagePicture"
                    className="mainPagePicture"
                  />
                </Link>
            </div>
            <div className="mainComponentMap">
                <Link to="/map">
                  <img
                    src={map}
                    alt="mainPagePicture"
                    className="mainPagePicture"
                  />
                </Link>
            </div>
            <div className="mainComponentGroup">
                <Link to="/groups">
                  <img
                    src={chat}
                    alt="mainPagePicture"
                    className="mainPagePicture"
                  />
                </Link>
            </div>
            <div className="mainComponentTeaching">
                <Link to="/teaching">
                  <img
                    src={teaching}
                    alt="mainPagePicture"
                    className="mainPagePicture"
                  />
                </Link>
            </div>
            <div className="mainComponentInfo">
                <Link to="/settings">
                  <img
                    src={setting}
                    alt="mainPagePicture"
                    className="mainPagePicture"
                  />
                </Link>
            </div>
        </>
    );
}