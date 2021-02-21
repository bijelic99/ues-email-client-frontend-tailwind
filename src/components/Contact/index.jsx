import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

const Contact = ({ contact }) => {
  return (
    <div className="mx-1 p-4 border rounded flex flex-col">
      <div className="font-semibold text-2xl border-b pb-1 mb-1">
        <Link to={`/contacts/${contact?.id}`}>
          {contact?.firstName} {contact?.lastName}
        </Link>
      </div>
      <div className="text-lg">{contact?.displayName}</div>
      <div className="text-base">{contact?.email}</div>
    </div>
  )
}

export default Contact