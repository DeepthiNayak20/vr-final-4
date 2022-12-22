import './EditProfile.css'

import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { profileAsyncThunk } from '../../../redux/reducers/profileSlice'

import axios from 'axios'
import { showProfileFn } from '../../../redux/showProfile'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditProfile = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileAsyncThunk())
  }, [])

  const updatedSuccessfully = () =>
    toast.success('Data Updated Successfully', {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

  const editData = useSelector((state) => state.profile.data)

  const name =
    editData &&
    editData.data &&
    editData.data.fullName &&
    editData.data.fullName

  const [fullName, setfullName] = useState(name)

  const email =
    editData && editData.data && editData.data.emailId && editData.data.emailId

  const [emailId, setEmailId] = useState(email)

  const mobileNo =
    editData &&
    editData.data &&
    editData.data.mobileNumber &&
    editData.data.mobileNumber

  const [mobile, setMobile] = useState(mobileNo)
  const [image, setImage] = useState('')
  const loadFile = (e) => {
    var image = document.getElementById('output')

    image.src = URL.createObjectURL(e.target.files[0])
    setImage(e.target.files[0])
  }

  const editProfileHandler = (e) => {
    e.preventDefault()
    const form = document.getElementById('form')
    const formData = new FormData(form)
    formData.append('fullName', fullName)
    formData.append('mobileNumber', mobile)
    image !== '' && formData.append('profilePhoto', image)

    axios
      .request(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/save`,
        {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-type': ' multipart/form-date',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          data: formData,
        },
      )
      .then((res) => {
        updatedSuccessfully()
        dispatch(profileAsyncThunk())
        dispatch(showProfileFn('profile'))
      })
      .catch((err) => {
        // alert(err.response.data)
        alert('error')
        console.log('edit error', err)
      })
  }

  //

  console.log(
    'dkjhbu',
    editData &&
      editData.data &&
      editData.data.profilePhoto &&
      editData.data.profilePhoto,
  )

  return (
    <form
      id="form"
      onSubmit={(e) => {
        editProfileHandler(e)
      }}
    >
      <div className="editProfile-container">
        <div className="editProfilr-mainText">Edit Profile</div>
        <div class="profile-pic">
          <label class="-label" for="file">
            <span class="glyphicon glyphicon-camera"></span>
            <span className="editProfile-changeImg">
              {' '}
              {/* <svg
                width={20}
                height={20}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="editProfile-svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.592 2.352L17.778.528a1.794 1.794 0 00-2.544 0l-1.738 1.747 4.069 4.088 2.027-2.037a1.399 1.399 0 000-1.974zm-7.156.986l4.069 4.088L6.206 17.775 2.14 13.687l10.296-10.35zM.571 19.986a.464.464 0 01-.56-.553l1.028-4.64 4.066 4.089-4.534 1.104z"
                  fill="#fff"
                />
              </svg> */}
              <img
                src={require('../../../assets/camera.png')}
                className="editProfile-svg"
                alt=""
              />
            </span>
          </label>

          <input
            id="file"
            type="file"
            className="editProfile-inputType"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              loadFile(e)
            }}
          />
          {editData && editData.data && editData.data.profilePhoto ? (
            <img
              src={
                editData &&
                editData.data &&
                editData.data.profilePhoto &&
                editData.data.profilePhoto
              }
              id="output"
              className="editProfile-output"
              alt="imageee"
            />
          ) : (
            <img
              src={require('../../../assets/profile.png')}
              alt="img"
              className="editProfile-output"
            />
          )}
          {/* <img
            src={
              editData &&
              editData.data &&
              editData.data.profilePhoto &&
              editData.data.profilePhoto
            }
            id="output"
            className="editProfile-output"
            alt=""
          /> */}
        </div>
      </div>

      {/* edit form */}

      <div className="editProfile-form">
        <div className="editProfile-formController">
          <div className="editProfile-body">
            <div className="profile-bodyContainer">
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setfullName(e.target.value)
                }}
                placeholder=" "
                className="login-input editProfilr-color"
              />

              <label htmlFor="fullName" className="login-lable">
                Full&nbsp;Name
              </label>
            </div>

            <div className="profile-bodyContainer">
              <input
                type="text"
                value={emailId}
                placeholder=" "
                className="login-input editProfilr-color"
              />

              <label htmlFor="emailId" className="login-lable">
                Email&nbsp;ID
              </label>
            </div>

            <div className="profile-bodyContainer">
              <input
                type="text"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
                placeholder=" "
                className="login-input editProfilr-color"
              />

              <label htmlFor="mobileNo" className="login-lable">
                Mobile&nbsp;Number
              </label>
            </div>

            <div className="changePassword-buttonContaier">
              <button type="submit" className="changePAssword-button">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EditProfile
