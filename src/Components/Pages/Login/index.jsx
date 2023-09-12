import { useEffect, useRef, useState } from 'react'
import './Login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import goldLogo from '../../../Assets/logo2-SVG.svg'
import { Button, Container, FloatingLabel, Form, Image, Row, Spinner, Stack } from 'react-bootstrap';
import { Alert, Snackbar, Slide } from '@mui/material';

function Login() {

  const auth = useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(null);
  const [errorAlert, setErrorAlert] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const { error } = auth;

  useEffect(() => {
    if (error) {
      setErrorAlert(true);
      const timer = setTimeout(() => {
        auth.clearLoginError();
        setErrorAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (auth.token) {
      navigate('/'); 
    }
  }, [auth.token, navigate]);

  const handleUserInteraction = () => {
    setIsUserInteracting(true);
  }

  const handleUserInteractionEnd = () => {
    setIsUserInteracting(false);
  }

  const transitionAlert = (props) => {
    return <Slide {...props} direction="left" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginSuccess = await auth.authenticate(user, pwd);
      if (loginSuccess) {
        navigate('/');
      }

    } catch (error) {
      console.log(error)
    } finally {
      setUser('');
      setPwd('');
      setLoading(false);
    }
  }

  return (
    <>
      <Container className='initialPage d-flex justify-content-center align-items-center justify-content-sm-center'>
        <Container fluid="md" className='loginback d-flex flex-column justify-content-center align-items-center shadow p-2 mb-3 bg-body-tertiary rounded'>

          {error && !isUserInteracting && (
            <Snackbar open={errorAlert} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} TransitionComponent={transitionAlert}>
              <Alert severity='error'> {error} </Alert>
            </Snackbar>
          )}

          <Row xs={1}>
            <Image src={goldLogo} rounded fluid />
          </Row>
          <Form className='LoginForm' onSubmit={handleSubmit}>

            <FloatingLabel
              label="Email"
              className="mb-3"
            >
              <Form.Control
                className='inpt'
                type='email'
                id='login_username'
                placeholder=''
                onChange={(e) => setUser(e.target.value)}
                onFocus={handleUserInteraction}
                onBlur={handleUserInteractionEnd}
                disabled={loading}
                value={user}
                required />
            </FloatingLabel>
            <FloatingLabel
              label="Senha"
              className="mb-3"
            >
              <Form.Control
                className='inpt'
                type='password'
                id='login_password'
                placeholder=''
                onFocus={handleUserInteraction}
                onBlur={handleUserInteractionEnd}
                onChange={(e) => setPwd(e.target.value)}
                disabled={loading}
                value={pwd}
                required />
            </FloatingLabel>
            <Stack gap={3} className="col-md-7 mx-auto buttons">
              <Button
                className='btn'
                type='submit'
                variant="primary"
                disabled={loading}
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