import { useEffect, useState } from "react/cjs/react.development"
import { axios } from "../axios"
import useMessages from "./useMessages"

const useMessage = (id) => {
  const [ message, setMessage ] = useState()

  useEffect(()=>{
    if(id)
      axios.get(`/message/${id}`)
      .then(({status, data})=> status === 200 && setMessage(data))
      .catch(console.error)
  }, [id, setMessage])

  return { message }
}

export default useMessage