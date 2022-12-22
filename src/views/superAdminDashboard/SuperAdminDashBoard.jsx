import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SuperSideBar from '../../components/superAdmin/SuperSideBar/SuperSideBar'
import SuperTopBar from '../../components/superAdmin/SuperTopBar/SuperTopBar'
import { superAdminThunk } from '../../redux/reducers/superAdminInfo'

import './SuperAdminDashBoard.css'

const SuperAdminDashBoard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(superAdminThunk())
  }, [])

  return (
    <div className="dashBoard-container">
      <div className="dashBoard-sideBar">
        <SuperSideBar />
      </div>
      <div className="dashBoard-topBar">
        <SuperTopBar />
      </div>
      <Outlet />
    </div>
  )
}

export default SuperAdminDashBoard
