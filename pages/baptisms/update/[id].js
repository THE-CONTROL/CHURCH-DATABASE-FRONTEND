import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWater, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import customFetcher from '../../../utils';
import { useRouter } from 'next/router';


export const getStaticPaths = async () => {
  try {
    const res = await fetch("https://church-database-backend.onrender.com/baptism/special/get")
    const data = await res.json()

    const paths = data.map(baptism => {
      return {
        params: {id: baptism.id.toString()}
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
    const res = await fetch(`https://church-database-backend.onrender.com/baptism/special/get/${id}`)
    const data = await res.json()

    return {
      props: { baptism: data }
    }
  }
  catch (error) {}
}


const UpdateBaptism = ({ showFlashFunc, baptism }) => {
  const [baptismName, setBaptismName] = useState("")
  const [dateSetUp, setDateSetUp] = useState("")
  const [minister, setMinister] = useState("")
  const router = useRouter()

  const updateBaptism = async () => {
    let body = {
        baptism_name: baptismName.trim(),
        baptism_date: dateSetUp.trim(),
        minister: minister.trim()
      }
      try {
        let {response, data} = await customFetcher(`baptism/update/${baptism.id}`, 
        {body: JSON.stringify(body), 
          "method": "PUT"})
        showFlashFunc(data.detail.message, data.detail.success)
        if (data.detail.success) {
          router.push("/baptisms/all")
        }
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    const setBaptism = () => {
      try {
        setBaptismName(baptism.baptism_name)
        setDateSetUp(baptism.baptism_date)
        setMinister(baptism.minister)
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    useEffect(() => {
      if (!localStorage.getItem('church-access-token')) {
        router.push("/auth/login")
        showFlashFunc("You are not logged in!", false)
      }
      else {
        setBaptism()
      }
    }, [])

    return ( 
        <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
      pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faWater} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Update Baptism</h1>
        </div>
        <div className='w-11/12 m-auto h-56 overflow-auto pb-5'>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faWater} />
            </div>
            <input type="text" placeholder="Baptism name" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setBaptismName(e.target.value) }} value={baptismName}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <input type="text" placeholder="officiating minister" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setMinister(e.target.value) }} value={minister}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <input type="date" placeholder="Date of baptism" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDateSetUp(e.target.value) }} value={dateSetUp}/>
            </div>
        </div>
        <div className="w-11/12 m-auto mt-4 flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { updateBaptism() }}>Update baptism</button>
        </div>
      </div>
    </div>
     );
}
 
export default UpdateBaptism;