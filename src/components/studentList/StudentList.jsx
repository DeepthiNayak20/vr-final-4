import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { studentListThunk } from '../../redux/reducers/studentlistSlice'
import EnhancedTable from '../studentListComponent/StudentListComponent'

import './StudentList.css'

const StudentList = () => {

  return (
    <div className="studentList-container">
      <div className="studentlist-table-container">
        <EnhancedTable />
      </div>
      {/* <StudentListComponent /> */}
    </div>
  )
}

export default StudentList
