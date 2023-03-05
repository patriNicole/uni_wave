import React, { useState, useEffect, useRef } from "react";
import "./TeachingCourses.css";

import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../../../store/actions/teachingAction.js";

export default function TeachingCourses({ coursePosts }) {

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

  console.log(allCourses)

  useEffect(() => {
    dispatch(getCourse());
  }, []);

  return (
    <div className="teachingCourse">
      {allCourses && allCourses.length > 0
          ? allCourses.map((course, index) => (
            <div key={index}>
      <div className="containerTeachingCourses">
        
        <div className="itemCourse">
          <div className="detailsCourse">
            <h1> {course.teachingTitle} </h1>
            <div className="teachingCourseHeader">
              <img className="activeUser" src={`${course.senderImage}`} alt="userPicture"/>
              <h4> {course.senderName}</h4>
            </div>
            <h4> {course.senderEmail}</h4>
          </div>
        </div>
        </div>
        </div>
      ))
      : null}
    </div>
  );
}
