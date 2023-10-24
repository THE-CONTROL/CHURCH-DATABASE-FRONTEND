import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import customFetcher from "../../utils";
import Link from 'next/link'

const DeleteAdmin = ({showFlashFunc, delLogOut}) => {
    const router = useRouter()
    const [admin, setAdmin] = useState({})

    const setAdminFunc = async () => {
        try {
            let {response, data} = await customFetcher("admin/logged_in/get")
            setAdmin(data)
        }
        catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
        
      }

    const deleteAdmin = async () => {
        try {
            let del = await delLogOut()
            let {response, data} = await customFetcher("admin/delete", {method: "DELETE"})
            if (data.detail.success) {
                router.push("/auth/login")
                localStorage.clear()
            }
            showFlashFunc(data.detail.message, data.detail.success)
        }
        catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}

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
        <div className="w-screen h-screen pt-24 overflow-auto">
            <div className="w-64 m-auto sm:w-6/12 bg-slate-200 shadow-sm rounded-lg pb-4
            p-2">
                <h1 className="text-xl font-bold text-red-700 text-center">Deleting this account will 
                result in permanent loss of all data associated with this account.</h1>
                <h2 className="text-lg font-semibold text-slate-900 text-center pt-2">Are you sure you 
                want to delete this account?</h2>
                <div className="w-full mt-4">
                    <div className="w-full rounded-full m-auto">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full m-auto bg-slate-900
                        text-white text-center text-7xl pt-3 sm:pt-1 sm:text-8xl">
                            <FontAwesomeIcon icon={faUserLarge}/>
                        </div>
                    </div>
                    <div className="w-full rounded-b-lg text-center text-slate-900 mt-2">
                        <h1 className="font-medium text-xl">{admin.admin_name}</h1>
                    </div>
                    <div className="w-full p-1 flex justify-center mt-2">
                    <Link href="/admin/profile"><a className="rounded-md bg-blue-600 text-slate-100 mr-2
                        p-1 hover:text-lg shadow-md hover:shadow-lg hover:bg-blue-700
                        h-8 hover:h-9">Cancel</a></Link>
                    <a className="rounded-md bg-red-600 text-slate-100
                        p-1 hover:text-lg shadow-md hover:shadow-lg hover:bg-red-700
                        h-8 hover:h-9" onClick={() => {deleteAdmin()}}>Delete</a>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default DeleteAdmin;