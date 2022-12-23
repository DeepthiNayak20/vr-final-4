import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './UploadMultipleVideos.css'

import axios from 'axios'
import Loading from '../../../utils/loading/loading'
import { useDispatch } from 'react-redux'
import { storevideoLink } from '../../../redux/reducers/videoUploadLink'

export default function UploadFiles({ childToParent }) {
  const [files, setFiles] = useState([])
  const [previewVideo, setPreviewVideo] = useState('')
  const [progressValue, setProgressValue] = useState(0)
  const [cloudinary, setCloudinary] = useState({})
  const [message, setMessage] = useState('')
  const [chapter, setChapter] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [uploadedVideoLink, setuploadedVideoLink] = useState('')

  const dispatch = useDispatch()

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      console.log('acceptedFiles', acceptedFiles)
      console.log('rejectedFiles', rejectedFiles)

      JSON.stringify(acceptedFiles) !== '[]' &&
        uploadVideoToCloud(acceptedFiles)

      const mappedAcceptedFiles = acceptedFiles.map((file) => ({
        file,
        errors: [],
      }))
      console.log('Files', mappedAcceptedFiles)
      setFiles((curr) => [...curr, ...mappedAcceptedFiles, ...rejectedFiles])
    },
    [files],
  )

  const uploadVideoToCloud = (file) => {
    console.log('files to be uploaded', file[0])

    setLoading(true)
    setLoadingMessage('Preview photo is being uploaded to cloud...')

    const cloudName = 'dtp1d46p6'
    const uploadPreset = 'j4ygtykr'
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload/`
    const timestamp = Date.now() / 1000
    const previewVideo = file[0]

    let formData = new FormData()
    formData.append('api_key', '694173934399617')
    formData.append('file', previewVideo)
    formData.append('public_id', file[0].name) //this should be changed
    formData.append('timestamp', timestamp)
    formData.append('upload_preset', uploadPreset)

    const config = {
      onUploadProgress: (progressEvent) => {
        const progress = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100,
        )
        console.log(progress)
        setProgressValue(progress)
      },
    }

    axios
      .post(url, formData, config)
      .then((result) => {
        console.log('Result', result)
        // setcloudinaryVideo(result)
        setLoading(false)
        setLoadingMessage('')
        dispatch(storevideoLink(result.data.url))
        setMessage('Video upload successful')
        setuploadedVideoLink(result.data.url)
        document.querySelector('#save').disabled = false
      })
      .catch((err) => {
        console.log(err)
        alert('upload failed')
        setLoading(false)
        setLoadingMessage('')
        setMessage('Video upload failed')
        setPreviewVideo(false)
      })
  }

  useEffect(() => {
    const preview =
      files && files.length > 0 && URL.createObjectURL(files[0].file)
    setPreviewVideo(preview)
    console.log('preview', preview)
  }, [files])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mpg', '.mpeg', '.avi', '.wmv', '.mp4', '.webm', '.mov'],
    },
  })

  const Parentdiv = {
    height: '3px',
    width: '80%',
    backgroundColor: '#DFDFDF',
    borderRadius: 40,
    position: 'relative',
    bottom: '8rem',
    left: '40px',
  }

  const Childdiv = {
    height: '100%',
    width: `${progressValue}%`,
    backgroundColor: '#EE5C4D',
    borderRadius: 40,
    textAlign: 'right',
  }

  const progresstext = {
    padding: 0,
    color: 'black',
  }

  return (
    <React.Fragment>
      <div className="dzu-dropzone">
        <div className="uploadStatusMessage">
          {' '}
          {message !== '' ? (
            message === 'Video upload successful' ? (
              <div className="upload-uploadStatus upload-successfully">
                <svg
                  width="20"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0ZM10.935 21.435L5.55 16.05C4.965 15.465 4.965 14.52 5.55 13.935C6.135 13.35 7.08 13.35 7.665 13.935L12 18.255L22.32 7.935C22.905 7.35 23.85 7.35 24.435 7.935C25.02 8.52 25.02 9.465 24.435 10.05L13.05 21.435C12.48 22.02 11.52 22.02 10.935 21.435Z"
                    fill="#1EAB0D"
                  />
                </svg>
                Videos&nbsp;upload&nbsp;successful
              </div>
            ) : (
              <div className="upload-uploadStatus upload-failed">
                <svg
                  width="20"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0ZM15 16.5C14.175 16.5 13.5 15.825 13.5 15V9C13.5 8.175 14.175 7.5 15 7.5C15.825 7.5 16.5 8.175 16.5 9V15C16.5 15.825 15.825 16.5 15 16.5ZM16.5 22.5H13.5V19.5H16.5V22.5Z"
                    fill="#FF0031"
                  />
                </svg>
                upload&nbsp;failed
              </div>
            )
          ) : (
            ''
          )}
        </div>

        {previewVideo === false ? (
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />

              <div className="Dropzone-inputContents">
                <div className="upload-centerVideo">
                  {' '}
                  <div className="upload-imgUpload">
                    <svg
                      width={110}
                      height={110}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M88.688 46.016C85.57 30.204 71.683 18.333 55 18.333c-13.246 0-24.75 7.517-30.48 18.517C10.726 38.316 0 50.004 0 64.166c0 15.171 12.33 27.5 27.5 27.5h59.583C99.733 91.666 110 81.4 110 68.75c0-12.1-9.396-21.909-21.313-22.734zM87.082 82.5H27.5c-10.13 0-18.333-8.204-18.333-18.334 0-9.395 7.012-17.233 16.316-18.195l4.904-.505 2.292-4.354C37.033 32.725 45.56 27.5 55 27.5c12.008 0 22.367 8.525 24.704 20.304l1.375 6.875 7.013.504c7.15.458 12.741 6.462 12.741 13.567 0 7.562-6.187 13.75-13.75 13.75zM36.667 59.583h11.687v13.75h13.292v-13.75h11.687L55 41.25 36.667 59.583z"
                        fill="#838383"
                      />
                    </svg>
                  </div>
                  <div className="upload-dragDrop">
                    Drag and drop multiple files
                  </div>
                  <div className="upload-browse">
                    <p>
                      or <span className="upload-browseColor">browse</span> to
                      choose files
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="video-container">
            <video
              key={previewVideo}
              width="100%"
              height="100%"
              autoPlay
              id="myVideo"
              controls
            >
              {console.log('preview video', previewVideo)}
              <source src={previewVideo} />
            </video>
            <div className="Progress-bar">
              {' '}
              <div style={Parentdiv}>
                <div style={Childdiv}>
                  <span style={progresstext} className="progress-balloon">
                    <div className="progress-balloon-background">
                      <svg
                        width={39}
                        height={44}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x={1}
                          y={38}
                          width={37}
                          height={37}
                          rx={3}
                          transform="rotate(-90 1 38)"
                          fill="#EE5C4D"
                        />
                        <rect
                          x={1}
                          y={38}
                          width={37}
                          height={37}
                          rx={3}
                          transform="rotate(-90 1 38)"
                          stroke="#EE5C4D"
                          strokeWidth={2}
                        />
                        <path
                          d="M19.657 42.071l-3.002-3h6.003l-3.001 3z"
                          stroke="#EE5C4D"
                          strokeWidth={2.2}
                        />
                        <path
                          d="M19.657 41.313L14 35.657h11.314l-5.657 5.657z"
                          fill="#EE5C4D"
                        />
                      </svg>
                    </div>
                    <div className="progress-balloon-value">
                      {`${progressValue}%`}{' '}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="upload-multipleVideos">
          <h2>Multiple videos</h2>
        </div> */}
      </div>
    </React.Fragment>
  )
}
