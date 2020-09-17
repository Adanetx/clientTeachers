import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import TeacherForm from '../shared/teacherForm'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
// import messages from '../AutoDismissAlert/messages'

class TeacherCreate extends Component {
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
      createdId: null
    }
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
      url: `${apiUrl}/teachers`,
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      },
      data: { teacher: this.state.teacher }
    })

    // }
      .then(res => {
        this.props.msgAlert({
          heading: 'teacher Created Successfully',
          message: messages.teacherCreatedSuccess,
          variant: 'success'
        })
        return res
      })
      .then(res => this.setState({ createdId: res.data.teacher._id }))
      .catch(res => this.props.msgAlert({
        heading: 'teacher Create Failed',
        message: messages.teacherCreatedFailure,
        variant: 'danger'
      }))
  }

  render () {
    const { teacher, createdId } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the book
    if (createdId) {
      // redirect to the show page (route)
      console.log(teacher)
      return <Redirect to={`/teachers/${createdId}`} />
    }

    return (
      <div>
        <TeacherForm
          teacher={teacher}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath='/'
        />
      </div>
    )
  }
}

export default withRouter(TeacherCreate)
