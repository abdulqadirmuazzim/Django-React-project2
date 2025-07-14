import React from 'react'
import Form from "../components/Form"

function Login() {
  return (
    <>
    <h3>Login Here!</h3>
    <Form route={"/api/token/"} method={"login"} />
    </>
  )
}

export default Login