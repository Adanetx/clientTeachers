import React from 'react'
import { Link } from 'react-router-dom'
import OutlineButton from './OutlineButton.js'

const TeacherForm = ({ teacher, handleSubmit, handleChange, cancelPath }) => (
  <div className='long'>
    <form onSubmit={handleSubmit}>
      <label>name:</label><br/>
      <input
        placeholder='Enter a name'
        value={teacher.name}
        name='name'
        onChange={handleChange}
      /><br/>
      <label>age:</label><br/>
      <input
        placeholder='Enter a age'
        value={teacher.age}
        name='age'
        onChange={handleChange}
      /><br/>
      <label>sex:</label><br/>
      <input
        placeholder='Enter a sex'
        value={teacher.sex}
        name='sex'
        onChange={handleChange}
      /><br/>
      <label>favorite course:</label><br/>
      <input
        placeholder='Enter favorite course'
        value={teacher.favorite_course}
        name='favorite_course'
        onChange={handleChange}
      /><br/>
      <label>highest education level:</label><br/>
      <input
        placeholder='education...'
        value={teacher.education}
        name='education'
        onChange={handleChange}
      /><br/>
      <OutlineButton size="sm" variant="outline-success" type="submit">Submit</OutlineButton>
      <Link to={cancelPath}>
        <OutlineButton size="sm" variant="outline-dark">Cancel</OutlineButton>
      </Link>
    </form>
  </div>
)

export default TeacherForm
