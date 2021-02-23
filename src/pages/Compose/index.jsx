import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { useForm } from "react-hook-form"
import PageContainer from "../../components/PageContainer"
import useOutgoingMessage from "../../hooks/useOutgoingMessage"
import { Link, useHistory } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import { useCallback } from "react"
import { NotificationManager } from "react-notifications"

const Compose = () => {
  const history = useHistory()
  const {
    recipient,
    cc,
    bcc,
    addToRecipient,
    addToCc,
    addToBcc,
    removeFromRecipient,
    removeFromCc,
    removeFromBcc,
    sendEmail
  } = useOutgoingMessage()

  const schema = Joi.object({
    subject: Joi.string().required().max(1024),
    attachments: Joi.object().optional(),
    content: Joi.string().required().max(1024)
  })

  const addressOnlySchema = useCallback((fieldName) => {
    const obj = {}
    obj[fieldName] = Joi.string().email({ tlds: false }).required()
    return Joi.object(obj)
  }, [])


  const { register, handleSubmit } = useForm({
    resolver: joiResolver(schema)
  })

  const { register: registerTo, handleSubmit: handleSubmitTo } = useForm({
    resolver: joiResolver(addressOnlySchema("recipient"))
  })

  const { register: registerCc, handleSubmit: handleSubmitCc } = useForm({
    resolver: joiResolver(addressOnlySchema("cc"))
  })

  const { register: registerBcc, handleSubmit: handleSubmitBcc } = useForm({
    resolver: joiResolver(addressOnlySchema("bcc"))
  })

  const addToRecipientField = useCallback((addFn, fieldName) => (data) => addFn(data[fieldName]), [])
  const removeFromRecipientField = useCallback((removeFn, value) => () => removeFn(value), [])

  const onSuccess = useCallback(() => {
    NotificationManager.success("Mail sent")
    history.push("/")
  }, [history])

  const onError = useCallback((err) => {
    NotificationManager.error("Mail send failed")
    console.error(err)
  }, [history])

  return (
    <PageContainer>
      <div className="flex flex-col gap-y-2">
        <div className="font-semibold text-base border-b-2 pb-2">
          <form className="grid grid-cols-8 gap-x-2 content-center" onSubmit={handleSubmitTo(addToRecipientField(addToRecipient, "recipient"))}>
            <label htmlFor="recipient">To:</label>
            <input className="col-span-2 border rounded p-1" type="mail" name="recipient" id="recipient" ref={registerTo} />
            <input className="py-1 px-2" type="submit" value="Add" />
            <div className="col-span-4 flex flex-row gap-x-1">{
              recipient.map((t, i) => (
                <button onClick={removeFromRecipientField(removeFromRecipient, t)} key={i}>{t}</button>
              ))
            }</div>
          </form>
        </div>
        <div className="font-semibold text-lg border-b-2 pb-2">
          <form className="grid grid-cols-8 gap-x-2 content-center" onSubmit={handleSubmitCc(addToRecipientField(addToCc, "cc"))}>
            <label htmlFor="cc">Cc:</label>
            <input className="col-span-2 border rounded p-1" type="mail" name="cc" id="cc" ref={registerCc} />
            <input className="py-1 px-2" type="submit" value="Add" />
            <div className="col-span-4 flex flex-row gap-x-1">{
              cc.map((t, i) => (
                <button onClick={removeFromRecipientField(removeFromCc, t)} key={i}>{t}</button>
              ))
            }</div>
          </form>
        </div>
        <div className="font-semibold text-lg border-b-2 pb-2">
          <form className="grid grid-cols-8 gap-x-2 content-center" onSubmit={handleSubmitBcc(addToRecipientField(addToBcc, "bcc"))}>
            <label htmlFor="cc">Bcc:</label>
            <input className="col-span-2 border rounded p-1" type="mail" name="bcc" id="bcc" ref={registerBcc} />
            <input className="py-1 px-2" type="submit" value="Add" />
            <div className="col-span-4 flex flex-row gap-x-1">{
              bcc.map((t, i) => (
                <button onClick={removeFromRecipientField(removeFromBcc, t)} key={i}>{t}</button>
              ))
            }</div>
          </form>
        </div>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(sendEmail(onSuccess, onError))}>
          <div className="flex flex-col font-semibold text-base">
            <label htmlFor="subject">Subject:</label>
            <input type="text" name="subject" id="subject" className="border rounded p-1" ref={register} />
          </div>
          <div className="flex flex-col font-semibold text-base">
            <label htmlFor="attachments">Attachments</label>
            <input type="file" multiple name="attachments" id="attachments" ref={register} />
          </div>
          <div className="flex flex-col font-semibold text-base">
            <label htmlFor="content">Content: </label>
            <textarea className="border-2 rounded p-1" name="content" id="content" cols="30" rows="10" ref={register} />
          </div>
          <div className="font-semibold text-base border-b-2 pb-2">
            <input className="bg-blue-500 text-white font-medium px-4 py-2 w-full" type="submit" value="Send" />
          </div>
        </form>
      </div>
    </PageContainer>
  )
}

export default Compose