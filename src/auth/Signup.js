import React,{ useContext } from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router' //handleで遷移させる時に使用する
import { AuthContext } from './AuthProvider'
import Button from '../components/shared/Button'
import Container from '../components/shared/Container'
import Input from '../components/shared/Input'
import Label from '../components/shared/Label'
import H1 from '../components/shared/H1'

const Signup = ({history}) => {
  const {signup} = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signup(email.value, password.value, history)
  }
  return (
    <Container>
      <H1>新規登録</H1>
      <p>
        登録済みの方は<Link to="/login">ログイン</Link>へ
      </p>
      <form onSubmit={handleSubmit}>
        <Label pt="40px">
          メールアドレス
          <Input　type="email" />
        </Label>
        <Label pt="24px">
          パスワード
          <Input type="password" />
        </Label>
        <Button type="submit">新規登録</Button>
      </form>
    </Container>
  )
}

export default withRouter(Signup)