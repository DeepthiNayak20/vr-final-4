import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from '../../redux/reducers/showModal'
import './Modal.css'

const Modal = (props) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState('')

  const loadFile = (e) => {
    setImage(e.target.files[0])
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('data', props.title, props.url)
    if (props.title === 'Category') {
      const form = document.getElementById('modalForm')
      const formData = new FormData(form)

      formData.append('categoryName', e.target.cat.value)
      formData.append('categoryPhoto', image)

      axios
        .request(
          `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/category`,
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
          console.log('res', res.data)
          sessionStorage.setItem('catId', res.data.categoryId)
          alert(res.data.status)
          dispatch(showModal(false))
        })
        .catch((err) => {
          alert(err.response.data.Error)
          dispatch(showModal(false))
        })
    } else if (props.title === 'Sub Category') {
      axios(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/subCategory`,
        {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          data: JSON.stringify({
            categoryId: parseInt(sessionStorage.getItem('catId')),
            subCategoryName: e.target.cat.value,
          }),
        },
      )
        .then((res) => {
          console.log('res', res.data)
          sessionStorage.setItem('SubCatId', res.data.subCategoryId)
          alert(res.data.status)
          dispatch(showModal(false))
        })
        .catch((err) => {
          alert(err.response.data.Error)
          dispatch(showModal(false))
        })
    }
  }

  return (
    <div
      className="Modal-overlay"
      onClick={() => {
        dispatch(showModal(false))
      }}
    >
      <div
        className="delete-course-modal"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <form
          id="modalForm"
          className="delete-course-modal-content"
          style={{ height: 'unset !important' }}
          onSubmit={submitHandler}
        >
          <div className="deleteCourse">{props && props.title}</div>
          <div className="deleteContent">Add new {props.title}</div>
          <input className="upload-inputField " name="cat" />
          {props.title === 'Category' ? (
            <input
              id="file"
              type="file"
              className="upload-inputField "
              accept="image/png, image/jpeg"
              onChange={(e) => {
                loadFile(e)
              }}
            />
          ) : (
            ''
          )}
          <div className="buttons modalInput">
            <button
              type="button"
              className="cancel"
              onClick={() => {
                dispatch(showModal(false))
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="delete"
              onClick={() => {
                // dispatch(showModal(false))
              }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
