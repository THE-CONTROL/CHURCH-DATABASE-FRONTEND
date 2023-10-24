import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { faChurch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import customFetcher from "../../utils";
import Link from 'next/link'

const ChurchProfile = ({showFlashFunc}) => {
    const router = useRouter()
    const [church, setChurch] = useState({})

    const setChurchFunc = async () => {
        try {
            let {response, data} = await customFetcher("admin/congregation/get")
            setChurch(response.status === 200 ? data : data?.detail?.congregation)
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
            setChurchFunc()
        }
    }, [])

    return ( 
        <div className="">
            {church && <div className="">
                <div className="bg-black">
                    <img src="../../photo4.jpg" className="w-screen h-96 object-cover opacity-60"/>
                </div>
                <div className="absolute top-24 text-slate-100 w-full text-center">
                    <h1 className="sm:text-4xl text-2xl font-semibold">{church.congregation_name}</h1>
                    <p className="mt-4 font-bold text-sm mb-7 sm:mb-12">{church.location}.</p>
                    <div className="w-full justify-center">
                        <Link href="/church/update"><a className="rounded-md bg-blue-500 font-semibold
                        text-slate-100 px-2 py-1 shadow-md hover:shadow-lg mr-3
                        hover:bg-blue-600 hover:px-3 hover:py-2 sm:px-4 sm:py-3 sm:hover:px-5 sm:hover:py-4"
                        >Edit Church</a></Link>
                        <Link href="/church/delete"><a className="rounded-md bg-red-500 font-semibold
                        text-slate-100 px-2 py-1 shadow-md hover:shadow-lg 
                        hover:bg-red-600 hover:px-3 hover:py-2 sm:px-4 sm:py-3 sm:hover:px-5 sm:hover:py-4"
                        >Delete Church</a></Link>
                    </div>
                </div>
                <div className="top-80 text-slate-100 w-full absolute pt-10 pb-20">
                    <div className="w-10/12 m-auto bg-slate-100 text-center rounded-t-xl shadow-sm
                    shadow-slate-900">
                        <FontAwesomeIcon icon={faChurch} className="text-5xl sm:text-7xl bg-slate-900 
                        p-4 rounded-full -mt-10 text-slate-50"/>
                        <h3 className="text-xl font-semibold text-slate-900 mt-2">
                            Church account</h3>
                        <h3 className="sm:text-lg text-left font-bold text-slate-500 ml-4 mt-3">
                        CHURCH DETAILS:</h3>
                        <div className="w-full sm:flex sm:justify-center mt-2">
                            <div className="sm:w-6/12 w-full p-3">
                                <div className="w-full shadow-sm shadow-slate-500 h-full p-2">
                                    <h4 className="text-left text-lg font-semibold text-slate-600
                                    ">Name:</h4>
                                    <p className="text-left ml-1 sm:ml-3 mt-2 text-base
                                    shadow-sm shadow-slate-300 p-1 bg-white text-slate-600
                                    overflow-auto">{church.congregation_name}</p>
                                </div>
                            </div>
                            <div className="sm:w-6/12 w-full p-3">
                                <div className="w-full shadow-sm shadow-slate-500 h-full p-2">
                                    <h4 className="text-left text-lg font-semibold text-slate-600
                                    ">Church Head:</h4>
                                    <p className="text-left ml-1 sm:ml-3 mt-2 text-base
                                    shadow-sm shadow-slate-300 p-1 bg-white text-slate-600
                                    overflow-auto">{church.congregation_head}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:flex sm:justify-center mt-5">
                            <div className="sm:w-6/12 w-full p-3">
                                <div className="w-full shadow-sm shadow-slate-500 h-full p-2">
                                    <h4 className="text-left text-lg font-semibold text-slate-600
                                    ">Assistant Church Head:</h4>
                                    <p className="text-left ml-1 sm:ml-3 mt-2 text-base
                                    shadow-sm shadow-slate-300 p-1 bg-white text-slate-600
                                    overflow-auto">{church.assistant_congregation_head}</p>
                                </div>
                            </div>
                            <div className="sm:w-6/12 w-full p-3">
                                <div className="w-full shadow-sm shadow-slate-500 h-full p-2">
                                    <h4 className="text-left text-lg font-semibold text-slate-600
                                    ">Founded:</h4>
                                    <p className="text-left ml-1 sm:ml-3 mt-2 text-base
                                    shadow-sm shadow-slate-300 p-1 bg-white text-slate-600
                                    overflow-auto">{church.date_setup}</p>
                                </div>
                            </div>
                            <div className="w-full p-3">
                                <div className="w-full shadow-sm shadow-slate-500 h-full p-2">
                                    <h4 className="text-left text-lg font-semibold text-slate-600
                                    ">Headquarters:</h4>
                                    <p className="text-left ml-1 sm:ml-3 mt-2 text-base
                                    shadow-sm shadow-slate-300 p-1 bg-white text-slate-600
                                    overflow-auto">{church.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {!church && <div className="w-screen pt-24 text-center">
                <h2 className="text-slate-900 font-semibold text-xl">No church created</h2>
            </div>}
            <div className="w-full mt-5 text-center">
                <div className="w-full">
                    <Link href="/church/create"><a className="rounded-md bg-blue-600 text-slate-100
                    p-1 shadow-md hover:shadow-lg hover:bg-blue-700">
                        Add Church</a></Link>
                </div>
            </div>
        </div>
     );
}
 
export default ChurchProfile;