import './UploadMultipleVideos.css'
import { useState, useEffect } from 'react'
import VideoInput from './Upload'
import { MultiStepForm, Step } from 'react-multi-form'
import Loading from '../../../utils/loading/loading'
import { useDispatch, useSelector } from 'react-redux'
import { storelesson } from '../../../redux/reducers/lessonListSlice'
import { lessonList } from '../../../redux/reducers/chapterSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UploadMultipleVideos = (props) => {
  console.log('current index', props.index)

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [subChapterName, setSubChapterName] = useState('')
  const [cloudVideoLink, setcloudVideoLink] = useState('')
  const dispatch = useDispatch()

  const [videoInput, setVideoInput] = useState([
    <div className="uploadMultiple-container">
      <div className="uploadMultiple-videos">
        <VideoInput width={400} height={300} />
      </div>

      {/* right Side */}
      <div className="uploadMultiple-text">
        <div className="uploadMultiple-fields">
          <div className="upload-title">Sub&nbsp;Chapter&nbsp;Name</div>
          <input
            type="text"
            name="Category"
            required
            onChange={(e) => {
              setSubChapterName(e.target.value)
            }}
            placeholder="Sub Chapter Name"
            className="uploadMultiple-inputField"
            autoComplete="off"
          />
        </div>
      </div>
    </div>,
  ])
  const [active, setActive] = useState(1)

  const videoLinkCloud = useSelector((state) => state.videoLink.videoLink)

  useEffect(() => {
    setcloudVideoLink(videoLinkCloud)
  }, [videoLinkCloud])

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles]
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
    })
    setUploadedFiles(uploaded)
  }
  //   const handleFileEvent = (e) => {
  //     const chosenFiles = Array.prototype.slice.call(e.target.files)
  //     console.log('chosenFiles', chosenFiles)
  //     handleUploadFiles(chosenFiles)
  //   }

  return (
    <form>
      <div className="multiform-parent">
        {/* multiform */}

        <MultiStepForm activeStep={active}>
          {videoInput.map((ele, i) => {
            return (
              <div key={i}>
                <Step label={i}>{ele}</Step>
              </div>
            )
          })}
        </MultiStepForm>
        {/* multiform */}
      </div>
      <div className="submit-buttons">
        <div className="button-prevNext">
          <button
            type="button"
            onClick={() => {
              setActive(active - 1)
            }}
            disabled={active === 1}
            className="uploadMultiple-btn"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={() => {
              setActive(active + 1)
              videoInput.push(
                <div className="uploadMultiple-container">
                  <div className="uploadMultiple-videos">
                    <VideoInput width={400} height={300} />
                  </div>

                  {/* right Side */}
                  <div className="uploadMultiple-text">
                    <div className="uploadMultiple-fields">
                      <div className="upload-title">
                        Sub&nbsp;Chapter&nbsp;Name
                      </div>
                      <input
                        type="text"
                        onChange={(e) => {
                          setSubChapterName(e.target.value)
                        }}
                        name="Category"
                        placeholder="Sub Chapter Name"
                        className="uploadMultiple-inputField"
                      />
                    </div>
                  </div>
                </div>,
              )
              dispatch(
                storelesson({
                  lessonsName: subChapterName,
                  lessonDuration: '00:00:20',
                  videoLink: videoLinkCloud,
                }),
              )
              dispatch(
                lessonList({
                  index: props.index,
                  lesson: {
                    lessonName: subChapterName,
                    lessonDuration: '00:00:20',
                    videoLink: videoLinkCloud,
                  },
                }),
              )

              // setSubChapterName('')
              // setcloudVideoLink('')
            }}
            disabled={cloudVideoLink === '' || subChapterName === ''}
            className="uploadMultiple-btn"
          >
            Next
          </button>
        </div>

        <div className="btn-doneBtn">
          <button
            type="button"
            disabled={cloudVideoLink === '' || subChapterName === ''}
            onClick={() => {
              dispatch(
                storelesson({
                  lessonName: subChapterName,
                  lessonDuration: '00:00:20',
                  videoLink: videoLinkCloud,
                }),
              )
              dispatch(
                lessonList({
                  index: props.index,
                  lesson: {
                    lessonName: subChapterName,
                    lessonDuration: '00:00:20',
                    videoLink: videoLinkCloud,
                  },
                }),
              )
              toast('Chapter Added Successfully', {
                position: 'bottom-right',
                autoClose: 100,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              })

              // setSubChapterName('')
              // setcloudVideoLink('')
            }}
            className="uploadMultiple-btn doneBtn"
          >
            Done
          </button>
        </div>
      </div>
    </form>
  )
}

export default UploadMultipleVideos
