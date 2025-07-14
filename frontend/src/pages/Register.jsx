import React from 'react'
import Form from '../components/form'

function Register() {
  return (
    <>
    <h3>Register Here</h3>
    <Form route={"/api/create_user/"} method="register" />
    </>
  )
}

export default Register