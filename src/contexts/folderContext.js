import { useContext, useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { AccountContext } from "./accountContext"
import { axios } from "../axios"
import useUser from "../hooks/useUser"
import { useCallback } from "react"
import moment from "moment"

export const FolderContext = createContext()

export const FolderProvider = props => {
  const { user } = useUser()
  const { selectedAccount } = useContext(AccountContext)
  const [folders, setFolders] = useState([])
  const [selectedFolder, setSelectedFolder] = useState()
  const [refreshedAt, setRefreshedAt] = useState()
  const [childFolders, setChildFolders] = useState([])

  const refreshSelectedFolder = useCallback(() => {
    if (selectedFolder) {
      axios.get(`folder/${selectedFolder?.id}/refresh`)
        .then(({ status }) => {
          if (status === 200) {
            setRefreshedAt(moment.now())
          }
        })
        .catch(console.error)
    }
  }, [selectedFolder, setRefreshedAt])

  useEffect(() => {
    axios.get(selectedAccount ? `/account/${selectedAccount?.id}/folders` : `/user/${user.id}/folders`)
      .then(({ status, data }) => status === 200 && setFolders(data))
      .catch(console.error)
  }, [selectedAccount, setFolders])

  useEffect(() => {
    if (selectedFolder) {
      axios.get(`/folder/${selectedFolder?.id}/childFolders`)
        .then(({ status, data }) => status === 200 && setChildFolders(data))
        .catch(console.error)
    }
    console.info(refreshedAt)
  }, [selectedFolder, refreshedAt, setChildFolders])

  const setSelectedFolderFromChildrenCallback = useCallback((folderId)=>()=>folderId && setSelectedFolder(childFolders.find(f=>f.id === folderId)), [childFolders, setSelectedFolder])

  return (
    <FolderContext.Provider value={{ folders, selectedFolder, setSelectedFolder, childFolders, refreshSelectedFolder, refreshedAt, setSelectedFolderFromChildrenCallback }}>
      {
        props.children
      }
    </FolderContext.Provider>
  )
}

