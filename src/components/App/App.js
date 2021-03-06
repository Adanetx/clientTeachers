import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Teachers from '../routes/teachers'
import TeacherCreate from '../routes/teacherCreate'
import Teacher from '../routes/teacher'
import TeacherEdit from '../routes/teacherEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-pw' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/teachers' render={ () => (
            <Teachers user={user} msgAlert={this.msgAlert} setCreatedId={this.setCreatedId}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/teacher-create' render={ () => (
            <TeacherCreate user={user} msgAlert={this.msgAlert} setCreatedId={this.setCreatedId}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/teachers/:id' render={ (props) => (
            <Teacher {...props} user={user} msgAlert={this.msgAlert} setDeleted={this.setDeleted}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/teachers/:id/edit' render={ (props) => (
            <TeacherEdit {...props} user={user} msgAlert={this.msgAlert} setUpdated={this.setUpdated}/>
          )}/>
        </main>
      </Fragment>
    )
  }
}

export default App
