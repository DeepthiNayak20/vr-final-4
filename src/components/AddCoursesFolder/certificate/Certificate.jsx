import React, { useEffect, useState } from 'react'
import './Certificate.css'
import Modal from 'react-modal'

// function Certificate({ certificate }) {

function getDifferenceInDays(date1, date2) {
  date1 = Date.parse(date1)
  date2 = Date.parse(date2)
  const diffInMs = Math.abs(date2 - date1)
  const days = diffInMs / (1000 * 60 * 60 * 24)
  // console.log('daysss', date1, date2)
  return `${days} days`
}

// console.log(date1);
// console.log(date2);

// useEffect(() => {
//   certificate(value);
// });

const Certificate = () => {
  const [value, setValue] = useState({
    Coursetitle: '',
    name: '',
    title: '',
    joinedDate: '',
    completedDate: '',
  })

  const [preview, setPreview] = useState(true)
  const [date1, setDate1] = useState()
  const [date2, setDate2] = useState()

  function certificateSubmitHandler(event) {
    event.preventDefault()
    setValue({
      CertificationTitle: event.target.CertificationTitle.value,
      name: event.target.name.value,
      title: event.target.title.value,
      joinedDate: event.target.joined.value,
      completedDate: event.target.completed.value,
    })
    // alert(JSON.stringify(value));
  }

  function previewHandler(e) {
    e.preventDefault()
    setPreview(!preview)
  }

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className="certificate-container">
      <div className="Certificate">
        <form onSubmit={certificateSubmitHandler}>
          <div className="certificate-formm">
            <div className="certificate-itemContainer">
              <div className="certificate-left">
                {' '}
                <label>
                  Certification title
                  <input
                    type="text"
                    name="CertificationTitle"
                    placeholder="Enter title"
                    required
                    autoComplete="off"
                  />
                </label>
                <label>
                  Student name
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    required
                    autoComplete="off"
                  />
                </label>
                <label>
                  Courses title
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter courses title"
                    required
                    autoComplete="off"
                  />
                </label>
                <div className="certificateDate">
                  <label>
                    Joined date
                    <input
                      type="date"
                      name="joined"
                      onChange={(event) => setDate1(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Completed date
                    <input
                      type="date"
                      name="completed"
                      onChange={(event) => setDate2(event.target.value)}
                      required
                    />
                  </label>
                  <div className="differenceInDays">
                    {date1 && date2 && getDifferenceInDays(date1, date2)}
                  </div>
                </div>
                <div className="certificateNum">
                  Certificate No.&nbsp;2CFDGS4GDFHJ
                </div>
              </div>
              {/* <div className="certicate-right"></div> */}

              <div className="cupImage">
                <img
                  src={require('../../../assets/Cup.png')}
                  alt="cerificate"
                />
              </div>
            </div>
            <div className="certificateFooter">
              <svg
                width={425}
                height={104}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M88.612 0c-1.921 0-3.48 1.55-3.48 3.46v2.267l-7.065-3.89a2.84 2.84 0 00-3.85 1.096 2.81 2.81 0 001.1 3.831L80.7 9.726l4.564-2.485 1.318-.718 5.51-3V3.46A3.47 3.47 0 0088.61 0zM107.731 18.519l-.091-.052-11.016-6.285-5.567 3.246-.16.093 13.473 7.866c.342.25.687 1.148.687 1.569v17.209c0 .42-.34 1.318-.68 1.569l-14.822 8.59c-.088.038-.369.136-.858.136-.49 0-.793-.098-.88-.136l-15.092-8.596c-.361-.245-1.052-1.148-1.052-1.581V24.975c0-.433.708-1.338 1.07-1.582l12.927-7.392 1.635-.883.72-.389.89-.48 5.825-3.142.084-.046 2.673-1.442 4.116-2.22a2.81 2.81 0 001.164-3.813 2.84 2.84 0 00-3.834-1.158l-3.49 1.883-1.162.635-2.2 1.203-3.107 1.697-2.37 1.296-.557.304-2.944 1.609-.806.44-5.063 2.767-5.725 3.082-2.129 1.175c-2.05 1.18-4.394 4.07-4.394 6.426v17.23c0 2.355 2.337 5.247 4.387 6.426l15.334 8.61c1.024.589 2.524.885 3.873.885 1.347 0 2.77-.296 3.796-.885l15.316-8.61c2.05-1.18 4.032-4.071 4.032-6.427V24.945c0-2.355-1.95-5.246-4.003-6.426z"
                  fill="#fff"
                />
                <path
                  d="M96.001 34.672a1.22 1.22 0 01-.55.546v.006l-9.811 4.86c-.606.3-1.343.056-1.646-.544a1.2 1.2 0 01-.129-.55v-9.72a1.22 1.22 0 011.226-1.215c.19 0 .379.044.549.128l9.81 4.86c.607.299.853 1.029.551 1.63z"
                  fill="#FCBE4B"
                />
                <path
                  d="M133 17l13.416 34.611h7.198L167.031 17h-9.059l-7.981 20.417L142.108 17H133zm42.617 9.333c2.399 0 4.407-1.993 4.407-4.375 0-2.382-2.008-4.375-4.407-4.375a4.373 4.373 0 00-4.407 4.375 4.373 4.373 0 004.407 4.375zm-3.868 25.278h7.736V29.347h-7.736v22.264zm22.164-22.264h-7.736v22.264h7.736V39.896c0-1.799 2.4-3.257 5.289-3.257l1.909-7.68c-2.35 0-4.945.485-7.198 1.652v-1.264zm20.676 22.264h6.806l-2.008-7.535h-4.7c-.294 0-.539-.291-.539-.68v-6.903h5.582v-7.146h-5.582v-6.951h-7.736v6.951h-2.693v7.146h2.693v7c0 4.57 3.672 8.118 8.177 8.118zm13.638-2.528C230.284 50.98 232.879 52 235.67 52a10.74 10.74 0 007.394-2.917c2.007-1.993 3.133-4.57 3.133-7.291V29.347h-7.736v12.445c0 1.41-1.273 2.625-2.791 2.625s-2.791-1.216-2.791-2.625V29.347h-7.737v12.445c0 2.722 1.078 5.298 3.085 7.291zm34.119-20.125a11.796 11.796 0 00-8.275 3.355c-2.154 2.187-3.378 5.104-3.378 8.166 0 3.111 1.224 5.98 3.378 8.215A11.878 11.878 0 00262.346 52c1.322 0 2.938-.486 3.869-1.41v1.021H274V29.347h-7.785v1.021c-.931-.924-2.547-1.41-3.869-1.41zm0 15.459c-2.203 0-3.917-1.799-3.917-3.938 0-2.139 1.714-3.937 3.917-3.937 2.155 0 3.869 1.798 3.869 3.937 0 2.14-1.714 3.938-3.869 3.938z"
                  fill="#fff"
                />
                <path
                  d="M303 51.611h24.965V43.3h-16.513V17H303v34.611zm38.659.34c2.198-.048 4.25-.632 5.813-1.604 2.15-1.312 3.86-3.5 4.251-3.937l-6.205-3.063a4.95 4.95 0 01-1.026.972c-.586.39-1.514.924-2.589.924-.44 0-2.736-.146-2.736-2.868v-.097h13.093v-.34c.049-.876.147-2.626-.097-3.89-.342-1.895-1.32-3.791-2.785-5.395-2.003-2.236-4.739-3.452-7.768-3.452-2.98 0-5.716 1.216-7.768 3.452A11.924 11.924 0 00331.106 38a11.285 11.285 0 00-.293 2.576c0 .34 0 .68.049 1.021.195 2.528 1.221 4.959 2.98 6.952 2.052 2.187 4.837 3.402 7.768 3.402h.049zm-.049-16.333c.733 0 2.149.583 2.394 2.042l.049.146h-4.837l.049-.146c.244-1.507 1.71-2.042 2.345-2.042zm25.401-6.66a11.758 11.758 0 00-8.257 3.355c-2.149 2.187-3.371 5.104-3.371 8.166 0 3.111 1.222 5.98 3.371 8.215 2.248 2.14 5.13 3.306 8.257 3.306 1.319 0 2.931-.486 3.859-1.41v1.021h7.768V29.347h-7.768v1.021c-.928-.924-2.54-1.41-3.859-1.41zm0 15.459c-2.199 0-3.909-1.799-3.909-3.938 0-2.139 1.71-3.937 3.909-3.937 2.149 0 3.859 1.798 3.859 3.937 0 2.14-1.71 3.938-3.859 3.938zm25.424-15.07h-7.719v22.264h7.719V39.896c0-1.799 2.394-3.257 5.276-3.257l1.905-7.68c-2.345 0-4.934.485-7.181 1.652v-1.264zm29.438 2.771c-2.052-2.042-4.836-3.111-7.719-3.111-1.123 0-2.784.437-3.175 1.361v-1.02h-7.719V51.61h7.719V39.8c0-1.75 1.416-3.209 3.175-3.209 1.71 0 3.127 1.459 3.127 3.209V51.61H425V39.8c0-2.917-1.124-5.59-3.127-7.632v-.049z"
                  fill="#EE5C4D"
                />
                <path d="M304 51h-25v-8.166h16.536V17H304v34z" fill="#fff" />
              </svg>
            </div>
            <div className="certificateButtons">
              <button className="saveButtonn preBtn" onClick={openModal}>
                Preview
              </button>
              <button type="submit" className="saveButtonn savBtn">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="preview-certificate-modal"
        >
          <div className="certifiacte-overlay">
            <div className="certificate-Modal">
              <div className="certificate-preview-contents">
                <div className="cerificate-overlayContent">
                  <div className="certificate-Title">
                    {' '}
                    {value.CertificationTitle}
                  </div>
                  <div className="Certificate-Name">{value.name}</div>
                  <div className="Certificate-Course">{value.title}</div>
                  <div className="certificate-Body">
                    <div>
                      {'\u25CF'} Joined:&nbsp;{value.completedDate} &nbsp;
                    </div>
                    <div>
                      {' '}
                      {'\u25CF'} Completed:&nbsp; {value.joinedDate}
                      &nbsp;
                    </div>
                    <div className="DifferenceInDays">
                      {'  '}
                      {'\u25CF'}{' '}
                      {date1 && date2 && getDifferenceInDays(date1, date2)}
                    </div>
                  </div>
                  <div className="certificateNumber">
                    {'  '}
                    Certificate No:&nbsp;2CFDGS4GDFHJ
                  </div>
                </div>
              </div>
              <div className="cupImageModal">
                <img
                  src={require('../../../assets/Cup.png')}
                  alt="cerificate"
                  className="certificateImage"
                />
              </div>
              <div className="certificateFooterModal">
                <img
                  src={require('../../../assets/footer.jpg')}
                  alt="cerificate"
                  className="certificatefooterImg"
                />
              </div>
            </div>
            <button
              className="previewButton-close previewPosition"
              onClick={closeModal}
            >
              <svg
                width={37}
                height={36}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#prefix__clip0_508_11882)">
                  <path
                    d="M28.851 9.615L26.71 7.5l-8.488 8.385L9.733 7.5l-2.14 2.115L16.08 18l-8.489 8.385L9.733 28.5l8.489-8.385L26.71 28.5l2.141-2.115L20.363 18l8.488-8.385z"
                    fill="#000"
                  />
                </g>
                <defs>
                  <clipPath id="prefix__clip0_508_11882">
                    <path fill="#fff" d="M0 0h36.444v36H0z" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Certificate
