import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import OutlineButton from '../shared/OutlineButton.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'
// import Dropdown from 'react-bootstrap/Dropdown'
class Teacher extends Component {
  constructor (props) {
    // this makes sure that `this.props` is set in the constructor
    super(props)

    this.state = {
      // Initially, our book state will be null, until the API request finishes
      teacher: null,
      // initially this book has not been deleted yet
      deleted: false

    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/teachers/${this.props.match.params.id}/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })

      .then(res => this.setState({ teacher: res.data.teacher }))
      .catch(console.error)
  }

  destroyTeacher = () => {
    axios({
      url: `${apiUrl}/teachers/${this.props.match.params.id}/`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })

      .then(() => this.setState({ deleted: true }))
      .then(res => this.props.msgAlert({
        heading: 'teacher Deleted Successfully',
        message: messages.teacherDeleteSuccess,
        variant: 'success'
      }))
      .then(() => { return <Redirect to='/teachers' /> })
      .catch(console.error)
  }

  render () {
    const { teacher, deleted } = this.state
    //
    if (!teacher) {
      return <p>Loading...</p>
    }

    // if the deleted state is true
    if (deleted) {
      // redirect to the categories
      return <Redirect to={{
        pathname: '/',
        state: { message: 'Deleted teacher successfully' }
      }} />
    }
    // const owner = (this.props.user._id === this.state.teacher.owner)
    return (
      <div className='long'>
        <h3>singgle teacher:</h3>
        <div className='category'>
          <h6>name: {teacher.name}</h6>
          <p>  age: {teacher.age}</p>
          <p> sex: {teacher.sex}</p>
          <p>favorite course: {teacher.favorite_course}</p>
          <p>level of education: {teacher.education}</p>
          <Link to={`/teachers/${this.props.match.params.id}/edit`}>
            <OutlineButton variant="outline-info" size="size">Edit</OutlineButton>
          </Link>
          <OutlineButton variant= "outline-danger" size="sm" onClick={this.destroyTeacher}>Delete</OutlineButton>
        </div>
      </div>
    )
  }
}

export default withRouter(Teacher)
