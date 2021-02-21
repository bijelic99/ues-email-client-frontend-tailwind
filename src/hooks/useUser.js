import { useContext } from "react"
import { useCallback } from "react"
import { UserContext } from "../contexts/userContext"
import { axios } from "../axios"

const useUser = () => {
  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn
  } = useContext(UserContext)

  const login = useCallback((username, password)=>{},[])
  const logout = useCallback(()=>{},[])
  const register = useCallback((onSuccess, onError) => user =>{
    axios
    .post(`/user/register`, user)
    .then(({status})=>{
      if(status === 200) onSuccess()
      else onError(`Server returned ${status} code`)
    })
    .catch(onError)
  })

  return {
    user,
    isLoggedIn,
    login,
    logout,
    register
  }
}

export default useUser