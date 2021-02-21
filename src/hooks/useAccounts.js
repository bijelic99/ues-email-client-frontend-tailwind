import { axios } from "../axios"
import { useEffect, useState } from "react"
import useUser from "./useUser"

const useAccounts = () => {
  const { isLoggedIn, user } = useUser()
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    if (isLoggedIn && user)
      axios.get(`/user/${user.id}/accounts`)
        .then(({ data }) => setAccounts(data))
        .catch(console.error)
  }, [isLoggedIn, user, setAccounts])

  return { accounts }
}

export default useAccounts