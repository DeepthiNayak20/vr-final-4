// {
//   "userName"  :   "akjeelan22@gmail.com",
//   "password"  :   "Jeelan@123"
// }

// {
//   "userName"  :   "jeelan.eee.rymec@gmail.com",
//   "password"  :   "Jeelan@123"
// }

import './Login.css'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { LoginAsyncThunk } from '../../redux/reducers/LoginSlice'
import { useEffect, useState } from 'react'
import { showOtp } from '../../redux/reducers/showOtp'
import { showNewPW } from '../../redux/reducers/showNewPW'

const Login = () => {
  const [response, setResponse] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showOtp(false))
    dispatch(showNewPW(false))
  }, [])

  const loginData = useSelector((state) => state.Login)

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },

    validationSchema: Yup.object({
      userName: Yup.string().required('Required*'),
      password: Yup.string().required('Required*'),
    }),

    onSubmit: (values) => {
      // console.log('sads', values)
    },
  })

  const submitHandler = (e) => {
    e.preventDefault()
    setResponse(true)

    dispatch(
      LoginAsyncThunk({
        userName: formik.values.userName,
        password: formik.values.password,
      }),
      // navigate('/dashBoard'),
    )
  }

  const loginSubmitHandler = () => {}
  useEffect(() => {
    response && loginSubmitHandler()
    console.log('response', response)
    console.log('loginData', loginData)
  }, [response, loginData])

  // console.log(formik.errors)
  return (
    <div>
      <form
        action=""
        className="login-loginContainer"
        onSubmitCapture={(e) => {
          formik.handleSubmit()
          submitHandler(e)
        }}
      >
        <input
          type="text"
          name="userName"
          placeholder=" "
          className="login-input"
          autoComplete="off"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="userName" className="login-lable">
          Email Id
        </label>
        {formik.errors.userName ? (
          <p className="error-msg">{formik.errors.userName}</p>
        ) : null}
        <input
          type="password"
          id="password"
          name="password"
          placeholder=" "
          className="login-input"
          autoComplete="off"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="password" className="login-lable">
          Password
        </label>
        {formik.errors.password ? (
          <p className="error-msg">{formik.errors.password}</p>
        ) : null}
        <div>
          <div
            className="login-forgotPassword"
            onClick={() => {
              navigate('/forgotPassword')
            }}
          >
            Forgot Password ?
          </div>
          {/* <div className="button-loginContainer">
            <div className="login-buttonContainer">
              <button type="submit" className="login-loginButtonn">
                Login
              </button>
            </div>
            <div className="login-buttonContainer">
              <button
                type="button"
                className="login-signUpButton"
                onClick={() => {
                  navigate('/signUp')
                }}
              >
                Sign Up
              </button>
            </div>
          </div> */}
          <div className="login-buttonContainer">
            <button type="submit" className="login-loginButton">
              Login
            </button>
          </div>
          <div className="signUp-text">
            Don't have an account?&nbsp;
            <span
              className="span-btn"
              onClick={() => {
                navigate('/signUp')
              }}
            >
              Sign&nbsp;Up
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
