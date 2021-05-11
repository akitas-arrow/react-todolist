import React from 'react'
import styled from 'styled-components'
import {Color} from './style'

const Input = ({type}) => {
  return (
    <Field name={type} type={type} placeholder={type} />
  )
}

const Field = styled.input`
  width: 100%;
  border: 2px solid #b3b3b3;
  border-radius: 5px;
  outline: none;
  &:focus {
    border-color: ${Color.main};
  }
`

export default Input
