import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faLock } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


export default function Change({showFlashFunc, fetchController}) {
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()


  const change = async () => {
    try {
        const res = await fetch("https://church-database-backend.onrender.com/admin/reset_code", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "signal": fetchController.signal
            },
            body: JSON.stringify({ code:code.trim(), confirm_password:confirmPassword.trim(), password:password.trim() })
        })
        const data = await res.json()
        showFlashFunc(data.detail.message, data.detail.success)
        if (data.detail.success) {
           router.push("/auth/login")
        }
    }
    catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    
  }

  useEffect(() => {
    if (localStorage.getItem('church-access-token')) {
      router.push("/admin/profile")
      showFlashFunc("You are already logged in!", false)
  }
  })

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
    pb-5 pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faCode} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Reset Password</h1>
        </div>
        <div className='w-11/12 m-auto h-52 pb-5 overflow-auto'>
        <div className="w-11/12 bg-white m-auto mt-7 flex justify-end shadow-gray-900 shadow-sm
          hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <input type="text" placeholder="Reset code" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setCode(e.target.value) }}/>
          </div>
            <div className="w-11/12 bg-white m-auto mt-7 flex justify-end shadow-gray-900 shadow-sm
          hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input type="password" placeholder="Password" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setPassword(e.target.value) }}/>
          </div>
          <div className="w-11/12 bg-white m-auto mt-7 flex justify-end shadow-gray-900 shadow-sm
          hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input type="password" placeholder="Confirm password" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setConfirmPassword(e.target.value) }}/>
          </div>
        </div>
        <div className="w-11/12 m-auto mt-4 flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { change() }}>Change</button>
        </div>
      </div>
    </div>
  )
}
