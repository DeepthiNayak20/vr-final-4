import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  storeoverViewVideo,
  storeoverViewPhoto,
  storeoverViewData,
  storelearningOutCome,
  storerequirements,
  storedifficultyLevel,
  storecourseKeyword,
} from '../../../redux/reducers/overViewSlice'
import Loading from '../../../utils/loading/loading'
import './OtherTextArea.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const OtherTextArea = () => {
  const [cloudinaryVideo, setcloudinaryVideo] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [photoLink, setPhotoLink] = useState('')
  const [videoLink, setVideoLink] = useState('')

  const dispatch = useDispatch()

  //cloudinary upload
  function uploadVideoPreview(e) {
    setLoading(true)
    setLoadingMessage('Preview video is being uploaded to cloud...')

    const cloudName = 'dtp1d46p6'
    const uploadPreset = 'j4ygtykr'
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload/`
    const timestamp = Date.now() / 1000
    const previewVideo = e.target.files[0]

    let formData = new FormData()
    formData.append('api_key', '694173934399617')
    formData.append('file', previewVideo)
    formData.append('public_id', e.target.files[0].name) //this should be changed
    formData.append('timestamp', timestamp)
    formData.append('upload_preset', uploadPreset)

    axios
      .post(url, formData)
      .then((result) => {
        // console.log('Result', result)
        setcloudinaryVideo(result)
        setLoading(false)
        setLoadingMessage('')
        // alert('Video upload successful')
        toast.success('Preview Video Upload Successful', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        setVideoLink(result.data.url)
        dispatch(storeoverViewVideo({ videoUpload: result.data.url }))
      })
      .catch((err) => {
        // console.log(err)
        // alert('upload failed')
        toast.error('Preview video could not be uploaded', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        setLoading(false)
        setLoadingMessage('')
      })
  }
  //cloudinary upload

  function uploadPhoto(e) {
    setLoading(true)
    setLoadingMessage('Preview photo is being uploaded to cloud...')
    const cloudName = 'dtp1d46p6'
    const uploadPreset = 'j4ygtykr'
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`
    const timestamp = Date.now() / 1000
    const previewVideo = e.target.files[0]

    let formData = new FormData()
    formData.append('api_key', '694173934399617')
    formData.append('file', previewVideo)
    formData.append('public_id', e.target.files[0].name) //this should be changed
    formData.append('timestamp', timestamp)
    formData.append('upload_preset', uploadPreset)

    axios
      .post(url, formData)
      .then((result) => {
        // console.log('Result', result)
        // setcloudinaryVideo(result)
        setLoading(false)
        setLoadingMessage('')
        // alert('Photo upload successful')
        toast.success('Preview Photo Upload Successful', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        setPhotoLink(result.data.url)
        dispatch(storeoverViewPhoto({ imageUpload: result.data.url }))
      })
      .catch((err) => {
        // console.log(err)
        // alert('upload failed')
        toast.error('Preview photo could not be uploaded', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        setLoading(false)
        setLoadingMessage('')
      })
  }

  // console.log('video pic link', photoLink, videoLink)
  const overview = useSelector((state) => state.overViewData)
  const [outcome, setOutcome] = useState(overview.learningOutCome)
  const [require, setRequire] = useState(overview.requirements)
  const [diff, setDiff] = useState(overview.difficultyLevel)
  const [keyWord, setKeyWord] = useState(overview.courseKeyword)

  console.log('overview', overview)
  return (
    <>
      <div className="upload-videoCategoryFileds">
        <div>
          {' '}
          <div className="upload-title">Course&nbsp;Outcome</div>
          <div className="textarea-tagline">
            <textarea
              value={outcome}
              onChange={(e) => {
                dispatch(storelearningOutCome(e.target.value))
                setOutcome(e.target.value)
              }}
              name="courseOutcome"
              className="upload-inputField "
              required
              autoComplete="off"
            ></textarea>
          </div>
        </div>
        <div>
          <div className="upload-title">Requirements</div>
          <div className="textarea-tagline">
            <textarea
              name="requirements"
              className="upload-inputField "
              required
              autoComplete="off"
              value={require}
              onChange={(e) => {
                dispatch(storerequirements(e.target.value))
                setRequire(e.target.value)
              }}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="upload-videoCategoryFiles">
        <div>
          {' '}
          <div className="upload-title">Course Thumbnail</div>
          <input
            type="file"
            onChange={(e) => {
              uploadPhoto(e)
            }}
            name="imageUpload"
            accept="image/png, image/jpeg"
            placeholder="Video Title"
            className="upload-inputField title"
            autoComplete="off"
          />
        </div>
        <div>
          <div className="upload-title">Preview Video</div>
          <input
            type="file"
            name="videoUpload"
            onChange={(e) => {
              uploadVideoPreview(e)
            }}
            accept="video/*"
            autoComplete="off"
            placeholder="Video Category"
            className="upload-inputField category"
          />
        </div>
      </div>
      <div className="upload-difficultyLevel">
        <div>
          <div className="upload-title">Difficulty&nbsp;Level</div>
          <div className="upload-videoTitle">
            <select
              name="difficultyLevel"
              className="upload-select"
              value={diff}
              onChange={(e) => {
                dispatch(storedifficultyLevel(e.target.value))
                setDiff(e.target.value)
              }}
            >
              <option value=""> Select</option>
              <option value="Beginner"> Beginner</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div>
          <div className="upload-title">Course&nbsp;Keyword</div>
          <input
            type="text"
            name="courseKeyWord"
            placeholder="Course Keyword"
            className="upload-inputField category"
            autoComplete="off"
            required
            value={keyWord}
            onChange={(e) => {
              dispatch(storecourseKeyword(e.target.value))
              setKeyWord(e.target.value)
            }}
          />
        </div>
      </div>

      {loading && <Loading />}
    </>
  )
}

export default OtherTextArea
