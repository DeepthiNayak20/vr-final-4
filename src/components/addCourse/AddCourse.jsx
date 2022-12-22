import './AddCourse.css';
import { NavLink, Outlet } from 'react-router-dom';

const AddCourse = () => {
  console.log('add course');
  return (
    <div className="studentList-containerAddCourse">
      <div className="addcourse-container">
        <NavLink to="upload" className="addCourse-navLink">
          Video&nbsp;Upload
        </NavLink>
        <NavLink to="QandA" className="addCourse-navLink">
          Question&nbsp;and&nbsp;Answer
        </NavLink>
        <NavLink to="certificate" className="addCourse-navLink">
          Certificate&nbsp;Template
        </NavLink>
      </div>
      <div className="addcourse-body">
        <Outlet />
      </div>
    </div>
  );
};

export default AddCourse;
