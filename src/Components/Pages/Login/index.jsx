import { useEffect, useRef, useState } from 'react'
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Button, Col, Container, FloatingLabel, Form, Image, Row, Spinner, Stack } from 'react-bootstrap';

function Login() {

  const auth = useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(null);

  const { error } = auth;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginSuccess = await auth.authenticate(user, pwd);
    setLoading(false);
    if (loginSuccess) {
      navigate(from, { replace: true });
    }
    setUser('');
    setPwd('');
  }

  return (
    <>
      <Container className='initialPage d-flex justify-content-center align-items-center justify-content-sm-center'>
        <Container fluid="md" className='loginback d-flex flex-column justify-content-center align-items-center shadow p-2 mb-3 bg-body-tertiary rounded'>
          {error && (
            <p className="errmsg">{error}</p>
          )}
          <Row xs={1}>
              <Image src="/src/Assets/logo2-SVG.svg" rounded fluid/>
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
              >{loading ? <Spinner> <span className="visually-hidden">Loading...</span> </Spinner> : <><span >ENTRAR</span></>}
              </Button>
            </Stack>
          </Form>

        </Container>
      </Container>
    </>
  )
}

export default Login