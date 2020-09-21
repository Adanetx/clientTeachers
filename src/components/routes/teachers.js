import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'
// import OutlineButton from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

// This will be our Books Index component (show all books)
class Teachers extends Component {
  constructor (props) {
    super(props)

    // setup our initial state
    this.state = {
      teachers: []
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/teachers/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ teachers: res.data.teachers }))
      .then(res => this.props.msgAlert({
        heading: 'listed Successfully',
        message: messages.teachersListedeSuccess,
        variant: 'success'
      }))
    // .then(res => console.log(res))
      .catch(res => this.props.msgAlert({
        heading: 'teachers Index Failed',
        message: messages.teachersIndexFailure,
        variant: 'danger'
      }))
      // .catch(console.error)
  }
  render () {
    const teachers = null
    if (this.state.teachers) {
      const teachers = this.state.teachers.map(teacher => (
        <div key={teacher._id} className='teacherCreatedSuccess'>
          <Link to={`/teachers/${teacher._id}`}>
          name = {teacher.name}{',   '}
          </Link>
        age = {teacher.age}{',   '}
      sex = {teacher.sex}{',   '}
      favorite course = {teacher.favorite_course}{',   '}
        education = {teacher.education} {',   '}
        </div>
      ))
      return teachers
    }
    return (
      <div className='long'>
        <h1>teachers</h1>
        {teachers}
      </div>
    )
  }
}

export default withRouter(Teachers)
