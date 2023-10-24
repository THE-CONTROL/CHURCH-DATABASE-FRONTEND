import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faRing, faCalendarDays, faVenusMars, faPeopleGroup, faEarthAfrica, faWater, faCross, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import customFetcher from '../../utils';
import { useRouter } from 'next/router';

const CreateMember = ({ showFlashFunc }) => {
  const [memberName, setMemberName] = useState("")
  const [sex, setSex] = useState("Female")
  const [maritalStatus, setMaritalStatus] = useState("Single")
  const [telephone, setTelephone] = useState("")
  const [baptised, setBaptised] = useState("No")
  const [district, setDistrict] = useState("")
  const [branch, setBranch] = useState("")
  const [discipline, setDiscipline] = useState("")
  const [dateJoined, setDateJoined] = useState("")
  const router = useRouter()


  const createMember = async () => {
       let body = {
        member_name: memberName.trim(),
        sex: sex.trim(),
        marital_status: maritalStatus.trim(),
        date_joined: dateJoined.trim(),
        telephone: telephone.trim(),
        baptised: baptised.trim(),
        district: district.trim(),
        cottage: branch.trim(),
        discipline: discipline.trim()
      }
      try {
        let {response, data} = await customFetcher("member/add", {body: JSON.stringify(body), 
          "method": "POST"})
        showFlashFunc(data.detail.message, data.detail.success)
        if (data.detail.success) {
          router.push("/members/all")
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
        <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
      pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faPeopleGroup} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Create Member</h1>
        </div>
        <div className='w-11/12 m-auto h-56 overflow-auto pb-5'>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faPeopleGroup} />
            </div>
            <input type="text" placeholder="Member name" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setMemberName(e.target.value) }}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faVenusMars} />
            </div>
            <select placeholder="Sex" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setSex(e.target.value) }}>
                <option value={"Female"}>Female</option>
                <option value={"Male"}>Male</option>
            </select>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faRing} />
            </div>
            <select type="select" placeholder="Marital Status" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setMaritalStatus(e.target.value) }}>
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
            onChange={(e) => { setTelephone(e.target.value) }}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faEarthAfrica} />
            </div>
            <input type="text" placeholder="District" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDistrict(e.target.value) }}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCross} />
            </div>
            <input type="text" placeholder="Branch" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setBranch(e.target.value) }}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <input type="text" placeholder="Occupation" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDiscipline(e.target.value) }}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faWater} />
            </div>
            <select type="select" placeholder="Baptised?" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setBaptised(e.target.value) }}>
                <option value={"No"}>No</option>
                <option value={"Yes"}>Yes</option>
            </select>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <input type="date" placeholder="Date joined" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDateJoined(e.target.value) }}/>
            </div>
        </div>
        <div className="w-11/12 m-auto mt-4 flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { createMember() }}>Create member</button>
        </div>
      </div>
    </div>
     );
}
 
export default CreateMember;