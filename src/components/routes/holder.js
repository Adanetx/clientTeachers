render () {
  const teachers = null
  if (this.state.teachers) {
    const teachers = this.state.teachers.map(teacher => (
      <div key={teacher._id}>
        <div className="row">
          <div className="mx-auto mt-5">
            <Card border="info" style={{ width: '14rem' }}>
              <Card.Header><h4> name: {teacher.name}</h4></Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  age: {teacher.age}<br/>
                  sex: {teacher.sex}<br/>
                  favorite_course: {teacher.favorite_course}<br/>
                  education: {teacher.education}<br/>
                </Card.Text>
                <Link to={`/teachers/${teacher._id}`}>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    ))
    return teachers
  }
  return (
    <div className='Card'>
      <Container>
        <Row className="justify-content-md-center">
          <Col md='auto'className="justify-content-center">{teachers}</Col>
        </Row>
      </Container>
    </div>
  )
}
