import React from "react"
import styled from 'styled-components'

const StyledDiv = styled.div`
  border: ${props => props.isError ? '2px solid red' : '2px solid green'};
  background: rgb(230, 230, 230);
  color: ${props => props.isError ? 'red' : 'green'};
  font-size: 1.3rem;
  padding: 5px;
  border-radius: 5px;
  margin: 5px auto;
`

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <StyledDiv className="notification" isError={isError}>
      {message}
    </StyledDiv>
  )
}

export default Notification