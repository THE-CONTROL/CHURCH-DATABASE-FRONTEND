import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faCalendarDays, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import customFetcher from '../../../../utils';
import { useRouter } from 'next/router';



export const getStaticPaths = async () => {
  try {
    const res = await fetch("https://church-database-backend.onrender.com/ministry_members/special/get")
    const data = await res.json()

    const paths = data.map(ministryMember => {
      return {
        params: {id: ministryMember.id.toString()}
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
    const res = await fetch(`https://church-database-backend.onrender.com/ministry_members/special/get/${id}`)
    const data = await res.json()

    return {
      props: { ministryMember: data }
    }
  }
  catch (error) {
    return {
      props: { ministryMember: {} },
      notFound: true
    };
  }
}


const UpdateMinistryMember = ({ showFlashFunc, ministryMember }) => {
    const [memberName, setMemberName] = useState("")
    const [dateSetUp, setDateSetUp] = useState("")
    const router = useRouter()

  const updateMinistryMember = async () => {
    try {
      let body = {
        participant_name: memberName.trim(),
        date_joined: dateSetUp.trim()
      }
      let {response, data} = await customFetcher(`ministry_members/update/${ministryMember.id}`, 
      {body: JSON.stringify(body), 
        "method": "PUT"})
      showFlashFunc(data.detail.message, data.detail.success)
      if (data.detail.success) {
        router.push(`/ministries/members/${ministryMember.ministry_id}`)
      }
    }
    catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    const setMinistryMember = () => {
      try {
        setMemberName(ministryMember.participant_name)
        setDateSetUp(ministryMember.date_joined)
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    useEffect(() => {
      if (!localStorage.getItem('church-access-token')) {
        router.push("/auth/login")
        showFlashFunc("You are not logged in!", false)
      }
      else {
        setMinistryMember()
      }
    }, [])

    return ( 
        <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
      pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faPeopleGroup} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">
            Update <FontAwesomeIcon icon={faUsers} /> {ministryMember.ministry_name} Member</h1>
        </div>
        <div className='w-11/12 m-auto h-40 overflow-auto'>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faPeopleGroup} />
            </div>
            <input type="text" placeholder="Member name" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setMemberName(e.target.value) }} value={memberName}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <input type="date" placeholder="Date joined" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDateSetUp(e.target.value) }} value={dateSetUp}/>
            </div>
        </div>
        <div className="w-11/12 m-auto mt-4 flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { updateMinistryMember() }}>Update member</button>
        </div>
      </div>
    </div>
     );
}
 
export default UpdateMinistryMember;