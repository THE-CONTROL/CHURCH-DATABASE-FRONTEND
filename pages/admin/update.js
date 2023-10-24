import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import customFetcher from '../../utils';


export default function UpdateAdmin({showFlashFunc}) {
  const [adminName, setAdminName] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const router = useRouter()

  const update = async () => {
    let body = {
      admin_name: adminName.trim(),
      role: role.trim(),
      email: email.trim()
    }
    try {
      let {response, data} = await customFetcher("admin/update", {body: JSON.stringify(body), 
        "method": "PUT"})
      showFlashFunc(data.detail.message, data.detail.success)
      if (data.detail.success) {
        localStorage.clear()
        router.push("/auth/login")
      }
    }
    catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)
    }
  }
    const setAdminFunc = async () => {
      try {
        let {response, data} = await customFetcher("admin/logged_in/get")
        setAdminName(data.admin_name)
        setRole(data.role)
        setEmail(data.email)
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)
      }
    }

    useEffect(() => {
        if (!localStorage.getItem('church-access-token')) {
            router.push("/auth/login")
            showFlashFunc("You are not logged in!", false)
        }
        else {
            setAdminFunc()
        }
    }, [])
  

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
    pb-20 pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Edit Profile</h1>
        </div>
        <div className='w-11/12 m-auto h-60 overflow-auto pb-3'>
          <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
          hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input type="username" placeholder="Admin name" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setAdminName(e.target.value) }} value={adminName}/>
          </div>
          <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
          hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center font-bold text-xl pt-2 rounded-md 
            overflow-auto">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <input type="username" placeholder="Church position" className="w-10/12 
            h-11 px-2 bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0
            rounded-md" onChange={(e) => { setRole(e.target.value) }} value={role}/>
          </div>
          <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
          hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center font-bold text-xl pt-2 rounded-md">
            <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input type="username" placeholder="Email" className="w-10/12 
            h-11 px-2 bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0
            rounded-md" onChange={(e) => { setEmail(e.target.value) }} value={email}/>
          </div>
        </div>
        <div className="w-11/12 m-auto flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { update() }}>Update</button>
        </div>
      </div>
    </div>
  )
}
