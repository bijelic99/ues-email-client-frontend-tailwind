import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { AccountContext } from "../../contexts/accountContext"
import { FolderContext, FolderProvider } from "../../contexts/folderContext"
import { faSync } from "@fortawesome/free-solid-svg-icons"
import useMessages from "../../hooks/useMessages"
import Message from "../../components/Message"
import Folder from "../../components/Folder"

const Inbox = () => {
  const { accounts, setSelectedAccount } = useContext(AccountContext)
  const { folders, selectedFolder, setSelectedFolder, refreshSelectedFolder, childFolders, setSelectedFolderFromChildrenCallback } = useContext(FolderContext)
  const { messages, setParamsCallback } = useMessages()
  const { register: registerSearch, handleSubmit: handleSubmitSearch } = useForm()
  const { register: registerAccount, watch: watchAccount, setValue: setValueAccount } = useForm()
  const selectedAccountId = watchAccount("account", null)
  const selectedFolderId = watchAccount("folder", null)
  useEffect(() => {
    if (selectedAccountId && selectedAccountId !== -1) setSelectedAccount(accounts.find(a => a.id == selectedAccountId))
    else setSelectedAccount(null)
  }, [selectedAccountId])
  useEffect(() => {
    if (selectedFolderId && selectedFolderId !== -1) setSelectedFolder(folders.find(f => f.id == selectedFolderId))
    else setSelectedFolder(null)
  }, [selectedFolderId])

  const setSelectedFolderId = useCallback((id) => () =>{
    if(id) {
      setValueAccount("folder", id)
    }
  },[setValueAccount])

  return (
    <div className="container w-10/12 mx-auto mt-8 flex flex-row gap-4 items-start">
      <div className="w-1/4 flex flex-col gap-y-4">
        <form className="border rounded-md shadow-lg p-4 flex flex-col gap-y-4">
          <button type="button" className="w-full border p-2 rounded" onClick={refreshSelectedFolder}>
            <FontAwesomeIcon icon={faSync} />
          </button>
          <div>
            <label htmlFor="account" className="font-medium">Account: </label>
            <select name="account" id="account" defaultValue={-1} className="w-full border p-2" ref={registerAccount}>
              <option value={-1}>All</option>
              {
                accounts.map(account => (
                  <option key={account.id} value={account.id}>{account.displayName}</option>
                ))
              }
            </select>
          </div>
          <div>
            <label htmlFor="folder" className="font-medium">Folder: </label>
            <select name="folder" id="folder" defaultValue={-1} className="w-full border p-2" ref={registerAccount}>
              <option value={-1}>All</option>
              {
                folders.map(folder => (
                  <option key={folder.id} value={folder.id}>{folder?.name || "No name"}</option>
                ))
              }
            </select>
          </div>
        </form>
        <form className="border rounded-md shadow-lg p-4 flex flex-col gap-y-4" onSubmit={handleSubmitSearch(setParamsCallback)}>
          <div>
            <label htmlFor="subject" className="font-medium">Subject: </label>
            <input type="text" name="subject" id="subject" className="w-full border p-2" ref={registerSearch} />
          </div>
          <div>
            <label htmlFor="sender" className="font-medium">Sender: </label>
            <input type="text" name="sender" id="sender" className="w-full border p-2" ref={registerSearch} />
          </div>
          <div>
            <label htmlFor="recipient" className="font-medium">Recipient: </label>
            <input type="text" name="recipient" id="recipient" className="w-full border p-2" ref={registerSearch} />
          </div>
          <div>
            <label htmlFor="content" className="font-medium">Content: </label>
            <input type="text" name="content" id="content" className="w-full border p-2" ref={registerSearch} />
          </div>
          <div>
            <label htmlFor="attachment" className="font-medium">Attachment: </label>
            <input type="text" name="attachment" id="attachment" className="w-full border p-2" ref={registerSearch} />
          </div>
          <div>
            <input type="submit" value="Search" className="w-full border p-2 bg-blue-500 font-medium text-white" />
          </div>
        </form>
      </div>
      <div className="flex-grow flex flex-col border rounded-md shadow-lg p-4 gap-y-2">
        {
          messages.map(message => (
            <Message message={message} key={message.id} />
          ))
        }
      </div>
      <div className="w-1/6 flex flex-col border rounded-md shadow-lg p-4 gap-y-2">
        {childFolders.map(f => (
          <Folder folder={f} key={f.id} onclick={setSelectedFolderId(f.id)} />
        ))}
      </div>
    </div>
  )
}

export default Inbox