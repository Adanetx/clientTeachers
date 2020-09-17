import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import OutlineButton from '../shared/OutlineButton.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router'
import messages from '../AutoDismissAlert/messages'

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
      url: `${apiUrl}/teachers/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ teacher: res.data.teacher }))
      .catch(console.error)
  }

  destroyTeacher = () => {
    axios({
      url: `${apiUrl}/teachers/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      // update their `deleted` state to be `true`
    //     .then(() => this.setState({ deleted: true }))
    //     .catch(console.error)
      // }
      .then(() => this.setState({ deleted: true }))
      .then(res => this.props.msgAlert({
        heading: 'teacher Deleted Successfully',
        message: messages.teacherDeleteSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }

  render () {
    const { teacher, deleted } = this.state
    // if we do not have category (category is null)
    //
    // console.log(category)
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
    const owner = (this.props.user._id === this.state.teacher.owner)
    return (
      <div className='long'>
        <h3>Category:</h3>
        <div className='category'>
          <h4>{teacher.name}</h4>
          <p>{teacher.age}</p>
          <p>{teacher.sex}</p>
          <p>{teacher.favorite_course}</p>
          <p>{teacher.eduction}</p>
          {owner ? (
            <React.Fragment>
              <Link to={`/teachers/${this.props.match.params.id}/edit`}>
                <OutlineButton variant="outline-info" size="size">Edit</OutlineButton>
              </Link>
              <OutlineButton variant= "outline-danger" size="sm" onClick={this.destroyTeacher}>Delete Category</OutlineButton>
            </React.Fragment>)
            : ' ' }
        </div>
      </div>
    )
  }
}

export default withRouter(Teacher)
