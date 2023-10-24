import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { faUserLarge, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import customFetcher from "../../utils";
import Link from 'next/link'

const AdminProfile = ({showFlashFunc}) => {
    const router = useRouter()
    const [admin, setAdmin] = useState({})
    const [dateCreated, setDateCreated] = useState("")
    const [greetName, setGreetName] = useState("")

    const setAdminFunc = async () => {
        try {
            let {response, data} = await customFetcher("admin/logged_in/get")
            setAdmin(data)
            setDateCreated(data.date_created.split("T")[0])
            setGreetName(data.admin_name.split(" ")[0])
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
        <div className="">
                <div className="bg-black">
                    <img src="../../photo3.jpg" className="w-screen h-96 object-cover opacity-60"/>
                </div>
                <div className="absolute top-24 text-slate-100 w-11/12 ml-5 sm:w-96 sm:ml-10">
                    <h1 className="text-4xl font-semibold">Hello {greetName}</h1>
                    <p className="mt-4 font-bold text-sm mb-12">
                        This is your profile page. You can check and edit your 
                    admin details from here.</p>
                    <Link href="/admin/update"><a className="rounded-md bg-blue-500 font-semibold
                    text-slate-100 px-2 py-1 shadow-md hover:shadow-lg 
                    hover:bg-blue-600 hover:px-3 hover:py-2 sm:px-4 sm:py-3 sm:hover:px-5 sm:hover:py-4"
                    >Edit Profile</a></Link>
                </div>
                <div className="top-80 text-slate-100 w-full absolute pt-10 pb-20">
                    <div className="w-10/12 m-auto bg-slate-100 text-center rounded-t-xl shadow-sm
                    shadow-slate-900">
                        <FontAwesomeIcon icon={faUserLarge} className="text-5xl sm:text-7xl bg-slate-900 
                        p-4 rounded-full -mt-10 text-slate-50"/>
                        <h3 className="text-xl font-semibold text-slate-900 mt-2">
                            My account</h3>
                        <h3 className="sm:text-lg text-left font-bold text-slate-500 ml-4 mt-3">
                        ADMIN DETAILS:</h3>
                        <div className="w-full sm:flex sm:justify-center mt-2">
                            <div className="sm:w-6/12 w-full p-3">
                                <div className="w-full shadow-sm shadow-slate-500 h-full p-2">
                                    <h4 className="text-left text-lg font-semibold text-slate-600
                                    ">Name:</h4>
                                    <p className="text-left ml-1 sm:ml-3 mt-2 text-base
                                    shadow-sm shadow-slate-300 p-1 bg-white text-slate-600
                                    overflow-auto">{admin.admin_name}</p>
                                </div>
                            </div>
                            <div className="sm:w-6/12 w-full p-3">
                                <div className="w-full shadow-sm shadow-slate-500 h-full p-2">
                                    <h4 className="text-left text-lg font-semibold text-slate-600
                                    ">Email:</h4>
                                    <p className="text-left ml-1 sm:ml-3 mt-2 text-base
                                    shadow-sm shadow-slate-300 p-1 bg-white text-slate-600
                                    overflow-auto">{admin.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:flex sm:justify-center mt-5">
                            <div className="sm:w-6/12 w-full p-3">
                                <div className="w-full shadow-sm shadow-slate-500 h-full p-2">
                                    <h4 className="text-left text-lg font-semibold text-slate-600
                                    ">Role:</h4>
                                    <p className="text-left ml-1 sm:ml-3 mt-2 text-base
                                    shadow-sm shadow-slate-300 p-1 bg-white text-slate-600
                                    overflow-auto">{admin.role}</p>
                                </div>
                            </div>
                            <div className="sm:w-6/12 w-full p-3">
                                <div className="w-full shadow-sm shadow-slate-500 h-full p-2">
                                    <h4 className="text-left text-lg font-semibold text-slate-600
                                    ">Created:</h4>
                                    <p className="text-left ml-1 sm:ml-3 mt-2 text-base
                                    shadow-sm shadow-slate-300 p-1 bg-white text-slate-600
                                    overflow-auto">{dateCreated}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
     );
}
 
export default AdminProfile;