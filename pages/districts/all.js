import { useEffect, useState } from "react"
import customFetcher from "../../utils"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAfrica, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const AllDistricts = ({showFlashFunc}) => {
    const [districts, setDistricts] = useState([])
    const [search, setSearch] = useState(" ")
    const [noValue] = useState("No results found")
    const [meta, setMeta] = useState({})
    const [ pageNumbers, setPageNumbers ] = useState([])

    const setDistrictsFunc = async (page=1) => {
        window.scrollTo(0,0)
        try {
           let {response, data} = await customFetcher(`congregation/districts/get/?page=${page}&search=${search}`, 
            {"method": "GET"})
            if (data.data) {
                setDistricts(data.data)
                setMeta(data.meta)
                setPageNumbers(range(1, data.meta.pages))  
            }
        }
        catch {showFlashFunc("Request failed, check your network connection and try again!", false)}
      }

    const range = (start, end) => {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      }

    useEffect(() => {
        if (!localStorage.getItem('church-access-token')) {
            router.push("/auth/login")
            showFlashFunc("You are not logged in!", false)
        }
        else {
            setDistrictsFunc()
        }
    }, [])

    return ( 
        <div className="w-full pt-24 pb-12 text-slate-900 overflow-auto px-5">
            <h1 className="text-3xl font-semibold text-slate-900 text-center">
            <FontAwesomeIcon icon={faEarthAfrica} /> Districts</h1>
            <div className="w-full flex justify-center mt-3 mb-5">
                <div className="w-56 bg-white m-auto flex justify-end shadow-gray-400 
                shadow-sm hover:shadow-md hover:shadow-gray-400 rounded-md">
                <input type="username" placeholder="Search..." 
                className="w-full h-7 px-2
                bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
                onChange={(e) => { setSearch(e.target.value) }}/>
                <div className="w-2/12 text-gray-900 text-center text-xl rounded-md hover:bg-slate-300"
                onClick={() => {setDistrictsFunc()}}><FontAwesomeIcon icon={faMagnifyingGlass} /> 
                </div>
            </div>
            </div>
            {districts.length > 0 && <div className="overflow-x-auto shadow-md rounded-md mt-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                     dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                District Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Head
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Assistant Head
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Coverage Area
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Date Setup
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Branches
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Elders
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Members
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Update
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {districts.map((district) => (<tr className="bg-white border-b dark:bg-gray-800
                         dark:border-gray-700" key={district.id}>
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 
                            whitespace-nowrap dark:text-white">
                                {district.district_name}
                            </th>
                            <td className="py-4 px-6">
                                {district.district_head}
                            </td>
                            <td className="py-4 px-6">
                                {district.assistant_district_head}
                            </td>
                            <td className="py-4 px-6">
                                {district.coverage_area}
                            </td>
                            <td className="py-4 px-6">
                                {district.date_setup}
                            </td>
                            <td className="py-4 px-6">
                                <div className="w-full">
                                    <Link href={`/districts/branches/${district.id}`}><a className="rounded-md 
                                    bg-green-600 text-slate-100 p-1
                                    hover:bg-green-800">
                                        View</a></Link>
                                </div>
                            </td>
                            <td className="py-4 px-6">
                                <div className="w-full">
                                    <Link href={`/districts/elders/${district.id}`}><a className="rounded-md 
                                    bg-green-600 text-slate-100 p-1 
                                    hover:bg-green-800">
                                        View</a></Link>
                                </div>
                            </td>
                            <td className="py-4 px-6">
                                <div className="w-full">
                                    <Link href={`/districts/members/${district.id}`}><a className="rounded-md 
                                    bg-green-600 text-slate-100 p-1 
                                    hover:bg-green-800">
                                        View</a></Link>
                                </div>
                            </td>
                            <td className="py-4 px-6">
                                <div className="w-full">
                                    <Link href={`/districts/update/${district.id}`}><a 
                                    className="rounded-md  bg-blue-600 text-slate-100 p-1 
                                   hover:bg-blue-800">
                                        Update</a></Link>
                                </div>
                            </td>
                            <td className="py-4 px-6">
                                <div className="w-full">
                                    <Link href={`/districts/delete/${district.id}`}><a 
                                    className="rounded-md 
                                    bg-red-600 text-slate-100 p-1 
                                    hover:bg-red-800">
                                        Delete</a></Link>
                                </div>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>}
            <nav  className="w-full flex justify-center mt-4">
            <ul className="inline-flex items-center -space-x-px">
                {meta.prev_page && <li onClick={() => {setDistrictsFunc(meta.prev_page)}}>
                <a href="#" className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white 
                rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                dark:hover:text-white">&lt;</a>
                </li>}
                {pageNumbers.map((page) => (<li key={page} onClick={() => {setDistrictsFunc(page)}}>
                <a className="py-2 px-3 leading-tight text-gray-500 bg-white border 
                border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 
                dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                dark:hover:text-white">{page}</a>
                </li>))}
                
                {meta.next_page && <li onClick={() => {setDistrictsFunc(meta.next_page)}}>
                <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white 
                rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                dark:hover:text-white">&gt;</a>
                </li>}
            </ul>
            </nav>
            {districts.length > 0 && <div className="w-full text-center font-semibold text-lg mt-4">
                <h3>{meta.last_item} out of {meta.num_items}</h3>
            </div>}
            {!districts.length > 0 && <div className="w-full text-center">
                <h2 className="text-slate-900 font-semibold text-xl">{noValue}</h2>
            </div>}
            <div className="w-full mt-5 text-center">
                <div className="w-full">
                    <Link href="/districts/create"><a className="rounded-md bg-blue-600 text-slate-100
                    p-1 shadow-md hover:shadow-lg hover:bg-blue-700">
                        Add District</a></Link>
                </div>
            </div>
        </div>
     );
}
 
export default AllDistricts;