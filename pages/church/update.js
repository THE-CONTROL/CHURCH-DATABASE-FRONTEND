import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChurch, faUserTie, faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import customFetcher from '../../utils';
import { useRouter } from 'next/router';

const UpdateChurch = ({ showFlashFunc }) => {
  const [churchName, setChurchName] = useState("")
  const [churchHead, setChurchHead] = useState("")
  const [location, setLocation] = useState("")
  const [dateSetUp, setDateSetUp] = useState("")
  const [asschurchHead, setAssChurchHead] = useState("")
  const router = useRouter()
  const [churchId, setChurchId] = useState({})


  const updateChurch = async () => {
      let body = {
        congregation_name: churchName.trim(),
        congregation_head: churchHead.trim(),
        location: location.trim(),
        date_setup: dateSetUp.trim(),
        assistant_congregation_head: asschurchHead.trim()
      }
      try {
        let {response, data} = await customFetcher(`congregation/update/${churchId}`, 
        {body: JSON.stringify(body), 
          method: "PUT"})
        showFlashFunc(data.detail.message, data.detail.success)
        if (data.detail.success) {
          router.push("/church/profile")
        }
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)
      }
    }

    const setChurchFunc = async () => {
        try {
          let {response, data} = await customFetcher("admin/congregation/get")
          setChurchId(data.id)
          setChurchName(data.congregation_name)
          setChurchHead(data.congregation_head)
          setAssChurchHead(data.assistant_congregation_head)
          setDateSetUp(data.date_setup)
          setLocation(data.location)
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
        <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
      pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faChurch} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Update Church</h1>
        </div>
        <div className='w-11/12 m-auto h-56 overflow-auto pb-5'>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faChurch} />
            </div>
            <input type="text" placeholder="Type in the church name..." className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setChurchName(e.target.value) }} value={churchName}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUserTie} />
            </div>
            <input type="text" placeholder="Type in the church head name..." className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setChurchHead(e.target.value) }} value={churchHead}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUserTie} />
            </div>
            <input type="text" placeholder="Type in the assist. church head name..." 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setAssChurchHead(e.target.value) }} value={asschurchHead}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <input type="text" placeholder="Where is the church headquarters located?" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setLocation(e.target.value) }} value={location}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <input type="date" placeholder="When was the church founded?" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDateSetUp(e.target.value) }} value={dateSetUp}/>
            </div>
        </div>
        <div className="w-11/12 m-auto mt-7 flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { updateChurch() }}>Update Church</button>
        </div>
      </div>
    </div>
     );
}
 
export default UpdateChurch;