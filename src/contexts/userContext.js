import { useState } from "react"
import { createContext } from "react"

export const UserContext = createContext()

export const UserProvider = props => {
  const [user, setUser] = useState({id: 1})
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
      {
        props.children
      }
    </UserContext.Provider>
  )
}

