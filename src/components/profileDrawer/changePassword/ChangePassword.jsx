import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showProfileFn } from '../../../redux/showProfile'
import './ChangePassword.css'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const notify = () =>
    toast.success('password changed successfully', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

  const passwordMismatch = () =>
    toast.warning('Password mismatch', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

  const changePasswordHandler = (e) => {
    e.preventDefault()
    const currentPass = e.target.currentPass.value
    const newPass = e.target.newPass.value
    const confirmPass = e.target.confirmPass.value
    console.log('qwerty', currentPass, newPass, confirmPass)
    if (newPass === confirmPass) {
      axios(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/changePassword`,
        {
          method: 'put',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          data: {
            oldPassword: currentPass,
            newPassword: confirmPass,
          },
        },
      )
        .then((res) => {
          console.log(res.data.message)
          if (res) {
            // alert(res.data.message)
            // alert(res.data)
            // console.log('profile edit', res)

            if ((res && res.status && res.status) === 200) {
              if (
                (res && res.data && res.data.message && res.data.message) ===
                'Password Should not be same as Old Password'
              ) {
                toast.warning('Password Should not be same as Old Password', {
                  position: 'bottom-center',
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored',
                })
              } else if (
                (res && res.data && res.data.message && res.data.message) ===
                'Incorrect Password'
              ) {
                toast.warning('Incorrect Password', {
                  position: 'bottom-center',
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored',
                })
              } else {
                toast.success('Password Changed Successfully', {
                  position: 'top-left',
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored',
                })
              }
              // navigate('/newPassword')
            }
          }
        })
        .catch((err) => {
          console.log('error', err)
          // alert(
          //   err &&
          //     err.response &&
          //     err.response.data &&
          //     err.response.data.Error &&
          //     err.response.data.Error,
          // )
        })
    } else {
      passwordMismatch()
    }
  }
  return (
    <div>
      <div className="chanePassword-mainText">Change Password</div>

      <div className="editProfile-form">
        <form
          action=""
          className="editProfile-formController"
          onSubmit={(e) => {
            changePasswordHandler(e)
          }}
        >
          <div className="editProfile-body">
            <div className="profile-bodyContainer">
              <input
                type="password"
                id="currentPass"
                name="currentPass"
                placeholder=" "
                className="login-input editProfilr-color"
                required
              />
              <label htmlFor="currentPass" className="login-lable">
                Current&nbsp;Password
              </label>
            </div>
            <div className="profile-bodyContainer">
              <input
                type="password"
                id="newPass"
                name="newPass"
                placeholder=" "
                className="login-input editProfilr-color"
                required
              />
              <label htmlFor="newPass" className="login-lable">
                New&nbsp;Password
              </label>
            </div>
            <div className="profile-bodyContainer">
              <input
                type="password"
                id="confirmPass"
                name="confirmPass"
                placeholder=" "
                className="login-input editProfilr-color"
                required
              />
              <label htmlFor="confirmPass" className="login-lable">
                Confirm&nbsp;Password
              </label>
            </div>
            <div className="changePassword-buttonContaier">
              <button
                type="submit"
                className=" changePAssword-button"
                // onClick={() => notify()}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
