import Link from 'next/link';
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router';
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('church-access-token')) {
      router.push("/admin/profile")
  }
  }, [])
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto select-none">
      <img src="photo2.jpg" className='w-full h-full'/>
      <div className='w-screen absolute left-0 top-20 pt-20'>
        <div className='w-64 m-auto sm:w-96 sm:ml-24 p-3'>
          <h1 className='text-white text-3xl sm:text-4xl font-semibold mb-7'><i>
          <FontAwesomeIcon icon={faDatabase}/> Church Database</i></h1>
          <i className='text-white text-lg font-medium'>
            Manage church data, services and groups...</i>
          <Link href={"/auth/register"}><p className='bg-blue-700 w-40 h-20 text-center mt-16
          rounded-full text-white pt-7 hover:bg-blue-900 hover:text-blue-100 
          hover:text-lg hover:h-24 hover:w-44 hover:pt-8'>Get Started</p></Link>
        </div>
      </div>
    </div>
  )
}
