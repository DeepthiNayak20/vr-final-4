import './ToggleSwitch.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { correctAns } from '../../../redux/reducers/testSlice'

const ToggleSwitch = (props) => {
  const [isToggled, setIsToggled] = useState(false)
  console.log('props', props)
  const dispatch = useDispatch()

  const onToggle = () => {
    setIsToggled(!isToggled)

    dispatch(correctAns({ index: props.index, label: props.label }))
  }

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isToggled}
        onChange={onToggle}
        label={props.label}
      />
      <span className="switch" />
    </label>
  )
}

export default ToggleSwitch
