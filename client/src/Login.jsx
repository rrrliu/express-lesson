import React from 'react';

function Login() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  function handleSubmit() {
    console.log({ username, password });
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
    </div>
  );
}

export default Login;
