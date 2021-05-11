import React from 'react'
import styled from 'styled-components'

const Label = ({children, pt}) => {
  return (
    <Wrapper pt={pt}>
      <label>
        { children }
      </label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: ${props => props.pt || '0'};
  label {
    font-size: 14px;
  }
`

export default Label
