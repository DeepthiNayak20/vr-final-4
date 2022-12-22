import './QandA.css'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { useState, useEffect } from 'react'
import 'react-accessible-accordion/dist/fancy-example.css'
import ToggleSwitch from '../toggleSwitch/ToggleSwitch'
import axios from 'axios'
import {
  deleteStatus,
  optionFour,
  optionOne,
  optionThree,
  optionTwo,
  storeTest,
  testQuestion,
} from '../../../redux/reducers/testSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const QandA = () => {
  const [accordian, setAccordian] = useState(false)
  const [counter, setCounter] = useState(0)
  const [answer, setAnswer] = useState('')
  const [QandA, setQandA] = useState([])

  const [passing, setPassing] = useState('75')
  const [duration, setDuration] = useState('00:07:00')

  const dispatch = useDispatch()
  const questionData = useSelector((state) => state.test)
  const addNewHAndler = () => {
    setCounter(counter + 1)
    // console.log(counter)
  }
  const childToParent = (childdata) => {
    setAnswer(childdata)
  }

  const courseID = useSelector((state) => state.courseId.courseId)

  console.log('course Id new', courseID)

  useEffect(() => {
    axios
      .get(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/chapterList?courseId=${courseID}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        // alert('data')
        toast.info('Data is being fetched', {
          position: 'top-left',
          autoClose: 10,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
        // console.log('data', res.data)
        setQandA(res.data)
        setChapterId(res.data[0].chapterId)
      })
  }, [])
  console.log('QandA', QandA)
  const [chapterName, setChapterName] = useState(
    QandA && QandA.length > 0 && QandA[0].chapterName,
  )

  useEffect(() => {
    QandA && QandA.length > 0 && setChapterName(QandA[0].chapterName)
  }, [QandA])

  const [chapterId, setChapterId] = useState(
    QandA && QandA.length > 0 && QandA[0].chapterId,
  )

  const questionHandler = (e) => {
    // alert('alert')
    // e.preventDefault()
    // console.log('ASFDSGFDGFDG', s[s.selectedIndex].id)
    // console.log(option[option.selectedIndex].id)

    axios
      .request(
        `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/addTest`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          method: 'post',
          data: {
            testDuration: duration,
            passingGrade: passing,
            chapterId,
            testName: chapterName,
            questionRequests: questionData.questionRequests,
          },
        },
      )
      .then((res) => {
        console.log('overview result success', res)
        // alert(res && res.data && res.data.message && res.data.message)
        toast.success('Test added successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      })
      .catch((err) => {
        console.log('over view result error', err)
        alert('Some error occured')
      })
  }

  return (
    <div>
      <div className="QandA-addNewContainer">
        <button
          className="QandA-addNewBtn"
          onClick={() => {
            addNewHAndler()
            // testName: ''

            // testDuration: '00:10:00',
            // passingGrade: '75',
            dispatch(
              storeTest({
                questionName: '',
                option_1: '',
                option_2: '',
                option_3: '',
                option_4: '',
                correctAnswer: '',
                deleteStatus: false,
              }),
            )
          }}
        >
          Add&nbsp;New&nbsp;+
        </button>
      </div>
      <div className="QandA-containerForm">
        <form
          action=""
          className="QandA-formController"
          onSubmit={(e) => {
            questionHandler(e)
          }}
        >
          <div className="container-form">
            <div className="QnAChapter">
              <div className="QandA-leftSide">
                <label>
                  <div className="QandA-chapterName">Select Chapter Name</div>
                  <select
                    name="chapter"
                    className="QandA-select"
                    onChange={(e) => {
                      setChapterId(JSON.parse(e.target.value).id)
                      setChapterName(JSON.parse(e.target.value).name)
                    }}
                  >
                    {QandA &&
                      QandA.length > 0 &&
                      QandA.map((ques, i) => {
                        // setChapterName(ques.chapterName)
                        console.log('QandA log log', ques)

                        return (
                          <option
                            value={`{"name":"${ques.chapterName}","id":${ques.chapterId}}`}
                            // id={ques.chapterId}
                            className="QandA-option"
                            key={i}
                            name="chapter"
                            onChange={(e) => {
                              setChapterId(ques.chapterId)
                            }}
                          >
                            Chapter {i + 1} - {ques.chapterName}
                          </option>
                        )
                      })}
                  </select>
                </label>
              </div>
              <div className="QandA-rightSide">
                1&nbsp;of&nbsp;{QandA.length}
              </div>
            </div>

            <div>
              {Array.from(Array(counter)).map((i, index) => {
                return (
                  <div className="accord-item-container">
                    <Accordion allowZeroExpanded key={i}>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <div className="QandA-QuestionContainer">
                              <div className="QandA-QuestionNo">
                                Question&nbsp;{index + 1}
                              </div>
                              <div className="QandA-containerItem">
                                <div className="QandA-containItem">
                                  {' '}
                                  <div className="QandA-head">
                                    <input
                                      onKeyDown={(e) => {
                                        e.stopPropagation()
                                      }}
                                      type="text"
                                      placeholder="Question"
                                      // className="QandA-inputText"
                                      // className="QandA-inputText-success"
                                      autoComplete="off"
                                      className={
                                        deleteStatus === true
                                          ? 'QandA-inputText-success'
                                          : 'QandA-inputText'
                                      }
                                      required
                                      onChange={(e) => {
                                        dispatch(
                                          testQuestion({
                                            index: index,
                                            question: e.target.value,
                                          }),
                                        )
                                      }}
                                    />
                                  </div>
                                  <div className="QandA-delete">
                                    {' '}
                                    <button
                                      type="button"
                                      className="QandA-button"
                                      onClick={() => {
                                        alert('delete')
                                        dispatch(
                                          deleteStatus({
                                            index: index,
                                            deleteStatus: true,
                                          }),
                                        )
                                      }}
                                    >
                                      <svg
                                        width={37}
                                        height={36}
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M24.296 13.5v15H12.148v-15h12.148zm-2.278-9h-7.593L12.907 6H7.592v3h21.259V6h-5.315l-1.518-1.5zm5.314 6H9.111v18c0 1.65 1.366 3 3.037 3h12.148c1.67 0 3.037-1.35 3.037-3v-18z"
                                          fill="#000"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <div className="question-container">
                            {' '}
                            <div className="QandA-options">
                              <input
                                type="text"
                                className="question-options"
                                placeholder="Option 1"
                                required
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch(
                                    optionOne({
                                      index: index,
                                      option_1: e.target.value,
                                    }),
                                  )
                                }}
                              />

                              <ToggleSwitch label="option_1" index={index} />
                            </div>
                            <div className="QandA-options">
                              <input
                                type="text"
                                className="question-options"
                                placeholder="Option 2"
                                required
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch(
                                    optionTwo({
                                      index: index,
                                      option_2: e.target.value,
                                    }),
                                  )
                                }}
                              />

                              <ToggleSwitch label="option_2" index={index} />
                            </div>
                            <div className="QandA-options">
                              <input
                                type="text"
                                className="question-options"
                                placeholder="Option 3"
                                required
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch(
                                    optionThree({
                                      index: index,
                                      option_3: e.target.value,
                                    }),
                                  )
                                }}
                              />

                              <ToggleSwitch label="option_3" index={index} />
                            </div>
                            <div className="QandA-options">
                              <input
                                id="Option_4"
                                type="text"
                                className="question-options"
                                placeholder="Option 4"
                                required
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch(
                                    optionFour({
                                      index: index,
                                      option_4: e.target.value,
                                    }),
                                  )
                                }}
                              />

                              <ToggleSwitch label="Option_4" index={index} />
                            </div>
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )
              })}

              <div className="QandA-buttonSave">
                <button type="submit" className="QandA-Button" id="QandASave">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QandA
