import { useState } from 'react'
import './TopBar.css'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import Profile from '../profileDrawer/profile/Profile'
import EditProfile from '../profileDrawer/editProfile/EditProfile'

import { useDispatch, useSelector } from 'react-redux'
import ChangePassword from '../profileDrawer/changePassword/ChangePassword'
import { showProfileFn } from '../../redux/showProfile'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { reset } from '../../redux/reducers/overViewSlice'

const TopBar = () => {
  const dispatch = useDispatch()
  // const [profileModal, setProfileModal] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const courseID = useSelector((state) => state.courseId.courseId)

  const publishHandler = () => {
    axios(
      `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/publishToWeb?courseId=${courseID}`,
      {
        method: 'put',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      },
    )
      .then((res) => {
        toast.success('Published successfully', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        })
        console.log('publish', res)
        dispatch(reset())
      })
      .catch((err) => {
        // alert(err.response.data)
        alert('Some error occured')
      })
  }

  const location = useLocation()
  console.log(
    'location topbar',
    location.pathname.split('/')[location.pathname.split('/').length - 1],
  )

  const editData = useSelector((state) => state.profile.data)

  const showProfile = useSelector((state) => state.showProfile.show)
  return (
    <div>
      <div className="topBar-Container">
        <div className="topBar-Header">
          <div className="topBar-addCourse">
            {
              {
                main: 'Dashboard',
                addCourses: 'Add Course',
                certificate: 'Add Course',
                QandA: 'Add Course',
                upload: 'Add Course',
                viewAll: 'Recently Added Course',
                studentList: 'Student List',
                settings: 'Settings',
              }[
                location.pathname.split('/')[
                  location.pathname.split('/').length - 1
                ]
              ]
            }
          </div>
          <div className="topBar-headerIcons">
            <div
              className="topBar-publish"
              onClick={() => {
                publishHandler()
              }}
            >
              <div className="topBar-publishText">Publish to web</div>
              <div className="topBar-publishIcon">
                <img
                  src={require('../../assets/icons/Web_upload.png')}
                  alt=""
                  className="toolBar-publishImg"
                />
              </div>
            </div>
            <div
              className="topBar-profile"
              onClick={() => {
                toggleDrawer()
                dispatch(showProfileFn('profile'))
              }}
              // onClick={() => {
              //   setProfileModal(false)
              // }}
            >
              <div className="topBar-profileItem">
                {editData &&
                editData.data &&
                editData.data.profilePhoto &&
                editData.data.profilePhoto ? (
                  <img
                    src={
                      editData &&
                      editData.data &&
                      editData.data.profilePhoto &&
                      editData.data.profilePhoto
                    }
                    alt=""
                    className="topBar-profileIcon"
                  />
                ) : (
                  <img
                    src={require('../../assets/profile.png')}
                    alt=""
                    className="profilee-next"
                  />
                )}
              </div>
              <div className="topBar-profileText">
                {' '}
                {editData &&
                  editData.data &&
                  editData.data.fullName &&
                  editData.data.fullName}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
      >
        <div className="topBar-drawer">
          <div className="topBar-drawerContainer">
            <div className="topBar-drawerClose">
              <img
                src={require('../../assets/close@2x.png')}
                alt=""
                className="topbar-closeImg"
                onClick={() => {
                  toggleDrawer()
                }}
              />
            </div>
            {showProfile === 'profile' ? (
              <Profile />
            ) : showProfile === 'edit' ? (
              <EditProfile />
            ) : (
              <ChangePassword />
            )}
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default TopBar
