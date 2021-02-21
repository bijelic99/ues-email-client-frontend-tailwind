import { useCallback } from "react"
import { useMemo } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import PageContainer from "../../components/PageContainer"
import useContact from "../../hooks/useContact"
import { NotificationManager } from 'react-notifications'

const Contact = () => {
  const { id } = useParams()
  const { contact, deleteContact } = useContact(id)
  const history = useHistory()

  const photoId = useMemo(() => contact ? contact.photos[0]?.id : null, [contact])

  const onDeleteSuccess = useCallback(() => {
    NotificationManager.success("Delete successful")
    history.push("/")
  }, [history])

  const onDeleteError = useCallback((error) => {
    NotificationManager.error("Delete failed")
    console.error(error)
  }, [history])

  return contact && !contact.deleted ? (
    <PageContainer>
      <div className="container flex flex-col justify-center align-center bg-gray-200 mb-6">
        <img className="object-contain h-64 w-full" src={`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/contact/photo/${photoId}`} alt="profile-image" />
      </div>
      <div className="container flex flex-col justify-start align-center pt-4 border-t-2 gap-y-4">
        <div className="text-3xl font-bold w-full">
          {contact?.firstName} {contact?.lastName}
        </div>
        <div className="text-xl font-semibold w-full">
          {contact?.displayName}
        </div>
        <div className="text-lg font-medium w-full">
          {contact?.email}
        </div>
        <div className="text-lg font-medium w-full border-t-2 border-b-2 py-2">
          {contact?.note}
        </div>
        <div className="flex flex-row gap-x-2 text-base font-medium w-full">
          <Link className="w-full bg-green-500 rounded py-2 font-medium text-white text-center" to={`/edit-contact/${contact.id}`}>
            Edit
          </Link>
          <button className="w-full bg-red-500 rounded py-2 font-medium text-white text-center" onClick={deleteContact(onDeleteSuccess, onDeleteError)}>
            Delete
          </button>
        </div>
      </div>
    </PageContainer>
  ) : (
      <PageContainer>
        <div className="font-medium text-xl">Loading ...</div>
      </PageContainer>
    )
}

export default Contact