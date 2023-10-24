import '../styles/globals.css'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import customFetcher from '../utils';
import Layout from '../components/layout'

export default function App({ Component, pageProps }) {
    const [showFlash, setShowFlash] = useState("")
    const [success, setSuccess] = useState(true)
    const [admin, setAdmin] = useState({})
    const router = useRouter()
    const [showApp, setShowApp] = useState(false)
    
    const fetchController = new AbortController()

    const requestFailed = () => {
      fetchController.abort()
      showFlashFunc("Request failed, check your network connection and try again!", false)
    }
  
    const showFlashFunc = (message, success) => {
        setShowFlash(message)
        setSuccess(success)
    }

    const clearFlash = () => {
        setShowFlash("")
    }

    const loggedIn = async () => {
      if (localStorage.getItem('church-access-token')) {
        try {
          let {response, data} = await customFetcher("admin/logged_in/get")
          setAdmin(data)
          if (!data.logged_in) {
            router.push("/auth/login")
          }
        }
        catch(error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
      }
    }

    const logOut = async () => {
      try {
        let {response, data} = await customFetcher("admin/logout", { method: "PUT"})
        showFlashFunc(data.detail.message, data.detail.success)
        setAdmin(data.detail.admin)
        localStorage.clear()
        router.push("/auth/login")
      }
      catch(error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    const delLogOut = async () => {
      try {
        let {response, data} = await customFetcher("admin/logout", { method: "PUT"})
        setAdmin(data.detail.admin)
      }
      catch(error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

  useEffect(() => {
      loggedIn()
      setTimeout(() => {setShowApp(true)}, 4000)
  }, [showFlash])

  return (
    <div>
      {!showApp && 
        <div className="w-screen h-screen bg-[black] select-none">
          <div className="w-fit mx-auto text-white pt-52">
            <img
              src="https://res.cloudinary.com/de49puo0s/image/upload/v1697884155/gloaysc8nlrnimvcxwmi.jpg"
              className="h-32 w-32 mr-2 float-left rounded-lg object-cover"
              alt="Control Logo"
            />
          </div>
        </div>
      }
      {showApp && 
        <Layout 
          showFlash={showFlash} 
          success={success} 
          clearFlash={clearFlash} 
          showFlashFunc={showFlashFunc}
          admin={admin} 
          logOut={logOut}
        >
          <Component 
            {...pageProps} 
            showFlashFunc={showFlashFunc} 
            delLogOut={delLogOut} 
            fetchController={fetchController} 
            requestFailed={requestFailed}
          />
        </Layout>
      }
    </div>
  )
}
