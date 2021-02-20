import PageContainer from "../../components/PageContainer"
import Contact from "../../components/Contact"
import { useForm } from "react-hook-form"
import useContacts from "../../hooks/useContacts"

const Contacts = () => {

  const { register, handleSubmit } = useForm()
  const { setTerms, contacts } = useContacts()

  return (
    <PageContainer>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit(setTerms)}>
          <input className="p-2 border-2 rounded h-10 mb-2 w-full" placeholder="Firstname" type="text" name="firstName" id="firstName" ref={register} />
          <input className="p-2 border-2 rounded h-10 mb-2 w-full" placeholder="Lastname" type="text" name="lastName" id="lastName" ref={register} />
          <input className="p-2 border-2 rounded h-10 mb-2 w-full" placeholder="Note" type="text" name="note" id="note" ref={register} />
          <input className="p-2 border-2 rounded h-10 mb-2 w-full bg-blue-500 text-white font-semibold" type="submit" value="Search" />
        </form>
      </div>
      <div className="flex flex-col gap-y-2 border-t-2 pt-2">
        {
          contacts.map(contact => (<Contact key={contact.id} contact={contact} />))
        }
      </div>
    </PageContainer>
  )
}

export default Contacts