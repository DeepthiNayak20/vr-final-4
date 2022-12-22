import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { storeEmailForgot } from '../../redux/reducers/EmailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showOtp } from '../../redux/reducers/showOtp'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter a valid email Id')
        .required('Please enter your email'),
    }),

    onSubmit: (values) => {
      // console.log('values', values.email)

      axios(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/send`,
        {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          data: { emailId: values.email },
        },
      )
        .then((res) => {
          if (res) {
            // console.log('res', res)
            if (res.status === 200) {
              // alert(res && res.data.message)
              toast.success('OTP Valid for 2 Mins', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: 'colored',
              })
              dispatch(showOtp(true))
              navigate('/otp')
              dispatch(storeEmailForgot(values.email))
            }
          }
        })
        .catch((err) => {
          console.log('Forgot password ', err)
          toast.warn('Email Id does not exist', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored',
          })
        })
    },
  })

  const submitPasswordHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <div className="otpVerifivation-container">
        <div className="otp-verification">Forgot Password</div>
        <div className="otp-verifyText">
          Please enter your Email ID. You will receive
          <br /> a code to create a new password.
        </div>
      </div>
      <form
        action=""
        className="login-loginContainer"
        onSubmit={(e) => {
          formik.handleSubmit()
          submitPasswordHandler(e)
        }}
      >
        <input
          type="email"
          id="email"
          name="email"
          placeholder=" "
          className="login-input"
          autoComplete="off"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="email" className="login-lable">
          Email Id
        </label>
        {formik.errors.email ? (
          <p className="error-msg">{formik.errors.email}</p>
        ) : null}
        <button
          type="submit"
          className="otp-verifyButton"
          // onClick={() => {
          //   navigate('/otp')
          // }}
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
