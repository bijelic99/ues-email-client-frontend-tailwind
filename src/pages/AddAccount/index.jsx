import FormContainer from "../../components/FormContainer"
import { useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { NotificationManager } from 'react-notifications'
import { useHistory } from "react-router-dom"
import useAccount from "../../hooks/useAccount"
import { useCallback } from "react"

const AddAccount = () => {
  const history = useHistory()
  const { addAccount } = useAccount()

  const schema = Joi.object({
    smtpAddress: Joi.string().required().max(128),
    smtpPort: Joi.number().required(),
    inServerType: Joi.string().required(),
    inServerAddress: Joi.string().required().max(128),
    inServerPort: Joi.number().required(),
    username: Joi.string().required().max(128),
    password: Joi.string().required().max(128),
    mailAddress: Joi.string().email({ tlds: false }).required(),
    displayName: Joi.string().required().max(128),
  })

  const { register, handleSubmit } = useForm({
    resolver: joiResolver(schema)
  })

  
  const onInsertSuccess = useCallback(() => {
    NotificationManager.success(`Added new account`)
    history.push("/")
  }, [history])

  const onInsertError = useCallback((error) => {
    console.log(error)
    NotificationManager.error(`Failed to add account`)
  }, [])

  return (
    <FormContainer>
      <div className="font-bold text-2xl">Account</div>
      <form className="flex flex-col" onSubmit={handleSubmit(addAccount(onInsertSuccess, onInsertError))}>

        <label htmlFor="smtpAddress">SMTP address:</label>
        <input type="text" name="smtpAddress" id="smtpAddress" className="p-2 border-2 rounded h-8 mb-2" ref={register} />
        
        <label htmlFor="smtpPort">SMTP port:</label>
        <input type="number" name="smtpPort" id="smtpPort" className="p-2 border-2 rounded h-8 mb-2" ref={register} />
        
        <label htmlFor="inServerType">In server type:</label>
        <select className="p-2 border-2 rounded mb-2" id="inServerType" name="inServerType" defaultValue="" ref={register} >
          <option value="" hidden>Choose a server type</option>
          <option value="POP3">POP3</option>
          <option value="IMAP">IMAP</option>
        </select>
        
        <label htmlFor="inServerAddress">In server address:</label>
        <input type="text" name="inServerAddress" id="inServerAddress" className="p-2 border-2 rounded h-8 mb-2" ref={register} />
        
        <label htmlFor="inServerPort">In server port:</label>
        <input type="number" name="inServerPort" id="inServerPort" className="p-2 border-2 rounded h-8 mb-2" ref={register} />
        
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" className="p-2 border-2 rounded h-8 mb-2" ref={register} />
        
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" className="p-2 border-2 rounded h-8 mb-2" ref={register} />
        
        <label htmlFor="mailAddress">Mail address</label>
        <input type="email" name="mailAddress" id="mailAddress" className="p-2 border-2 rounded h-8 mb-2" ref={register} />
        
        <label htmlFor="displayName">Display name</label>
        <input type="text" name="displayName" id="displayName" className="p-2 border-2 rounded h-8 mb-2" ref={register} />

        <input type="submit" className="my-2 h-8 bg-blue-500 font-semibold text-white rounded disabled:opacity-50" value="Add account" />

      </form>
    </FormContainer>
  )
}

export default AddAccount