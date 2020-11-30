import React from 'react';
import axios from 'axios';
import { UserContext } from './Context';

function Login() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const [error, setError] = React.useState();
  const { setUser } = React.useContext(UserContext);

  async function handleSubmit() {
    try {
      console.log({ username, password });
      await axios.post('/login', { username, password });
      const res = await axios.get('/user');
      setUser(res.data);
    } catch (err) {
      console.log({ err });
      setError(err);
    }
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
