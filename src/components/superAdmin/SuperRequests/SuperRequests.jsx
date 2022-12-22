import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { superAdminThunk } from '../../../redux/reducers/superAdminInfo'
import './SuperRequests.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SuperRequests = () => {
  const [requestData, setRequestData] = useState([])
  const dispatch = useDispatch()

  const data = useSelector((state) => state.superAdmin.data)

  console.log('data', data && data.data && data.data)

  useEffect(() => {
    data &&
      data.data &&
      data.data &&
      data.data.listOfAdmins &&
      setRequestData(data.data.listOfAdmins)
  }, [data])

  const acceptAdmin = (data) => {
    // alert(JSON.stringify(data))
    fetch(
      `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/superAdmin/approve`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      },
    )
      .then((res) => {
        toast.info('Admin has been approved', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        })
        if (res.status === 202) {
          // alert('email sent')
          dispatch(superAdminThunk())
        }
      })
      .catch((err) => {
        toast('Internal server error', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        })
        console.log(err)
      })
  }

  const rejectAdmin = (data) => {
    // alert(JSON.stringify(data))
    fetch(
      `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/superAdmin/reject`,
      {
        method: 'delete',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      },
    )
      .then((res) => {
        toast.info('Admin has been rejected', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        })
        if (res.status === 200) {
          // alert('rejected')
          dispatch(superAdminThunk())
        }
      })
      .catch((err) => {
        toast('Internal server error', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        })
        console.log(err)
      })
  }
  return (
    <div className="studentList-container">
      <div className="admin-requests">Requests</div>
      <div className="admin-form">
        <div className="tableContainer">
          {' '}
          <table className="tableItem">
            <tr className="tableTr">
              <th></th>
              <th>Name</th>
              <th>Email&nbsp;Id</th>
              <th>Mobile&nbsp;No</th>
              <th></th>
              <th></th>
            </tr>
            {requestData.map((item, i) => {
              // console.log('item', item)
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{item.fullName}</td>
                  <td>{item.emailId}</td>
                  <td>{item.mobileNumber}</td>
                  <td className=" btnApprove">
                    <button
                      className="acceptBtn accept"
                      onClick={() => {
                        acceptAdmin({
                          emailId: item.emailId,
                          fullName: item.fullName,
                        })
                      }}
                    >
                      Accept
                    </button>
                  </td>
                  <td className=" btnApprove">
                    {' '}
                    <button
                      className="acceptBtn reject"
                      onClick={() => {
                        rejectAdmin({
                          emailId: item.emailId,
                        })
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>
    </div>
  )
}

export default SuperRequests
