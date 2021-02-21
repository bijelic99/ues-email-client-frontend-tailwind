import { useState } from "react"
import { createContext } from "react"
import useAccounts from "../hooks/useAccounts"

export const AccountContext = createContext()

export const AccountProvider = props => {
  const { accounts } = useAccounts()
  const [ selectedAccount, setSelectedAccount ] = useState()

  return (
    <AccountContext.Provider value={{selectedAccount, accounts, setSelectedAccount}}>
      {
        props.children
      }
    </AccountContext.Provider>
  )
}

