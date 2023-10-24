import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faBreadSlice } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import customFetcher from '../../../../utils';
import { useRouter } from 'next/router';
import Link from 'next/link';


export const getStaticPaths = async () => {
  try {
    const res = await fetch("https://church-database-backend.onrender.com/communion_participants/special/get")
    const data = await res.json()

    const paths = data.map(communionServiceParticipant => {
      return {
        params: {id: communionServiceParticipant.id.toString()}
      }
    })

    return {
      paths: paths,
      fallback: false
    }
  }
  catch (error) {
    return {
      paths: [],
      fallback: false
    };
  }
}

export const getStaticProps = async (context) => {
  try {
    const id = context.params.id
    const res = await fetch(`https://church-database-backend.onrender.com/communion_participants/special/get/${id}`)
    const data = await res.json()

    return {
      props: { communionServiceParticipant: data }
    }
  }
  catch (error) {
    return {
      props: { communionServiceParticipant: {} },
      notFound: true
    };
  }
}


const DeleteCommunionServiceParticipant = ({ showFlashFunc, communionServiceParticipant }) => {
    const router = useRouter()

  const deleteCommunionServiceParticipant = async () => {
    try {
      let {response, data} = await customFetcher(`communion_participants/delete/${communionServiceParticipant.id}`, 
      {"method": "DELETE"})
      showFlashFunc(data.detail.message, data.detail.success)
      if (data.detail.success) {
        router.push(`/communionService/participants/${communionServiceParticipant.communion_service_id}`)
      }
    }
    catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    useEffect(() => {
      if (!localStorage.getItem('church-access-token')) {
        router.push("/auth/login")
        showFlashFunc("You are not logged in!", false)
      }
    }, [])

    return ( 
        <div className="w-screen h-screen pt-24 overflow-auto">
            <div className="w-64 m-auto sm:w-6/12 bg-slate-200 shadow-sm rounded-lg pb-4
            p-2">
                <h1 className="text-xl font-bold text-red-700 text-center">Deleting this communion service 
                participant will result in permanent loss of all data associated with this participant.</h1>
                <h2 className="text-lg font-semibold text-slate-900 text-center 
                pt-2">Are you sure you want to delete this <FontAwesomeIcon icon={faBreadSlice}/> 
                 {communionServiceParticipant.service_name} participant?</h2>
                <div className="w-full mt-4">
                    <div className="w-full rounded-full m-auto">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full m-auto bg-slate-900
                        text-white text-center text-6xl pt-6 sm:text-7xl">
                            <FontAwesomeIcon icon={faPeopleGroup}/>
                        </div>
                    </div>
                    <div className="w-full rounded-b-lg text-center text-slate-900 mt-2">
                        <h1 className="font-medium text-xl">{communionServiceParticipant.participant_name}</h1>
                    </div>
                    <div className="w-full p-1 flex justify-center mt-2">
                    <Link href={`/communionService/participants/${communionServiceParticipant.communion_service_id}`}><a 
                    className="rounded-md bg-blue-600 text-slate-100 mr-2
                        p-1 hover:text-lg shadow-md hover:shadow-lg hover:bg-blue-700
                        h-8 hover:h-9">Cancel</a></Link>
                    <a className="rounded-md bg-red-600 text-slate-100
                        p-1 hover:text-lg shadow-md hover:shadow-lg hover:bg-red-700
                        h-8 hover:h-9" onClick={() => {deleteCommunionServiceParticipant()}}>Delete</a>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default DeleteCommunionServiceParticipant;