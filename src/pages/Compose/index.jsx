import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { useForm } from "react-hook-form"
import PageContainer from "../../components/PageContainer"
import useOutgoingMessage from "../../hooks/useOutgoingMessage"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import { useCallback } from "react"

const Compose = () => {
  const {
    recipient,
    cc,
    bcc,
    addToTo,
    addToCc,
    addToBcc,
    
    removeFromCc,
    removeFromBcc,
    sendEmail
  } = useOutgoingMessage()

  const schema = Joi.object({

  })

  const addressOnlySchema = useCallback((fieldName) => {
    const obj = {}
    obj[fieldName] = Joi.string()
    return Joi.object(obj)
  }, [])


  const { } = useForm({
    resolver: joiResolver(schema)
  })

  const { register: registerTo, handleSubmit: handleSubmitTo } = useForm({
    resolver: joiResolver(addressOnlySchema("to"))
  })

  const { register: registerCc, handleSubmit: handleSubmitCc } = useForm({
    resolver: joiResolver(addressOnlySchema("cc"))
  })

  const { register: registerBcc, handleSubmit: handleSubmitBcc } = useForm({
    resolver: joiResolver(addressOnlySchema("bcc"))
  })

  const addToRecipientField = useCallback((fieldName) => (data) => {
    switch (fieldName) {
      case "to":
        addToTo(data[fieldName])
        console.log(data[fieldName])
        break;
    
      default:
        break;
    }
  }, [addToTo])

  useEffect(()=>console.log("useEffect", recipient), [recipient])

  return (
    <PageContainer>
      <div className="flex flex-col gap-y-2">
        <div className="font-semibold text-base border-b-2 pb-2">
          <form className="flex flex-row content-center" onSubmit={handleSubmitTo(addToRecipientField("to"))}>
            <label htmlFor="to">To:</label>
            <input className="mx-1 border rounded p-1" type="text" name="to" id="to" ref={registerTo} />
            <input className="py-1 px-2" type="submit" value="Add" />
            <div className="flex-grow mr-2 flex flex-row gap-x-1">{
              recipient.map((t, i) => (
                <button onClick={console.log} key={i}>{t}</button>
              ))
            }</div>
          </form>
        </div>
        <div className="font-semibold text-lg border-b-2 pb-2">

        </div>
        <div className="font-semibold text-lg border-b-2 pb-2">

        </div>
        <div className="font-semibold text-base border-b-2 pb-2">

        </div>
        <div className="font-semibold text-base border-b-2 pb-2">

        </div>
        <div className="font-semibold text-base border-b-2 pb-2">

        </div>
        <div className="font-semibold text-base border-b-2 pb-2">

        </div>
        <div className="font-semibold text-base border-b-2 pb-2">

        </div>
        <div className="font-semibold text-base border-b-2 pb-2 overflow-x-auto">

        </div>
        <div className="font-semibold text-base border-b-2 border-l-2 border-r-2 rounded p-2">

        </div>
      </div>
    </PageContainer>
  )
}

export default Compose