import '../App.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Register() {

  //Komunikat błędu
  const [message, setMessage] = useState("");
  //Dane pobrane z formularza
  const [data,setData]=useState([]);
  //komunikaty błędów
  const errorMsg = {
    username: "enter your username",
    password: "enter your password",
    repassword: "enter your repassword",
    email: "enter your password",
    samePassword: "passwords must be the same"
  }
  const success = "Successfully registered, you will be redirected to the login panel in 3 seconds...";
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  //useEffect z pustą tablicą zostanie uruchomiony raz []
  useEffect(() => {
    if (error === false) {
      let json = JSON.stringify(data);
      //Wysyłanie danych na serwer
      fetch('https://sampleprojects.pl/panel/action_register.php', {
        method: 'POST',
        redirect: 'follow',
        body: json
      })
      .then(response => response.json())
      .then((data) => {
        if (data === 'true') {
          setMessage({success});
          setTimeout(() => navigate('/Login'), 3000);
        }
      });
    }
  }, [data]);
  

  //Po kliknięciu przycisku 'Register'  
  function handleRegister() {

    //Usuwa komunikat z błędem
    setMessage('');

    const oUsername = document.getElementById("formUsername");
    const oPassword = document.getElementById("formPassword");
    const oRepassword = document.getElementById("formRepassword");
    const oEmail = document.getElementById("formEmail");

    //Sprawdzanie poprawności uzupełnienia formularza
    if (oUsername.value === '') {
      setMessage({username:errorMsg.username});
    } else if (oPassword.value === '') {
      setMessage({password:errorMsg.password});
    } else if (oRepassword.value === '') {
      setMessage({repassword:errorMsg.repassword});
    } else if (oRepassword.value !== oPassword.value) {
      setMessage({samePassword:errorMsg.samePassword});
    } else if (oEmail.value === '') {
      setMessage({email:errorMsg.email});
    } else {
      setError(false);
      setData({
        username: oUsername.value, 
        password: oPassword.value,
        email: oEmail.value,
      });
    }
  }
 
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center container rounded p-3 mb-5">
      <h1 className="fs-1 color m-5">Register</h1>
      <Form.Text className="text-success mb-3">{message.success}</Form.Text>
      <Form.Group className="mb-3 input" controlId="formUsername">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupPrepend2">
              <i className="bi bi-person-fill"></i>
            </span>
          </div>
          <Form.Control type="text" placeholder="Username" />
        </div>
        <Form.Text className="text-danger">{message.username}</Form.Text>
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
      <Form.Group className="mb-3 input" controlId="formRepassword">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupPrepend2">
              <i className="bi bi-key-fill"></i>
            </span>
          </div>
          <Form.Control type="password" placeholder="Repassword" />
        </div>
        <Form.Text className="text-danger">{message.repassword}{message.samePassword}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 input" controlId="formEmail">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupPrepend2">
              <i className="bi bi-envelope-fill"></i>
            </span>
          </div>
          <Form.Control type="email" placeholder="Email" />
        </div>
        <Form.Text className="text-danger">{message.email}</Form.Text>
      </Form.Group>
      <Button onClick={handleRegister} className="btn">Register</Button>
    </Container>
  );
}

export default Register;
