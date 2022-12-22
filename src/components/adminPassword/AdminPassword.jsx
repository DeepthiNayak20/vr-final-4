import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showProfileFn } from '../../redux/showProfile'
import './AdminPassword.css'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminPassword = () => {
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

  const samePassword = () =>
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
  const adminPasswordHandler = (e) => {
    e.preventDefault()
    const currentPass = e.target.currentPass.value
    const newPass = e.target.newPass.value
    const confirmPass = e.target.confirmPass.value
    // console.log('settings', currentPass, newPass, confirmPass)
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
          // console.log(res.data.message)
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
          // console.log('error', err)
          alert('Some error occured')
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
    <div className="studentList-container">
      <div className="admin-changePassword">Change Password</div>
      <div className="admin-form">
        <form
          action=""
          className="admin-formController"
          onSubmit={(e) => {
            adminPasswordHandler(e)
          }}
        >
          <div className="admin-formContainer">
            <div className="admin-label">
              <label className="admin-label">Change Password</label>
              <input
                type="password"
                className="admin-input"
                placeholder="Change Password"
                name="currentPass"
                required
              />
            </div>

            <div className="admin-label">
              <label className="admin-label">New Password</label>
              <input
                type="password"
                className="admin-input"
                placeholder="New Password"
                name="newPass"
                required
              />
            </div>

            <div className="admin-label">
              <label className="admin-label">Confirm Password</label>
              <input
                type="password"
                className="admin-input"
                placeholder="Confirm Password"
                name="confirmPass"
                required
              />
            </div>
          </div>

          <div className="admin-label">
            <button type="submit" className="admin-buttonSave">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminPassword
