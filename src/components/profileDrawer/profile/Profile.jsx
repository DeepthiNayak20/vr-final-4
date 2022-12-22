import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileAsyncThunk } from '../../../redux/reducers/profileSlice'

import { showProfileFn } from '../../../redux/showProfile'

import './Profile.css'

const Profile = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(profileAsyncThunk())
  }, [])
  const profileData = useSelector((state) => state.profile.data)

  return (
    <div>
      <div className="profile-container">
        <div className="profile-text">Profile</div>
        <div
          className="profile edit"
          onClick={() => {
            dispatch(showProfileFn('edit'))
          }}
        >
          <img
            src={require('../../../assets/Shape.png')}
            alt=""
            className="profile-editImg"
          />
        </div>
      </div>
      <div className="profile-profilePic">
        <div className="profile-img">
          {/* <img
            src={
              profileData &&
              profileData.data &&
              profileData.data.profilePhoto &&
              profileData.data.profilePhoto
            }
            alt=""
            className="profile-imgPic"
          /> */}
          {profileData &&
          profileData.data &&
          profileData.data.profilePhoto &&
          profileData.data.profilePhoto ? (
            <img
              src={
                profileData &&
                profileData.data &&
                profileData.data.profilePhoto &&
                profileData.data.profilePhoto
              }
              alt=""
              className="profile-imgPic"
            />
          ) : (
            <img
              src={require('../../../assets/profile.png')}
              alt=""
              className="profilee-next"
            />
          )}
        </div>
        <div className="profile-picText profile-capitalize">
          {profileData &&
            profileData.data &&
            profileData.data.fullName &&
            profileData.data.fullName}
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-bodyContainer">
          <div className="profile-nameContent">
            <div className="prifile-nameStart">Name</div>
            <div className="profile-NameEnd profile-capitalize">
              {profileData &&
                profileData.data &&
                profileData.data.fullName &&
                profileData.data.fullName}
            </div>
          </div>
          <div className="profile-nameContent">
            <div className="prifile-nameStart">Email&nbsp;ID</div>
            <div className="profile-NameEnd">
              {profileData &&
                profileData.data &&
                profileData.data.emailId &&
                profileData.data.emailId}
            </div>
          </div>
          <div className="profile-nameContent">
            <div className="prifile-nameStart">Mobile&nbsp;Number</div>
            <div className="profile-NameEnd">
              {profileData &&
                profileData.data &&
                profileData.data.mobileNumber &&
                profileData.data.mobileNumber}
            </div>
          </div>
          <div className="profile-nameContent">
            <div className="prifile-nameStart">Change&nbsp;Password</div>
            <div className="profile-NameEnd">
              <img
                src={require('../../../assets/DropdownArrow.png')}
                alt=""
                className="profilr-next"
                onClick={() => dispatch(showProfileFn('changePass'))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
