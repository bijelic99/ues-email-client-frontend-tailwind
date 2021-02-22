import { Link } from "react-router-dom"
import useUser from "../../hooks/useUser"

const Navbar = () => {
  const {
    isLoggedIn,
    user
  } = useUser()

  return isLoggedIn && (
    <div className="w-screen border shadow-md py-2 px-8 flex flex-row align-middle gap-2 mb-4">
      <h1 className="text-xl font-semibold mr-4">
        <Link to="/">
          Email client
        </Link>
      </h1>
      <div className="flex flex-row flex-grow">
        <div className="font-medium px-2 py-1 rounded hover:bg-gray-300">
          <Link to="/">
            Inbox
          </Link>
        </div>
        <div className="font-medium px-2 py-1 rounded hover:bg-gray-300">
          <Link to="/compose">
            Compose
          </Link>
        </div>
        <div className="font-medium px-2 py-1 rounded hover:bg-gray-300">
          <Link to="/add-contact">
            Add contact
          </Link>
        </div>
        <div className="font-medium px-2 py-1 rounded hover:bg-gray-300">
          <Link to="/contacts">
            Contacts
          </Link>
        </div>
        <div className="font-medium px-2 py-1 rounded hover:bg-gray-300">
          <Link to="/add-account">
            Add account
          </Link>
        </div>
        <div className="font-medium px-2 py-1 rounded hover:bg-gray-300">
          <Link to="/login">
            Login
          </Link>
        </div>
        <div className="font-medium px-2 py-1 rounded hover:bg-gray-300">
          <Link to="/register">
            Register
          </Link>
        </div>
      </div>
      <div className="font-medium px-2 py-1">
        <Link to={`/user/${user.id}`}>
          User
        </Link>
      </div>
      <div className="font-medium px-2 py-1">
        <Link to="/">
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Navbar