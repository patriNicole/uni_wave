import React, { useState, useEffect, useRef } from "react";
import "./MainCoursePage.css";

// Increse refresh rate
import { FixedSizeList } from "react-window";

import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../../../store/actions/teachingAction.js";

export default function TeachingCourses({ coursePosts, setCoursePosts }) {
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.teaching);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    if (courses !== undefined && coursePosts !== undefined) {
      const filteredCourses = courses.filter((course) => course !== undefined);
      const filteredPosts = coursePosts.filter((post) => post !== undefined);

      setAllCourses(filteredCourses.concat(filteredPosts));
    } else {
      setAllCourses([]);
    }
  }, [courses, coursePosts]);

  console.log(allCourses);

  useEffect(() => {
    dispatch(getCourse());
  }, []);

  return (
    <div className="courseComponent">
    <FixedSizeList
      height={400}
      width={"100%"}
      itemCount={allCourses.length}
      itemSize={140}
      className="teachingCourse"
    >
      {({ index, style }) => (
        <div className="itemCourse" style={{ ...style, overflow: "scroll", marginBottom: "10px", padding: "10px" }}>
          <div className="containerTeachingCourses">
              <div className="detailsCourse">
                <h1> {allCourses[index].teachingTitle} </h1>
                <div className="teachingCourseHeader">
                  <img
                    className="activeUser"
                    src={`${allCourses[index].senderImage}`}
                    alt="userPicture"
                  />
                  <h4> {allCourses[index].senderName}</h4>
                </div>
                <h4> {allCourses[index].senderEmail}</h4>
              </div>
              <div className="buttonCourses">
                <button className="editCourse">Edit</button>
                <button className="deleteCourse">Delete</button>
              </div>
            </div>
        </div>
      )}
    </FixedSizeList>
    </div>
  );
}
