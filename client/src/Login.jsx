import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Login() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();

  async function handleSubmit() {
    try {
      console.log({ username, password });
      const res = await axios.post('/login', { username, password });
      if (res) {
        setSuccess(true);
      }
    } catch (err) {
      console.log({ err });
      setError(err);
    }
  }

  if (success) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
      <p>{error && 'Invalid username or password'}</p>
    </div>
  );
}

export default Login;
