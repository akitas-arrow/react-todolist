import React from 'react'
import styled from 'styled-components'
import { Color } from './style'

const Button = ({children}) => {
  return (
    <Btn type="submit">
      {children}
    </Btn>
  )
}

const Btn = styled.button`
  box-sizing: border-box;
  cursor: pointer;
  color: ${Color.white};
  background-color: ${Color.main};
  padding: 4px 32px;
  border: 2px solid ${Color.main};
  transition: all 0.3s ease;
  display: block;
  margin: 48px auto 0;
  &:hover {
    color: ${Color.main};
    background-color: ${Color.white};
  }
`

export default Button
