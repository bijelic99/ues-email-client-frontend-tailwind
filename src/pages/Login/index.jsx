import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="container max-w-2xl shadow-lg mx-auto px-8 py-4 border rounded-md mt-16">
      <form className="flex flex-col">
        <label htmlFor="username">Username:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="password" name="password" id="password" />
        <Link className="text-sm text-blue-400 hover:text-gray-400" to="/register">Not a member yet? Register</Link>
        <input type="submit" className="my-2 h-8 bg-blue-500 font-semibold text-white rounded" value="Login" />
      </form>
    </div>
  )
}

export default Login