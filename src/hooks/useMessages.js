import { useCallback, useContext, useEffect, useState } from "react"
import { axios } from "../axios"
import { AccountContext } from "../contexts/accountContext"
import { FolderContext } from "../contexts/folderContext"
import useUser from "./useUser"

const useMessages = () => {
  const { user } = useUser()
  const { selectedFolder, refreshedAt } = useContext(FolderContext)
  const { selectedAccount } = useContext(AccountContext)
  const [ messages, setMessages ] = useState([])
  const [ params, setParams ] = useState([])

  useEffect(()=>{
    axios.get(`/user/${user?.id}/messages`, {
      params: {
        ...params,
        parentFolder: selectedFolder?.id || undefined,
        account: selectedAccount?.id || undefined
      }
    })
    .then(({status, data})=>{
      if(status === 200) setMessages(data)
    })
    .catch(console.error)
    console.info(refreshedAt)
  }, [selectedFolder, refreshedAt, selectedAccount, params, setMessages])

  const setParamsCallback = useCallback((params)=>{
    setParams({
      subject: params?.subject || undefined,
      sender: params?.sender || undefined,
      recipient: params?.recipient || undefined,
      content: params?.content || undefined,
      attachment: params?.attachment || undefined
    })
  }, [setParams]) 


  return { messages, setParamsCallback }
}

export default useMessages