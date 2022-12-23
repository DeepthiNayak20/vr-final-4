import axios from 'axios'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import EnhancedTable from '../studentListComponent/StudentListComponent'
import './MainBoard.css'
import Modal from 'react-modal'
import EnhancedTabledash from '../dashboardlist/dashboardlist'

const MainBoard = () => {
  const [date, setDate] = useState(new Date())
  const [dashboardData, setDashboardData] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false)
  const [recentlist, setrecentlist] = useState([])
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    axios
      .get(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/dashBoard/header`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        setDashboardData(res.data)
      })
      .catch((err) => {
        console.log(err)
        // alert('Some error occured')
      })
  }, [])

  const today = () => {
    setDate(new Date())
  }

  useEffect(() => {
    const timerId = setInterval(today, 1000)
    return function timeChange() {
      clearInterval(timerId)
    }
  }, [])

  useEffect(() => {
    axios
      .get(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/coursesAddedWP`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        console.log('heyyyyyaaaa', res.data)
        setrecentlist(res.data)
        // alert('Some error occured')
      })
  }, [])
  // console.log('dashboardData', dashboardData)
  return (
    <div className="main-board">
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
        <div className="dashboard-recently-added">
          <div className="recent-viewall">
            <div className="recently">Recently&nbsp;course&nbsp;added</div>
            <div className="viewall">
              <NavLink to="/Dashboard/viewAll">View&nbsp;all</NavLink>
            </div>
          </div>
          {recentlist.map((res, i) => {
            // console.log('res', res)
            return (
              <div className="mainboard-recent-list">
                <div className="thumbnail-delete">
                  <div className="recent-title">
                    <div className="mainboard-thumbnail">
                      <img
                        src={res && res.coursePhoto && res.coursePhoto}
                        alt=""
                        className="thumbnail-image-mainboard"
                      />
                    </div>
                    <div className="mainboard-thumbnail-play">
                      <svg
                        width={19}
                        height={19}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.5 18a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
                          fill="#EE5C4D"
                          fillOpacity={0.7}
                          stroke="#EE5C4D"
                          strokeWidth={0.962}
                        />
                        <mask
                          id="prefix__a"
                          style={{
                            maskType: 'alpha',
                          }}
                          maskUnits="userSpaceOnUse"
                          x={7}
                          y={6}
                          width={6}
                          height={7}
                        >
                          <path
                            d="M8.534 12.286l.004-.002 3.812-2.29h.001a.783.783 0 00.356-.487.785.785 0 00-.356-.862h-.001l-3.812-2.29a.78.78 0 00-.6-.08.782.782 0 00-.584.753v4.583a.789.789 0 001.18.675z"
                            fill="#fff"
                          />
                        </mask>
                        <g mask="url(#prefix__a)">
                          <path
                            d="M8.534 12.286l.004-.002 3.812-2.29h.001a.783.783 0 00.356-.487.785.785 0 00-.356-.862h-.001l-3.812-2.29a.78.78 0 00-.6-.08.782.782 0 00-.584.753v4.583a.789.789 0 001.18.675z"
                            fill="#fff"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="recent-coursetitle">
                      {res && res.courseName && res.courseName}
                    </div>
                  </div>
                  {/* <aside className="delete-modal">
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Example Modal"
                      ariaHideApp={false}
                      className="delete-course-modal"
                      parentSelector={() => document.querySelector('#root')}
                    >
                      <div className="delete-course-modal-content">
                        <div className="deleteCourse">Delete Video</div>
                        <div className="deleteContent">
                          Are you sure you want to Delete the video
                          <strong> heyyyy</strong> from the Recently courses
                          added?
                        </div>
                        <div className="buttons">
                          <button onClick={closeModal} className="cancel">
                            Cancel
                          </button>
                          <button className="delete">Delete</button>
                        </div>
                      </div>
                    </Modal>
                  </aside> */}
                  {/* <div>
                    <button
                      className="delete-courses"
                      onClick={(event) => {
                        openModal()
                      }}
                    >
                      <svg
                        width={36}
                        height={36}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className='delete-svg'
                      >
                        <path
                          d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0 0 8.059 0 18s8.059 18 18 18z"
                          fill="#092963"
                          fillOpacity={0.1}
                        />
                        <path
                          d="M22 16v10h-8V16h8zm-1.5-6h-5l-1 1H11v2h14v-2h-3.5l-1-1zm3.5 4H12v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V14z"
                          fill="#092963"
                        />
                      </svg>
                    </button>
                  </div> */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="dashboard-blocks">
        <div className="dashboard-block1">
          <div className="dashboard-block-text">
            <div className="dashboard-block-title">Total&nbsp;Students</div>
            <div className="dashboard-block-value">
              {dashboardData &&
                dashboardData.totalStudentsEnrolled &&
                dashboardData.totalStudentsEnrolled}
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
            <div className="dashboard-block-title">Overall&nbsp;Result</div>
            <div className="dashboard-block-value">
              {/* {dashboardData &&
                dashboardData.overallResult &&
                dashboardData.overallResult}
              % */}
              {/* {console.log('dashboardData', dashboardData)} */}
              {dashboardData &&
              dashboardData.overallResult &&
              dashboardData.overallResult
                ? dashboardData &&
                  dashboardData.overallResult &&
                  dashboardData.overallResult
                : 0}
              {/* {console.log('dashhhhh', dashboardData)} */}%
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
                d="M51.09 25.784a.998.998 0 00-.721-.305h-4.195c.106-.373.234-.714.39-1.02a.998.998 0 00-.043-.98c-.185-.3-.506-.479-.858-.479h-14.95c-.353 0-.673.18-.858.479-.184.3-.2.665-.042.98.155.306.283.647.39 1.02h-4.196a1 1 0 00-.722.305 1 1 0 00-.285.733c.064 2.131.492 4.107 1.272 5.874a13.475 13.475 0 002.532 3.821c1.69 1.79 3.34 2.563 3.598 2.676.362.454.78.888 1.25 1.3a12.374 12.374 0 002.619 1.75 13.716 13.716 0 01-.796 4.352h-.67a1.866 1.866 0 00-1.864 1.864v3.295c-.574.062-1.12.24-1.6.526l-.097.058c-.956.57-1.528 1.504-1.528 2.5V55h16.945v-.466c0-.997-.571-1.931-1.528-2.5l-.097-.059a3.956 3.956 0 00-1.6-.525v-3.296a1.866 1.866 0 00-1.864-1.864h-.67a13.715 13.715 0 01-.796-4.351 12.397 12.397 0 002.619-1.75c.47-.412.888-.846 1.25-1.3.256-.114 1.908-.886 3.598-2.676a13.479 13.479 0 002.532-3.821c.78-1.767 1.207-3.743 1.271-5.874a1.003 1.003 0 00-.285-.733zM29.453 35.54c-2.227-2.375-3.411-5.421-3.52-9.052a.075.075 0 01.075-.078h4.407c.31 1.745.305 4.01.3 6.667-.002.382-.002.776-.002 1.176 0 1.02.215 2.006.64 2.94a12.374 12.374 0 01-1.9-1.653zm15.204 17.293c.512.305.867.747 1.006 1.234H30.714c.14-.487.495-.93 1.006-1.234l.098-.058a3.083 3.083 0 011.577-.419h9.586c.571 0 1.117.145 1.577.42l.098.057zm-2.152-4.68v3.271h-8.631v-3.27c0-.514.418-.932.931-.932h6.767c.514 0 .933.418.933.931zM36.46 46.29c.433-1.303.679-2.66.733-4.051a5.202 5.202 0 001.988 0c.054 1.39.3 2.748.733 4.051h-3.454zm5.67-6.82a11.327 11.327 0 01-2.656 1.735 4.24 4.24 0 01-2.574 0c-.17-.075-1.404-.64-2.635-1.717-1.74-1.524-2.622-3.284-2.622-5.233l.001-1.175c.01-3.923.017-7.021-1-9.04a.068.068 0 01.004-.071.071.071 0 01.064-.036h14.95c.028 0 .05.012.064.036a.068.068 0 01.003.07c-1.016 2.02-1.009 5.118-1 9.041.002.381.002.776.002 1.175 0 1.94-.875 3.695-2.601 5.215zm4.793-3.928a12.365 12.365 0 01-1.9 1.652c.426-.933.64-1.92.64-2.94l-.001-1.176c-.006-2.656-.011-4.922.3-6.667h4.407c.026 0 .043.013.053.023.01.01.022.029.021.056-.11 3.63-1.294 6.676-3.52 9.052z"
                fill="#092963"
              />
            </svg>
          </div>
        </div>
        <div className="dashboard-block1">
          <div className="dashboard-block-text">
            <div className="dashboard-block-title">Total&nbsp;Course</div>
            <div className="dashboard-block-value">
              {dashboardData &&
                dashboardData.totalCoursesAdded &&
                dashboardData.totalCoursesAdded}
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
      <div className="dashboard-table">
        <EnhancedTabledash />
      </div>
    </div>
  )
}

export default MainBoard
