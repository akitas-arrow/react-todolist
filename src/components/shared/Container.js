import React from 'react'
import styled from 'styled-components'

const Container = ({children}) => {
  return (
    <Ctn>
      {children}
    </Ctn>
  )
}

const Ctn = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Container
