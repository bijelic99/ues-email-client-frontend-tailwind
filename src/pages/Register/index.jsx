import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { Link, useHistory } from "react-router-dom"
import useUser from "../../hooks/useUser"
import { NotificationManager } from 'react-notifications'
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"

const Register = () => {

  const schema = Joi.object({
    username: Joi.string().alphanum().max(64).required(),
    password: Joi.string().alphanum().max(64).required(),
    firstName: Joi.string().max(64).required(),
    lastName: Joi.string().max(64).required(),
  })

  const { register, handleSubmit } = useForm({
    resolver: joiResolver(schema)
  })
  const { register: registerFn } = useUser()
  const history = useHistory()

  const onRegisterSuccess = useCallback(() => {
    NotificationManager.success("Registration successful")
    history.push("/login")
  }, [history])

  const onRegisterError = useCallback((error) => {
    console.log(error)
    NotificationManager.error("Registration failed")
  }, [])
  return (
    <div className="container max-w-2xl shadow-lg mx-auto px-8 py-4 border rounded-md mt-16">
      <form className="flex flex-col" onSubmit={handleSubmit(registerFn(onRegisterSuccess, onRegisterError))}>

        <label htmlFor="username">Username:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="username" id="username" ref={register} />

        <label htmlFor="password">Password:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="password" name="password" id="password" ref={register} />

        <label htmlFor="firstName">Firstname:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="firstName" id="firstName" ref={register} />

        <label htmlFor="lastName">Lastname:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="lastName" id="lastName" ref={register} />

        <Link className="text-sm text-blue-400 hover:text-gray-400" to="/login">Already a member? Login</Link>

        <input type="submit" className="my-2 h-8 bg-blue-500 font-semibold text-white rounded disabled:opacity-50" value="Register"/>

      </form>
    </div>
  )
}

export default Register