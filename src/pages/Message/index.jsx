import { useParams } from "react-router-dom"
import PageContainer from "../../components/PageContainer"
import useMessage from "../../hooks/useMessage"
import moment from "moment"

const Message = () => {
  const { id } = useParams()
  const { message } = useMessage(id)

  return id && message && !message?.deleted ? (
    <PageContainer>
      <div className="flex flex-col gap-y-2">
        <div className="font-bold text-2xl border-b-2 pb-2">
          {message?.subject}
        </div>
        <div className="font-semibold text-lg border-b-2 pb-2">
          From: {message?.from}
        </div>
        <div className="font-semibold text-lg border-b-2 pb-2">
          To: {message?.to}
        </div>
        <div className="font-semibold text-base border-b-2 pb-2">
          CC: {message?.cc}
        </div>
        <div className="font-semibold text-base border-b-2 pb-2">
          BCC: {message?.bcc}
        </div>
        <div className="font-semibold text-base border-b-2 pb-2">
          Time: {
            moment(message?.dateTime).toString()
          }
        </div>
        <div className="font-semibold text-base border-b-2 pb-2">
          Tags: {
            message?.tags.join(", ")
          }
        </div>
        <div className="font-semibold text-base border-b-2 pb-2">
          Read: {
            message?.unread ? "yes" : "no"
          }
        </div>
        <div className="font-semibold text-base border-b-2 pb-2 overflow-x-auto">
          Attachments: {
            message?.attachments?.map(attachment => (
              <a className="text-blue-500 pr-1" key={attachment.id} href={`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/attachment/${attachment?.id}`} target="_blank">{attachment?.name}</a>
            ))
          }
        </div>
        <div className="font-normal text-base border-b-2 border-l-2 border-r-2 rounded p-2">
          {
            message?.content
          }
        </div>
      </div>
    </PageContainer>
  )
    : (
      <PageContainer>
        <div className="font-medium text-xl">Loading ...</div>
      </PageContainer>
    )
}

export default Message