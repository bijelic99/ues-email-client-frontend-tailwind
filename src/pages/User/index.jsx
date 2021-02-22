import { Link, useParams } from "react-router-dom"
import PageContainer from "../../components/PageContainer"
import useAccounts from "../../hooks/useAccounts"

const User = () => {
  const { id } = useParams()
  const { accounts } = useAccounts()

  return (
    <PageContainer>
      <div className="flex flex-col gap-y-4">
        <div className="font-medium text-2xl">Accounts</div>
        { accounts?.map(account => (
          <Link to={`/account/${account.id}`} className="text-blue-500">
            {account?.displayName || account?.email}
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}

export default User