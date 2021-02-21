import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons"

const Folder = ({ folder, onclick }) => (
  <button className="w-full flex flex-col justify-center align-center" onClick={onclick}>
    <div className="w-full text-center text-2xl text-blue-500">
      <FontAwesomeIcon icon={faFolder} />
    </div>
    <div className="w-full text-center">
      {folder?.name}
    </div>
  </button>
)

export default Folder