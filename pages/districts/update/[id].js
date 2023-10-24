import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAfrica, faUserTie, faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import customFetcher from '../../../utils';
import { useRouter } from 'next/router';


export const getStaticPaths = async () => {
  try {
    const res = await fetch("https://church-database-backend.onrender.com/district/special/get")
    const data = await res.json()

    const paths = data.map(district => {
      return {
        params: {id: district.id.toString()}
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
    const res = await fetch(`https://church-database-backend.onrender.com/district/special/get/${id}`)
    const data = await res.json()
  
    return {
      props: { district: data }
    }
  }
  catch (error) {
    return {
      props: { district: {} },
      notFound: true
    };
  }
}


const UpdateDistrict = ({ showFlashFunc, district }) => {
  const [districtName, setDistrictName] = useState("")
  const [districtHead, setDistrictHead] = useState("")
  const [location, setLocation] = useState("")
  const [dateSetUp, setDateSetUp] = useState("")
  const [assDistrictHead, setAssDistrictHead] = useState("")
  const router = useRouter()

  const updateDistrict = async () => {
      let body = {
        district_name: districtName.trim(),
        district_head: districtHead.trim(),
        coverage_area: location.trim(),
        date_setup: dateSetUp.trim(),
        assistant_district_head: assDistrictHead.trim()
      }
      try {
        let {response, data} = await customFetcher(`district/update/${district.id}`, 
        {body: JSON.stringify(body), 
          "method": "PUT"})
        showFlashFunc(data.detail.message, data.detail.success)
        if (data.detail.success) {
          router.push("/districts/all")
        }
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    const setDistrict = () => {
      try {
        setDistrictName(district.district_name)
        setDistrictHead(district.district_head)
        setLocation(district.coverage_area)
        setDateSetUp(district.date_setup)
        setAssDistrictHead(district.assistant_district_head)
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    useEffect(() => {
      if (!localStorage.getItem('church-access-token')) {
        router.push("/auth/login")
        showFlashFunc("You are not logged in!", false)
      }
      else {
        setDistrict()
      }
    }, [])

    return ( 
        <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
      pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faEarthAfrica} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Update District</h1>
        </div>
        <div className='w-11/12 m-auto h-56 overflow-auto pb-5'>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faEarthAfrica} />
            </div>
            <input type="text" placeholder="District name" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDistrictName(e.target.value) }} value={districtName}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUserTie} />
            </div>
            <input type="text" placeholder="District head" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDistrictHead(e.target.value) }} value={districtHead}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUserTie} />
            </div>
            <input type="text" placeholder="Assistant district head" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setAssDistrictHead(e.target.value) }} 
            value={assDistrictHead}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <input type="text" placeholder="Coverage area" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setLocation(e.target.value) }} value={location}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <input type="date" placeholder="Date founded" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDateSetUp(e.target.value) }} value={dateSetUp}/>
            </div>
        </div>
        <div className="w-11/12 m-auto mt-4 flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { updateDistrict() }}>Update district</button>
        </div>
      </div>
    </div>
     );
}
 
export default UpdateDistrict;