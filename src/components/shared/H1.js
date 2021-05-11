import React from 'react'
import styled from 'styled-components'

const H1 = ({children}) => {
  return (
    <Text>
      {children}
    </Text>
  )
}

const Text = styled.h1`
  padding-top: 72px;
  padding-bottom: 24px;
  font-size: 24px;
`

export default H1
