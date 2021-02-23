import { axios } from "../axios"
import { useState, useCallback, useContext } from "react"
import { AccountContext } from "../contexts/accountContext"

const useOutgoingMessage = () => {
  const { selectedAccount } = useContext(AccountContext)
  const [recipient, setRecipient] = useState([])
  const [cc, setCc] = useState([])
  const [bcc, setBcc] = useState([])


  const sendEmail = useCallback((onSuccess, onError) => ({ subject, content, attachments }) => {
    const data = new FormData()
    data.append("account", selectedAccount?.id)
    data.append("subject", subject)
    data.append("content", content)
    for(var i = 0; i<attachments.length; i++){
      data.append("attachments", attachments[i], attachments[i].name)
    }
    data.append("to", recipient.map(r=>`<${r}>`).join(", "))
    data.append("cc", cc.map(r=>`<${r}>`).join(", "))
    data.append("bcc", bcc.map(r=>`<${r}>`).join(", "))
    axios.post("/message", data)
      .then(({ status }) => status === 200 && onSuccess())
      .catch(onError)
  }, [recipient, cc, bcc, selectedAccount])

  const addToRecipient = useCallback((address) => setRecipient(old => [...new Set([...old, address])]), [setRecipient])
  const addToCc = useCallback((address) => setCc(old => [...new Set([...old, address])]), [setCc])
  const addToBcc = useCallback((address) => setBcc(old => [...new Set([...old, address])]), [setBcc])

  const removeFromRecipient = useCallback((address) => setRecipient(old => old.filter(a => a !== address)), [setRecipient])
  const removeFromCc = useCallback((address) => setCc(old => old.filter(a => a !== address)), [setCc])
  const removeFromBcc = useCallback((address) => setBcc(old => old.filter(a => a !== address)), [setBcc])

  return { recipient, cc, bcc, addToRecipient, addToCc, addToBcc, removeFromRecipient, removeFromCc, removeFromBcc, sendEmail }
}

export default useOutgoingMessage