import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Nav from './Nav'
import FormFill from './FormFill'
import View from './View'

const Home = () => {
  const users = useSelector(state => state.getUsers.userState)
  const user = useSelector(state => state.getUser.userState)

  return (
    <>
      <Nav />
      <Container style={{ marginTop: '70px' }}>
        <Row>
          <Col md={4}>
            <FormFill user={user} />
          </Col>
          <Col md={8}>
            <View users={users} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
