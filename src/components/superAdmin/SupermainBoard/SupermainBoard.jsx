import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import './SupermainBoard.css'
import React from 'react'
import { useSelector } from 'react-redux'

const SupermainBoard = () => {
  const [date, setDate] = useState(new Date())
  const mainBoarddata = useSelector((state) => state.superAdmin.data)
  // console.log('mainBoard', mainBoarddata)
  const today = () => {
    setDate(new Date())
  }

  useEffect(() => {
    console.log('mainBoarddata', mainBoarddata)
  }, [mainBoarddata])

  useEffect(() => {
    const timerId = setInterval(today, 1000)
    return function timeChange() {
      clearInterval(timerId)
    }
  }, [])

  const adminData = [
    {
      id: 1,
      name: 'swwww',
      email: 'sfds@gmail.com',
      mobile: '3456746564',
    },
    {
      id: 2,
      name: 'bbbbb',
      email: 'sfds@gmail.com',
      mobile: '3456746564',
    },
    {
      id: 3,
      name: 'cccccc',
      email: 'sfds@gmail.com',
      mobile: '3456746564',
    },
  ]

  return (
    <div className="Supermain-board">
      <div className="date-recentcourse">
        <div className="dashboard-date">
          <div className="today">Today</div>

          <div className="date">
            <span>
              {' '}
              {date.toLocaleString('en-us', {
                weekday: 'short',
              })}
              &nbsp;{date.getDate()}, {date.getFullYear()}
              &nbsp;|&nbsp;
              {date.toLocaleString('en-US', {
                hour: 'numeric',

                minute: 'numeric',

                hour12: true,
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard-blocks">
        <div className="dashboard-block1">
          <div className="dashboard-block-text">
            <div className="dashboard-block-title">Total&nbsp;Admins</div>
            <div className="dashboard-block-value">
              {mainBoarddata &&
                mainBoarddata.data &&
                mainBoarddata.data.totalCourses &&
                mainBoarddata.data.totalCourses}
            </div>
          </div>
          <div className="dashboard-block-img">
            <svg
              width={83}
              height={77}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={83}
                height={77}
                rx={38}
                fill="#092963"
                fillOpacity={0.1}
              />
              <path
                d="M48.806 40.32H35.385c-3.08 0-5.526 2.27-5.526 5.127V60.02c0 .44.315.733.79.733h22.815c.474 0 .79-.293.79-.733V45.446c.079-2.856-2.448-5.126-5.448-5.126zm3.948 18.97H31.438V45.446c0-2.051 1.737-3.662 3.947-3.662h13.343c2.21 0 3.947 1.61 3.947 3.662v13.842h.079zM55.517 22.742l-13.106-5.86a1.18 1.18 0 00-.71 0l-13.105 5.86c-.237.147-.474.367-.474.66 0 .292.158.512.474.658l4.579 2.051c-.395 1.026-.632 2.05-.632 3.15 0 4.833 4.263 8.788 9.474 8.788 5.21 0 9.473-3.955 9.473-8.789 0-1.098-.237-2.123-.632-3.149l1.895-.879v6.226c0 .44.316.733.79.733.474 0 .79-.293.79-.733v-6.885l1.105-.513c.237-.146.474-.366.474-.659 0-.292-.08-.512-.395-.659zM42.096 36.658c-4.342 0-7.895-3.296-7.895-7.324 0-.879.158-1.684.474-2.49l7.105 3.149c.078.073.236.073.315.073.079 0 .237 0 .316-.073l7.105-3.15c.315.807.474 1.685.474 2.491 0 4.028-3.552 7.324-7.894 7.324zm11.29-13.183s-.08 0-.08.073l-11.21 4.98-11.29-5.127 11.29-5.053 11.29 5.127z"
                fill="#092963"
              />
            </svg>
          </div>
        </div>

        <div className="dashboard-block1">
          <div className="dashboard-block-text">
            <div className="dashboard-block-title">Total&nbsp;Course</div>
            <div className="dashboard-block-value">
              {mainBoarddata &&
                mainBoarddata.data &&
                mainBoarddata.data.totalNumberOfAdmins &&
                mainBoarddata.data.totalNumberOfAdmins}
            </div>
          </div>
          <div className="dashboard-block-img">
            <svg
              width={77}
              height={77}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width={77}
                height={77}
                rx={38}
                fill="#092963"
                fillOpacity={0.1}
              />
              <path
                d="M54.133 26.555H23.868a.582.582 0 00-.582.582V48.09c0 .322.26.582.582.582h30.265c.322 0 .582-.26.582-.582V27.137a.582.582 0 00-.582-.582zm-.582 20.953H24.45V27.719h29.1v19.789zM47.149 49.835H32.016a.582.582 0 100 1.164H47.15a.581.581 0 100-1.164z"
                fill="#092963"
              />
              <path
                d="M35.202 41.601a.582.582 0 00.566.026l6.984-3.492a.583.583 0 000-1.042L35.768 33.6a.583.583 0 00-.842.52v6.985c0 .202.105.389.276.495zm.888-6.538l5.1 2.55-5.1 2.551v-5.1z"
                fill="#092963"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="tableContainer">
        {' '}
        <table className="tableItem">
          <tr className="tableTr">
            <th></th>
            <th>Name</th>
            <th>Email&nbsp;Id</th>
            <th>Mobile&nbsp;No</th>
          </tr>
          {adminData.map((item, i) => {
            // console.log('item', item)
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default SupermainBoard
