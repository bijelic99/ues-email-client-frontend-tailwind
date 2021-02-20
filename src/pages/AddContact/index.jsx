import { useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { NotificationManager } from 'react-notifications'
import { useCallback } from "react/cjs/react.development"
import { useHistory } from "react-router-dom"
import useContacts from "../../hooks/useContacts"

const AddContact = () => {

  const history = useHistory()
  const {
    addContact
  } = useContacts()

  const schema = Joi.object({
    firstName: Joi.string().max(64),
    lastName: Joi.string().max(64),
    displayName: Joi.string().max(64),
    email: Joi.string().email({tlds: false}),
    note: Joi.string().max(1024),
    contactImage: Joi.object()
  })

  const { register, handleSubmit } = useForm({
    resolver: joiResolver(schema)
  })

  const onInsertSuccess = useCallback(() => {
    NotificationManager.success("Added new contact")
    history.push("/")
  }, [history])

  const onInsertError = useCallback((error) => {
    console.log(error)
    NotificationManager.error("Failed to add contact")
  }, [])


  return (
    <div className="container max-w-2xl shadow-lg mx-auto px-8 py-4 border rounded-md mt-16">
      <form className="flex flex-col" onSubmit={handleSubmit(addContact(onInsertSuccess, onInsertError))}>

        <label htmlFor="firstName">Firstname:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="firstName" id="firstName" ref={register} />

        <label htmlFor="lastName">Lastname:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="lastName" id="lastName" ref={register} />

        <label htmlFor="displayName">Displayname:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="text" name="displayName" id="displayName" ref={register} />

        <label htmlFor="email">Email:</label>
        <input className="p-2 border-2 rounded h-8 mb-2" type="email" name="email" id="email" ref={register} />

        <label htmlFor="note">Note:</label>
        <textarea className="p-2 border-2 rounded mb-2" name="note" id="note" rows={5} ref={register}/>

        <label htmlFor="contactImage">Contact image:</label>
        <input type="file" name="contactImage" accept="image/jpeg, image/png" id="contactImage" className="my-2 h-8 font-semibold" ref={register} />

        <input type="submit" className="my-2 h-8 bg-blue-500 font-semibold text-white rounded disabled:opacity-50" value="Add contact"/>

      </form>
    </div>
  )
}

export default AddContact