import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faDatabase } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Navbar({admin, logOut}) {
    const [ showNav, setShowNav ] = useState(false)
    const router = useRouter()

    const showNavFuncTrue = () => {
        setShowNav(true)
    }

    const showNavFuncFalse = () => {
        setShowNav(false)
    }

  return (
    <div className="h-20 w-screen fixed top-0 left-0 py-5 px-3 sm:px-10 flex justify-between
    md:px-14 lg:px-20 shadow-sm shadow-slate-600 bg-white">
        <div className='h-full'>
            <h1 className='text-blue-900 text-xl pt-1.5 sm:text-2xl md:text-3xl font-bold sm:p-1'><FontAwesomeIcon icon={faDatabase}/> CHURCH DATABASE</h1>
        </div>
        {!showNav && <button className='text-blue-500 font-bold text-lg sm:hidden hover:text-xl mr-3' 
            onClick={() => {showNavFuncTrue()}}>
            <FontAwesomeIcon icon={faBars} /></button>}
        <div className='h-full sm:flex sm:justify-around pt-1 hidden text-slate-900'>
            {!admin.logged_in && <Link href="/auth/login"><a 
            className={router.pathname == "/auth/login" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"}>Login</a></Link>}
            {!admin.logged_in && <Link href="/auth/register"><a 
            className={router.pathname == "/auth/register" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"}>Register</a></Link>}
            {admin.logged_in && <Link href="/admin/profile"><a 
            className={router.pathname == "/admin/profile" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"}>Admin</a></Link>}
            {admin.logged_in && <Link href="/church/profile"><a 
            className={router.pathname == "/church/profile" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"}
            >Church</a></Link>}
            {admin.logged_in && <Link href="/data/data"><a 
            className={router.pathname == "/data/data" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"}>Data</a></Link>}
            {admin.logged_in && <a className='mr-4 text-lg font-semibold 
            hover:text-blue-600 hover:text-xl' onClick={() => {logOut()}}>Logout</a>}
        </div>
        {showNav && <div className='w-screen h-screen bg-black opacity-60 absolute left-0 top-0
        sm:hidden' onClick={() => {showNavFuncFalse()}}></div>}
        {showNav && <div className='w-64 h-screen bg-white fixed top-0 right-0 sm:hidden 
        text-slate-900'>
            <button className='text-red-500 font-bold text-2xl sm:hidden
            hover:text-3xl float-right mr-5 mt-6' 
                onClick={() => {showNavFuncFalse()}}>
                <FontAwesomeIcon icon={faXmark} /></button>
            <div className='w-full mt-16 text-center'>
                {!admin.logged_in && <Link href="/auth/login"><p 
            className={router.pathname == "/auth/login" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"} 
                onClick={() => {showNavFuncFalse()}}>Login</p></Link>}
                {!admin.logged_in && <Link href="/auth/register"><p 
            className={router.pathname == "/auth/register" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"} 
                onClick={() => {showNavFuncFalse()}}>Register</p></Link>}
                {admin.logged_in && <Link href="/admin/profile"><p 
            className={router.pathname == "/admin/profile" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"} 
                onClick={() => {showNavFuncFalse()}}>Admin</p></Link>}
                {admin.logged_in && <Link href="/church/profile"><p 
            className={router.pathname == "/church/profile" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"} 
                onClick={() => {showNavFuncFalse()}}>Church</p></Link>}
                {admin.logged_in && <Link href="/data/data"><p 
            className={router.pathname == "/data/data" ? "text-blue-600 text-xl mr-4 font-semibold" : 
            "mr-4 text-lg font-semibold hover:text-blue-600 hover:text-xl"} 
                onClick={() => {showNavFuncFalse()}}>Data</p></Link>}
                {admin.logged_in && <p className='mr-4 text-lg font-semibold 
                p-1 hover:text-blue-600 hover:text-xl' onClick={() => {logOut()}}>Logout</p>}
            </div>
        </div>}
    </div>
  )
}
