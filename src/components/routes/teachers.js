import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'

// This will be our Books Index component (show all books)
class Teachers extends Component {
  constructor (props) {
    super(props)

    // setup our initial state
    this.state = {
      // we have zero books, until our API request has finished
      teachers: []
    }
  }

  // this is called whenever our component is created and inserted
  // into the DOM (first appears)
  componentDidMount () {
    axios({
      url: `${apiUrl}/teachers`,
      method: 'GET',
      headers: {
        'Authorization': `Token=${this.props.user.token}`
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
        <div key={teacher._id} className='teachers'>
          <Link to={`/teachers/${teacher._id}`}>
            {teacher.name}
          </Link>
        </div>
      ))
      return teachers
    }
    return (
      <div className='long'>
        <h1>Teachers</h1>
        {teachers}
      </div>
    )
  }
}

export default withRouter(Teachers)
