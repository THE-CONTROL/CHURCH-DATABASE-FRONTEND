import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross, faUserTie, faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import customFetcher from '../../../utils';
import { useRouter } from 'next/router';


export const getStaticPaths = async () => {
  try {
    const res = await fetch("https://church-database-backend.onrender.com/cottage/special/get")
    const data = await res.json()

    const paths = data.map(cottage => {
      return {
        params: {id: cottage.id.toString()}
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
    const res = await fetch(`https://church-database-backend.onrender.com/cottage/special/get/${id}`)
    const data = await res.json()

    return {
      props: { cottage: data }
    }
  }
  catch (error) {
    return {
      props: { cottage: {} },
      notFound: true
    };
  }
}


const UpdateBranch = ({ showFlashFunc, cottage }) => {
    const [branchName, setBranchName] = useState("")
    const [branchHead, setBranchHead] = useState("")
    const [location, setLocation] = useState("")
    const [dateSetUp, setDateSetUp] = useState("")
    const [assBranchHead, setAssBranchHead] = useState("")
    const router = useRouter()

  const updateBranch = async () => {
    let body = {
      cottage_name: branchName.trim(),
      cottage_head: branchHead.trim(),
      cottage_address: location.trim(),
      date_setup: dateSetUp.trim(),
      assistant_cottage_head: assBranchHead.trim()
    }
    try {
      let {response, data} = await customFetcher(`cottage/update/${cottage.id}`, {body: JSON.stringify(body), 
        "method": "PUT"})
      showFlashFunc(data.detail.message, data.detail.success)
      if (data.detail.success) {
        router.push("/branches/all")
      }
    }
    catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
  }

    const setBranch = () => {
      try {
        setBranchName(cottage.cottage_name)
        setBranchHead(cottage.cottage_head)
        setLocation(cottage.cottage_address)
        setDateSetUp(cottage.date_setup)
        setAssBranchHead(cottage.assistant_cottage_head)
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    useEffect(() => {
      if (!localStorage.getItem('church-access-token')) {
        router.push("/auth/login")
        showFlashFunc("You are not logged in!", false)
      }
      else {
        setBranch()
      }
    }, [])

    return ( 
        <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
      pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faCross} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Update Branch</h1>
        </div>
        <div className='w-11/12 m-auto h-56 overflow-auto pb-5'>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-md
            hover:shadow-lg hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCross} />
            </div>
            <input type="text" placeholder="Branch name" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setBranchName(e.target.value) }} value={branchName}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-md
            hover:shadow-lg hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUserTie} />
            </div>
            <input type="text" placeholder="Branch head" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setBranchHead(e.target.value) }} value={branchHead}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-md
            hover:shadow-lg hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUserTie} />
            </div>
            <input type="text" placeholder="Assistant branch head" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setAssBranchHead(e.target.value) }} value={assBranchHead}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-md
            hover:shadow-lg hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <input type="text" placeholder="Location" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setLocation(e.target.value) }} value={location}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-md
            hover:shadow-lg hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <input type="date" placeholder="Date founded" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDateSetUp(e.target.value) }} value={dateSetUp}/>
            </div>
        </div>
        <div className="w-11/12 m-auto mt-4 flex justify-end text-xl hover:text-2xl rounded-md
        shadow-gray-900 shadow-md hover:shadow-lg hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { updateBranch() }}>Update branch</button>
        </div>
      </div>
    </div>
     );
}
 
export default UpdateBranch;