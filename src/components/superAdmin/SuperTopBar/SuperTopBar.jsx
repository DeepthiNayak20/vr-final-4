import { useState } from 'react'
import './SuperTopBar.css'

import 'react-modern-drawer/dist/index.css'

import { useDispatch, useSelector } from 'react-redux'

import React from 'react'

const SuperTopBar = () => {
  const dispatch = useDispatch()
  // const [profileModal, setProfileModal] = useState(true)

  return (
    <div>
      <div className="topBar-Container">
        <div className="SupertopBar-imageContainer">
          <img
            src={require('../../../assets/VL logo.png')}
            alt=""
            className="sideBarImg"
          />
        </div>
        <div className="supertopBar-Header">
          <div className="topBar-addCourse">
            Super&nbsp;Admin&nbsp;Dashboard
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperTopBar
