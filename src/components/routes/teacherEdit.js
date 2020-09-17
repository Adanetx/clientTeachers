import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import TeacherForm from '../shared/teacherForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'

class TeacherEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      teacher: {
        name: '',
        age: '',
        sex: '',
        favorite_course: '',
        eduction: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/teachers/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ teacher: res.data.teacher }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedTeacher = Object.assign({}, prevState.teacher, updatedField)
      return { teacher: editedTeacher }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/teachers/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      },
      data: { teacher: this.state.teacher }
    })
    //     .then(res => this.setState({ updated: true }))
    //     .catch(console.error)
    // }
      .then(res => this.setState({ updated: true }))
      .then(res => this.props.msgAlert({
        heading: 'teacher Edited Successfully',
        message: messages.teacherEditedSuccess,
        variant: 'success'
      }))
      .catch(res => this.props.msgAlert({
        heading: 'teacher Edit Failed',
        message: messages.teacherEditFailure,
        variant: 'danger'
      }))
  }

  render () {
    // destructure book to show in the form below, and createdId to redirect
    const { teacher, updated } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the book
    if (updated) {
      // redirect to the show page (route)
      return <Redirect to={`/teachers/${this.props.match.params.id}`} />
      // return <Redirect to={'/categories/'}/>
    }

    return (
      <div>
        <TeacherForm
          teacher ={teacher}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          // cancelPath={`/categories/${this.props.match.params.id}`}
          cancelPath={`/teachers/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default withRouter(TeacherEdit)
