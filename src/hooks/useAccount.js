import { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { axios } from "../axios"
import useUser from "./useUser"

const useAccount = (accountId) => {
  const {isLoggedIn, user} = useUser()
  const [ account, setAccount ] = useState()

  useEffect(()=>{
    if(isLoggedIn && accountId) {
      axios.get(`/account/${accountId}`)
      .then(({status, data})=>{
        if(status === 200) setAccount(data)
      })
      .catch(console.error)
    }
  }, [accountId, isLoggedIn, setAccount])
  
  const addAccount = useCallback((onSuccess, onError) => (newAccount) => {
    if(isLoggedIn && user)
      axios.post("/account", {user: user.id, ...newAccount})
      .then(({status}) => {
        if(status === 200) onSuccess()
        else onError(`Failed to add account, got ${status} code`)
      })
      .catch(onError)
  },[isLoggedIn, user])

  const deleteAccount = useCallback((onSuccess, onError) => () => {
    if(isLoggedIn && user)
      axios.delete(`/account/${accountId}`)
      .then(({status}) => {
        if(status === 200) onSuccess()
        else onError(`Failed to delete account, got ${status} code`)
      })
      .catch(onError)
  }, [accountId] )

  return { account, addAccount, deleteAccount }
}

export default useAccount