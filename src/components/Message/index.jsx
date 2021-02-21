import { Link } from "react-router-dom"

const Message = ({ message }) => {
  return (
    <div className="w-full border shadow-md p-2 flex flex-col">
      <div className="border-b mb-2 pb-2 font-semibold text-lg">
        <Link to={`/`}>
          {message?.subject}
        </Link>
      </div>
      <div className="border-b mb-2 pb-2 font-medium text-sm">
        {message?.from}
      </div>
      <div className="font-light text-sm h-24 overflow-hidden">
        {message?.abstractText}
      </div>
    </div>
  )
}

export default Message