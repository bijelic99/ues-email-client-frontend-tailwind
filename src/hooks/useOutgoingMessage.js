import { useState } from "react"
import { useCallback } from "react"
import { useContext } from "react"
import { AccountContext } from "../contexts/accountContext"

const useOutgoingMessage = () => {
  const { selectedAccount } = useContext(AccountContext)
  const [to, setTo] = useState(["rasa"])
  const [cc, setCc] = useState([])
  const [bcc, setBcc] = useState([])


  const sendEmail = useCallback((onSuccess, onError) => (data) => {

  }, [to, cc, bcc, selectedAccount])

  const addToTo = useCallback((address) => {
    console.log(to, address)
    setTo(to.concat([address]))
  }, [setTo, to])
  const addToCc = useCallback((address) => setCc([...cc, address || undefined]), [setCc, cc])
  const addToBcc = useCallback((address) => setBcc([...bcc, address || undefined]), [setBcc, bcc])

  const removeFromTo = useCallback((address) => setTo(to.filter(x => x !== address)), [setTo, to])
  const removeFromCc = useCallback((address) => setCc(cc.filter(x => x !== address)), [setCc, cc])
  const removeFromBcc = useCallback((address) => setBcc(bcc.filter(x => x !== address)), [setBcc, bcc])

  return { to, cc, bcc, addToTo, addToCc, addToBcc, removeFromTo, removeFromCc, removeFromBcc, sendEmail }
}

export default useOutgoingMessage