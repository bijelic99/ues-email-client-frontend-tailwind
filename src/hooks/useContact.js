import { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { axios } from "../axios"
import useUser from "./useUser"

const useContact = (contactId) => {
  const {isLoggedIn, user} = useUser()
  const [contact, setContact] = useState()

  useEffect(()=>{
    if(contactId) {
      axios.get(`/contact/${contactId}`).then(({data, status})=>{
        if(status == 200) setContact(data)
      })
      .catch(console.error)
    }
  }, [setContact, contactId])

  const putContact = useCallback((onSucess, onError)=>({contactImage: contactImageList, ...contactInQuestion}) => {
    if(isLoggedIn && user){ 
      const formData = new FormData()
      formData.append("contact", JSON.stringify({ user: user.id, ...contactInQuestion, id: contactId  }))
      if(contactImageList.length > 0) {
        const image = contactImageList[0]
        formData.append("photo", image, image.name)
      }
      axios.request({
        method: contactId ? "PUT" : "POST",
        url: "/contact",
        data: formData
      }).then(({status}) =>{
        if(status === 200) onSucess()
        else onError(`Error, got ${status} code from server`)
      })
      .catch(onError)
    }
  }, [isLoggedIn, user, contactId])

  const deleteContact = useCallback((onSuccess, onError) => () => {
    if(contactId) axios
    .delete(`/contact/${contactId}`)
    .then(({data, status}) => {
      if(status === 200 && data) onSuccess()
      else onError(`Failed to delete contact, got ${status} code`) 
    })
    .catch(onError)
  }, [contactId])

  return { contact, deleteContact, putContact }
}

export default useContact