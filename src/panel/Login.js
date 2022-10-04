import '../App.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login() {

  //Komunikat błędu
  const [message, setMessage] = useState("");
  //Dane pobrane z formularza
  const [data,setData]=useState([]);
  //komunikaty błędów
  const errorMsg = {
    username: "enter your username or email",
    password: "enter your password",
    invalid: "invalid username or password"
  }
  const [error, setError] = useState(true);
  const success = "Logged in...";
  const navigate = useNavigate();

  //useEffect z pustą tablicą zostanie uruchomiony raz []
  useEffect(() => {
    if (error === false) {
      let json = JSON.stringify(data);
      //Wysyłanie danych na serwer
      fetch('https://sampleprojects.pl/panel/action.php', {
        method: 'POST',
        redirect: 'follow',
        body: json
      })
      .then(response => response.json())
      .then((data) => {
        if (data === 'false') {
          setMessage({invalid:errorMsg.invalid})
        } else {
          setMessage({success});
          setTimeout(() => navigate('/plik.txt'), 3000);
        }
      });
    }
  }, [data]);

  //Po kliknięciu przycisku 'Register'  
  function handleLogin() {

    //Usuwa komunikat z błędem
    setMessage('');

    const oUsername = document.getElementById("formUsername");
    const oPassword = document.getElementById("formPassword");

    //Sprawdzanie poprawności uzupełnienia formularza
    if (oUsername.value === '') {
      setMessage({username:errorMsg.username});
    } else if (oPassword.value === '') {
      setMessage({password:errorMsg.password});
    } else {
      setError(false);
      setData({
        username: oUsername.value, 
        password: oPassword.value,
      });
    }
  }
 
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center container rounded p-3 mb-5">
      <h1 className="fs-1 color m-5">Login</h1>
      <Form.Text aria-describedby="inputGroupPrepend2" className="text-danger mb-2">{message.invalid}</Form.Text>
      <Form.Group className="mb-3 input" controlId="formUsername">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupPrepend2">
              <i className="bi bi-person-fill"></i>
            </span>
          </div>
          <Form.Control type="text" placeholder="Username" />
        </div>
      <Form.Text aria-describedby="inputGroupPrepend2" className="text-danger">{message.username}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 input" controlId="formPassword">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupPrepend2">
              <i className="bi bi-key-fill"></i>
            </span>
          </div>
          <Form.Control type="password" placeholder="Password" />
        </div>
        <Form.Text className="text-danger">{message.password}</Form.Text>
      </Form.Group>
      <Button onClick={handleLogin} className="btn">Login</Button>
    </Container>
  );
}

export default Login;
