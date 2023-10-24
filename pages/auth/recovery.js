import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


export default function Recovery({showFlashFunc, fetchController}) {
  const [email, setEmail] = useState("")
  const router = useRouter()


  const recovery = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/forgot_password", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "signal": fetchController.signal
        },
        body: JSON.stringify({ email:email.trim() })
      })
      const data = await res.json()
      showFlashFunc(data.detail.message, data.detail.success)
      if (data.detail.success) {
        router.push("/auth/reset")
      }
    }
    catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
  }

  useEffect(() => {
    if (localStorage.getItem('church-access-token')) {
      router.push("/admin/profile")
      fetchController.abort()
      showFlashFunc("You are already logged in!", false)
  }
  })

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
    pb-5 pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faLock} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Password Recovery</h1>
        </div>
        <div className='w-11/12 m-auto h-20 overflow-auto'>
        <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
          hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center font-bold text-xl pt-2 rounded-md">
            <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input type="username" placeholder="Email" className="w-10/12 
            h-11 px-2 bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0
            rounded-md" onChange={(e) => { setEmail(e.target.value) }}/>
          </div>
        </div>
        <div className="w-11/12 m-auto mt-4 flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { recovery() }}>Send reset code</button>
        </div>
      </div>
    </div>
  )
}
