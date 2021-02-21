import { useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { NotificationManager } from 'react-notifications'
import { useCallback } from "react"
import { useHistory, useParams } from "react-router-dom"
import useContact from "../../hooks/useContact"
import { useEffect } from "react"
import FormContainer from "../../components/FormContainer"

const AddContact = () => {

  const history = useHistory()
  const { id } = useParams()
  const {
    contact,
    putContact
  } = useContact(id)

  const schema = Joi.object({
    firstName: Joi.string().max(64),
    lastName: Joi.string().max(64),
    displayName: Joi.string().max(64),
    email: Joi.string().email({ tlds: false }),
    note: Joi.string().max(1024),
    contactImage: Joi.object()
  })

  const { register, handleSubmit, setValue } = useForm({
    resolver: joiResolver(schema)
  })

  const onInsertSuccess = useCallback(() => {
    NotificationManager.success(`${id ? "Changed" : "Added new"} contact`)
    history.push("/")
  }, [history])

  const onInsertError = useCallback((error) => {
    console.log(error)
    NotificationManager.error(`Failed to ${id ? "change" : "add"} contact`)
  }, [])

  useEffect(() => {
    if (id && contact) {
      setValue("firstName", contact?.firstName)
      setValue("lastName", contact?.lastName)
      setValue("displayName", contact?.displayName)
      setValue("email", contact?.email)
      setValue("note", contact?.note)
    }
  }, [id, contact, setValue])

  return (
    <FormContainer>
      <div className="font-bold text-2xl">Contact</div>
      <form className="flex flex-col" onSubmit={handleSubmit(putContact(onInsertSuccess, onInsertError))}>

        <label htmlFor="firstName">Firstname:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="firstName" id="firstName" ref={register} />

        <label htmlFor="lastName">Lastname:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="lastName" id="lastName" ref={register} />

        <label htmlFor="displayName">Displayname:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="displayName" id="displayName" ref={register} />

        <label htmlFor="email">Email:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="email" name="email" id="email" ref={register} />

        <label htmlFor="note">Note:</label>
        <textarea className="p-2 border-2 rounded mb-2" name="note" id="note" rows={5} ref={register} />

        <label htmlFor="contactImage">Contact image:</label>
        <input type="file" name="contactImage" accept="image/jpeg, image/png" id="contactImage" className="my-2 h-8 font-semibold" ref={register} />

        <input type="submit" className="my-2 h-8 bg-blue-500 font-semibold text-white rounded disabled:opacity-50" value={id ? "Change contact" : "Add contact"} />

      </form>
    </FormContainer>
  )
}

export default AddContact