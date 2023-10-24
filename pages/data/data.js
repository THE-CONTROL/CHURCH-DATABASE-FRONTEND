import Link from "next/link";
import { useEffect, useState } from "react";
import { faEarthAfrica, faCross, faUsers, faBreadSlice, faWater, faDove, faPeopleRoof, faPeopleGroup, faPersonCane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router';


const Data = ({ showFlashFunc }) => {
    const [dataItems] = useState([
        {"name": "Districts", "route": "/districts/all", "favicorn": faEarthAfrica},
        {"name": "Branches", "route": "/branches/all", "favicorn": faCross},
        {"name": "Ministries", "route": "/ministries/all", "favicorn": faUsers},
        {"name": "Communion Service", "route": "/communionService/all", "favicorn": faBreadSlice},
        {"name": "Baptism", "route": "/baptisms/all", "favicorn": faWater},
        {"name": "Confirmation", "route": "/confirmations/all", "favicorn": faDove},
        {"name": "Service", "route": "/service/all", "favicorn": faPeopleRoof},
        {"name": "Members", "route": "/members/all", "favicorn": faPeopleGroup},
        {"name": "Elders", "route": "/elders/all", "favicorn": faPersonCane}
    ])
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('church-access-token')) {
            router.push("/auth/login")
            showFlashFunc("You are not logged in!", false)
        }
    })

    return ( 
        <div className="w-full pt-24 pb-14 text-slate-900">
            <h1 className="font-semibold text-3xl text-center mb-2 text-slate-900">CHURCH DATA</h1>
            <div className="w-full m-auto flex 
            justify-center flex-wrap sm:w-10/12 lg:w-8/12">
                {dataItems.map((dataItem, index) => (<Link href={dataItem.route}
                key={index}><div className="w-36 mt-4 mx-4 overflow-auto rounded-md 
                shadow-sm bg-slate-300 text-slate-800 hover:bg-slate-800
                hover:text-slate-300 shadow-slate-600 hover:shadow-lg">
                    <div className="w-full h-24 rounded-t-md text-center text-7xl pt-3">
                        <FontAwesomeIcon icon={dataItem.favicorn}/>
                    </div>
                    <h2 className="w-full h-8 text-lg text-center overflow-auto">{dataItem.name}</h2>
                </div></Link>))}
            </div>
        </div>
     );
}
 
export default Data;