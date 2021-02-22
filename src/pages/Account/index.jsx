import { useCallback } from "react"
import NotificationManager from "react-notifications/lib/NotificationManager"
import { useHistory, useParams } from "react-router-dom"
import PageContainer from "../../components/PageContainer"
import useAccount from "../../hooks/useAccount"

const Account = () => {
  const { id } = useParams()
  const { account, deleteAccount } = useAccount(id)
  const history = useHistory()

  const onDeleteSuccess = useCallback(() => {
    NotificationManager.success("Delete successful")
    history.push("/")
  }, [history])

  const onDeleteError = useCallback((error) => {
    NotificationManager.error("Delete failed")
    console.error(error)
  }, [history])

  return account && !account.deleted ? (
    <PageContainer>
      <div className="container flex flex-col justify-start align-center gap-y-4">
        <div className="text-3xl font-bold w-full">
          {account?.displayName}
        </div>
        <div className="text-xl font-medium w-full">
          {account?.mailAddress}
        </div>
        <div className="text-base w-full border-t-2 pt-2">
          Username: {account?.username}
        </div>
        <div className="text-base w-full border-t-2 pt-2">
          In server type: {account?.inServerType}
        </div>
        <div className="text-base w-full">
          In server address: {account?.inServerAddress}:{account?.inServerPort}
        </div>
        <div className="text-base w-full border-t-2 pt-2">
          SMTP address: {account?.smtpAddress}:{account?.smtpPort}
        </div>
        <div className="flex flex-row gap-x-2 text-base font-medium w-full">
          <button className="w-full bg-red-500 rounded py-2 font-medium text-white text-center" onClick={deleteAccount(onDeleteSuccess, onDeleteError)}>
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

export default Account