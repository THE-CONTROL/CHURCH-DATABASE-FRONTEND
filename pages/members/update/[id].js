import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faRing, faCalendarDays, faVenusMars, faPeopleGroup, faWater, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import customFetcher from '../../../utils';
import { useRouter } from 'next/router';


export const getStaticPaths = async () => {
  try {
    const res = await fetch("https://church-database-backend.onrender.com/member/special/get")
    const data = await res.json()

    const paths = data.map(member => {
      return {
        params: {id: member.id.toString()}
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
    const res = await fetch(`https://church-database-backend.onrender.com/member/special/get/${id}`)
    const data = await res.json()

    return {
      props: { member: data }
    }
  }
  catch (error) {
    return {
      props: { member: {} },
      notFound: true
    };
  }
}


const UpdateMember = ({ showFlashFunc, member }) => {
    const [memberName, setMemberName] = useState("")
    const [sex, setSex] = useState("")
    const [maritalStatus, setMaritalStatus] = useState("")
    const [telephone, setTelephone] = useState("")
    const [baptised, setBaptised] = useState()
    const [discipline, setDiscipline] = useState("")
    const [dateJoined, setDateJoined] = useState("")
    const router = useRouter()
  

  const updateMember = async () => {
    let body = {
        member_name: memberName.trim(),
        sex: sex.trim(),
        marital_status: maritalStatus.trim(),
        date_joined: dateJoined.trim(),
        telephone: telephone.trim(),
        baptised: baptised.trim(),
        discipline: discipline.trim()
      }
      try {
        let {response, data} = await customFetcher(`member/update/${member.id}`, 
        {body: JSON.stringify(body), 
          "method": "PUT"})
        showFlashFunc(data.detail.message, data.detail.success)
        if (data.detail.success) {
          router.push("/members/all")
        }
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    const setMember = () => {
      try {
        setMemberName(member.member_name)
        setSex(member.sex)
        setDateJoined(member.date_joined)
        setMaritalStatus(member.marital_status)
        setTelephone(member.telephone)
        setBaptised(member.baptised)
        setDiscipline(member.discipline)
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    useEffect(() => {
      if (!localStorage.getItem('church-access-token')) {
        router.push("/auth/login")
        showFlashFunc("You are not logged in!", false)
      }
      else {
        setMember()
      }
    }, [])

    return ( 
        <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
      pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faPeopleGroup} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Update Member</h1>
        </div>
        <div className='w-11/12 m-auto h-56 overflow-auto pb-5'>
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
                <FontAwesomeIcon icon={faVenusMars} />
            </div>
            <select placeholder="Sex" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setSex(e.target.value) }} value={sex}>
                <option value={"Female"}>Female</option>
                <option value={"Male"}>Male</option>
            </select>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faRing} />
            </div>
            <select placeholder="Marital status" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setMaritalStatus(e.target.value) }} value={maritalStatus}>
                <option value={"Single"}>Single</option>
                <option value={"Married"}>Married</option>
            </select>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faPhone} />
            </div>
            <input type="text" placeholder="Phone number" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setTelephone(e.target.value) }} value={telephone}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <input type="text" placeholder="Occupation" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDiscipline(e.target.value) }} value={discipline}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faWater} />
            </div>
            <select placeholder="Baptised?" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => {setBaptised(e.target.value)}} value={baptised}>
                <option value={"No"}>No</option>
                <option value={"Yes"}>Yes</option>
            </select>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <input type="date" placeholder="Date Joined" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDateJoined(e.target.value) }} value={dateJoined}/>
            </div>
        </div>
        <div className="w-11/12 m-auto mt-4 flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { updateMember() }}>Update member</button>
        </div>
      </div>
    </div>
     );
}
 
export default UpdateMember;