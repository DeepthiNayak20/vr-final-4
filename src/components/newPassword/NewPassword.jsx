import axios from 'axios'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { showOtp } from '../../redux/reducers/showOtp'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const NewPassword = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showOtp(false))
  }, [])

  const navigate = useNavigate()
  const EmailIdEntered = useSelector((state) => state.emailSend.emailId)
  const formik = useFormik({
    initialValues: {
      Npassword: '',
      Cpassword: '',
    },

    validationSchema: Yup.object({
      Npassword: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .required('Please enter your password'),
      Cpassword: Yup.string()
        .oneOf([Yup.ref('Npassword'), null], 'Password must match')
        .required('Required*'),
    }),

    onSubmit: (values) => {
      console.log('new password', values)
      axios(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/resetPassword`,
        {
          method: 'put',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          data: {
            emailId: EmailIdEntered,
            password: values.Npassword,
          },
        },
      )
        .then((res) => {
          toast.success(res && res.data && res.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored',
          })
          if (res) {
            // alert('password')
            if (res.status === 200) {
              // alert(res && res.data && res.data.message)
              navigate('/')
            }
          }
        })
        .catch((err) => {
          // alert(err.response.data)
          alert('error')
        })
    },
  })
  const newPAsswordSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <div className="otpVerifivation-container">
        <div className="otp-verification">Create New Password</div>
        <div className="otp-verifyText">
          Your password must have at least
          <br /> 6 or more characters
        </div>
      </div>

      <form
        action=""
        className="login-loginContainer"
        onSubmit={(e) => {
          formik.handleSubmit()
          newPAsswordSubmit(e)
        }}
      >
        <input
          type="password"
          id="Npassword"
          name="Npassword"
          autoComplete="off"
          value={formik.values.Npassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder=" "
          className="login-input"
        />
        <label className="login-lable">New Password</label>
        {formik.errors.Npassword ? (
          <p className="error-msg">{formik.errors.Npassword}</p>
        ) : null}
        <input
          type="password"
          id="Cpassword"
          name="Cpassword"
          autoComplete="off"
          value={formik.values.Cpassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder=" "
          className="login-input"
        />
        <label className="login-lable">Confirm Password</label>
        {formik.errors.Cpassword ? (
          <p className="error-msg">{formik.errors.Cpassword}</p>
        ) : null}
        <button type="submit" className="otp-verifyButton">
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default NewPassword
