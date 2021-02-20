import { useCallback, useState } from "react"
import useUser from "./useUser"
import { axios } from "../axios"
import { useEffect } from "react/cjs/react.development"

const useContacts = () => {
  const {isLoggedIn, user} = useUser()
  const [terms, setTerms] = useState({})
  const [contacts, setContacts] = useState([])

  useEffect(()=>{
    if(isLoggedIn && user) {
      axios.get(`/user/${user.id}/contacts`, {
        params: {
          firstName: terms.firstName || undefined,
          lastName: terms.lastName || undefined,
          note: terms.note || undefined
        }
      })
      .then(({data})=>{
        setContacts(data)
      })
      .catch(err=>{
        console.error(err)
        setContacts([])
      })
    }
  }, [terms, isLoggedIn, user, setContacts])

  const addContact = useCallback((onSucess, onError)=>({contactImage: contactImageList, ...contact}) => {
    if(isLoggedIn && user){
      const formData = new FormData()
      formData.append("contact", JSON.stringify({ user: user.id, ...contact }))
      if(contactImageList.length > 0) {
        const image = contactImageList[0]
        formData.append("photo", image, image.name)
      }
      axios.post("/contact", formData).then(({status}) =>{
        if(status === 200) onSucess()
        else onError(`Error, got ${status} code from server`)
      })
      .catch(onError)
    }
  }, [isLoggedIn, user])

  return {addContact, setTerms, contacts}
}

export default useContacts