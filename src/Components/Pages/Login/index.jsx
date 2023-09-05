import { useEffect, useRef, useState } from 'react'
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner, Stack } from 'react-bootstrap';

function Login() {

  const auth = useAuth()
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErMsg] = useState('');
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setErMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await auth.authenticate(user, pwd);
      setLoading(false);
      navigate(from, { replace: true });
    }
    catch (err) {

    }
  }

  return (
    <>
      <Container className='initialPage d-flex justify-content-center align-items-center' fluid='xxl'>
        <Container fluid="md" className='loginback  d-flex flex-column justify-content-center align-items-center shadow p-3 mb-5 bg-body-tertiary rounded'>
          <p ref={errRef} className={errMsg ? "errmsg" : "ofscreen"}>{errMsg}</p>
          <Row>
            <Col md={15}>
              <h1 className='login_title'>LOGOTIPO</h1>
            </Col>
          </Row>
          <Form className='LoginForm' onSubmit={handleSubmit}>

            <FloatingLabel
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type='email'
                id='login_username'
                placeholder=''
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required />
            </FloatingLabel>
            <FloatingLabel
              label="Senha"
              className="mb-3"
            >
              <Form.Control
                type='password'
                id='login_password'
                placeholder=''
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required />
            </FloatingLabel>
            <Stack gap={3} className="col-md-7 mx-auto buttons">
              <Button
                className='btn'
                type='submit'
                variant="primary"
              >{ loading ? <Spinner> <span className="visually-hidden">Loading...</span> </Spinner> : <><span >ENTRAR</span></> }
              </Button>
            </Stack>
          </Form>

        </Container>
      </Container>
    </>
  )
}

export default Login