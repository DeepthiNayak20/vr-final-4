import './loading.css'
import CircularProgress from '@mui/material/CircularProgress'

const Loading = (props) => {
  return (
    <div className="Loading">
      {' '}
      <CircularProgress />
      {/* <h3>{props && props.message && props.message}</h3> */}
    </div>
  )
}

export default Loading
