import React,{ useContext } from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router' //handleで遷移させる時に使用する
import { AuthContext } from './AuthProvider'

const Login = ({history}) => {
  const {login} = useContext(AuthContext)
  
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    login(email.value, password.value, history)
  }
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
      <Link to="/signup">登録</Link>
    </div>
  )
}

export default withRouter(Login)