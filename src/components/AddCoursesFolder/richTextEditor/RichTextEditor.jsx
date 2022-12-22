import './RichTextEditor.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeDescription } from '../../../redux/reducers/ckEditor'
import { storeDescriptionagain } from '../../../redux/reducers/overViewSlice'
const RichTextEditor = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(storeDescription(text))
    dispatch(storeDescriptionagain(text))
  }, [text])
  const overview = useSelector((state) => state.overViewData)
  return (
    <div>
      <div className="richText-container">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          name="description"
          required
          onChange={(event, editor) => {
            const data = editor.getData()
            setText(data)
            // dispatch(storeDescription(data))
          }}
          style={{ width: '100px' }}
        />
      </div>
    </div>
  )
}

export default RichTextEditor
