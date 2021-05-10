import React,{ useContext } from 'react'
import { withRouter } from 'react-router' //handleで遷移させる時に使用する
import { AuthContext } from './AuthProvider'

const Signup = ({history}) => {
  const {signup} = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signup(email.value, password.value, history)
  }
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default withRouter(Signup)