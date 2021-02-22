import { useState, useCallback, useContext } from "react"
import { AccountContext } from "../contexts/accountContext"

const useOutgoingMessage = () => {
  const { selectedAccount } = useContext(AccountContext)
  const [recipient, setRecipient] = useState([])
  const [cc, setCc] = useState([])
  const [bcc, setBcc] = useState([])


  const sendEmail = useCallback((onSuccess, onError) => (data) => {

  }, [recipient, cc, bcc, selectedAccount])

  const addToRecipient = useCallback((fieldName) => data => {

  }, [setRecipient, setCc, setBcc])

  const addToTo = useCallback((address) => {
    console.log(recipient, address)
    setRecipient(recipient.concat([address]))
  }, [setRecipient, recipient])
  const addToCc = useCallback((address) => setCc([...cc, address || undefined]), [setCc, cc])
  const addToBcc = useCallback((address) => setBcc([...bcc, address || undefined]), [setBcc, bcc])

  //const removeFromRecipient = useCallback((address) => setRecipient(to.filter(x => x !== address)), [setRecipient, recipient])
  const removeFromCc = useCallback((address) => setCc(cc.filter(x => x !== address)), [setCc, cc])
  const removeFromBcc = useCallback((address) => setBcc(bcc.filter(x => x !== address)), [setBcc, bcc])

  return { recipient, cc, bcc, addToTo, addToCc, addToBcc, /*removeFromTo*/ removeFromCc, removeFromBcc, sendEmail }
}

export default useOutgoingMessage