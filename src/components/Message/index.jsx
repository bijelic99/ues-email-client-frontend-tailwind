import { Link } from "react-router-dom"

const Message = ({ message }) => {
  return (
    <div className="w-full border shadow-md p-2 flex flex-col">
      <div className="border-b mb-2 pb-2 font-semibold text-lg">
        <Link to={`/message/${message?.id}`}>
          {message?.subject}
        </Link>
      </div>
      <div className="border-b mb-2 pb-2 font-medium text-sm">
        {message?.from}
      </div>
      <div className="font-light text-sm max-h-16 overflow-hidden text-justify max-w-4xl">
        {message?.abstractText}
      </div>
      {
        message?.attachments?.map(attachment => attachment?.metadata?.content && (
          <div key={attachment.id} className="font-light text-xs max-h-8 overflow-hidden text-justify max-w-4xl">
            {attachment?.metadata?.content}
          </div>
        ))
      }
    </div>
  )
}

export default Message