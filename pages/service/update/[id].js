import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleRoof, faUser, faCalendarDays, faFileLines, faUsers, faClock } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import customFetcher from '../../../utils';
import { useRouter } from 'next/router';


export const getStaticPaths = async () => {
  try {
    const res = await fetch("https://church-database-backend.onrender.com/service/special/get")
    const data = await res.json()

    const paths = data.map(service => {
      return {
        params: {id: service.id.toString()}
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
    const res = await fetch(`https://church-database-backend.onrender.com/service/special/get/${id}`)
    const data = await res.json()

    return {
      props: { service: data }
    }
  }
  catch (error) {
    return {
      props: { service: {} },
      notFound: true
    };
  }
}


const UpdateService = ({ showFlashFunc, service }) => {
    const [serviceName, setServiceName] = useState("")
    const [description, setDescription] = useState("")
    const [serviceType, setServiceType] = useState("")
    const [noMen, setNoMen] = useState("")
    const [noWomen, setNoWomen] = useState("")
    const [noChildren, setNoChildren] = useState("")
    const [noVisitor, setNoVisitor] = useState("")
    const [headMinister, setHeadMinister] = useState("")
    const [assistantMinister, setAssistantMinister] = useState("")
    const [dateSetUp, setDateSetUp] = useState("")
    const [timePeriod, setTimePeriod] = useState("")
    const router = useRouter()

  const updateService = async () => {
    let body = {
        service_name: serviceName.trim(),
        service_date: dateSetUp.trim(),
        description: description.trim(),
        service_type: serviceType.trim(),
        no_men: noMen.trim(),
        no_women: noWomen.trim(),
        no_children: noChildren.trim(),
        no_visitors: noVisitor.trim(),
        head_minister: headMinister.trim(),
        assistant_minister: assistantMinister.trim(),
        time_period: timePeriod.trim()
      }
      try {
        let {response, data} = await customFetcher(`service/update/${service.id}`, 
        {body: JSON.stringify(body), 
          "method": "PUT"})
        showFlashFunc(data.detail.message, data.detail.success)
        if (data.detail.success) {
          router.push("/service/all")
        }
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    const setservice = () => {
      try {
        setServiceName(service.service_name)
        setDescription(service.description)
        setServiceType(service.service_type)
        setNoMen(service.no_men)
        setNoWomen(service.no_women)
        setNoChildren(service.no_children)
        setNoVisitor(service.no_visitors)
        setHeadMinister(service.head_minister)
        setAssistantMinister(service.assistant_minister)
        setDateSetUp(service.service_date)
        setTimePeriod(service.time_period)
      }
      catch (error) {showFlashFunc("Request failed, check your network connection and try again!", false)}
    }

    useEffect(() => {
      if (!localStorage.getItem('church-access-token')) {
        router.push("/auth/login")
        showFlashFunc("You are not logged in!", false)
      }
      else {
        setservice()
      }
    }, [])

    return ( 
        <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto
      pt-20">
      <div className="w-64 sm:w-96 m-auto rounded-3xl">
        <div className="w-11/12 m-auto p-2">
          <div className='text-white w-11/12 m-auto text-8xl text-center'>
            <FontAwesomeIcon icon={faPeopleRoof} />
          </div>
          <h1 className="text-center text-3xl font-semibold text-white">Update Service</h1>
        </div>
        <div className='w-11/12 m-auto h-56 overflow-auto pb-5'>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faPeopleRoof} />
            </div>
            <input type="text" placeholder="Service name" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setServiceName(e.target.value) }} value={serviceName}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <input type="text" placeholder="Minister's name" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setHeadMinister(e.target.value) }} value={headMinister}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <input type="text" placeholder="Assistant minister's name" className="w-10/12 
            h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setAssistantMinister(e.target.value) }} value={assistantMinister}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faPeopleRoof} />
            </div>
            <input type="text" placeholder="Service type" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setServiceType(e.target.value) }} value={serviceType}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faFileLines} />
            </div>
            <input type="text" placeholder="Description" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDescription(e.target.value) }} value={description}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUsers} />
            </div>
            <input type="text" placeholder="No of men" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setNoMen(e.target.value) }} value={noMen}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUsers} />
            </div>
            <input type="text" placeholder="No of women" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setNoWomen(e.target.value) }} value={noWomen}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUsers} />
            </div>
            <input type="text" placeholder="No of children" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setNoChildren(e.target.value) }} value={noChildren}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faUsers} />
            </div>
            <input type="text" placeholder="No of visitors" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setNoVisitor(e.target.value) }} value={noVisitor}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faClock} />
            </div>
            <input type="text" placeholder="Time lasted" className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setTimePeriod(e.target.value) }} value={timePeriod}/>
            </div>
            <div className="w-11/12 bg-white m-auto mt-6 flex justify-end shadow-gray-900 shadow-sm
            hover:shadow-md hover:shadow-gray-900 rounded-md">
            <div className="w-2/12 text-gray-900 text-center text-xl pt-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <input type="date" placeholder="Date" 
            className="w-10/12 h-11 px-2
            bg-white border-l-2 focus:border-2 focus:border-gray-900 focus:outline-0 rounded-md"
            onChange={(e) => { setDateSetUp(e.target.value) }} value={dateSetUp}/>
            </div>
        </div>
        <div className="w-11/12 m-auto mt-4 flex justify-end text-xl rounded-md
        shadow-gray-900 shadow-sm hover:shadow-md hover:shadow-gray-900">
          <button className="w-full bg-yellow-600 h-12 font-semibold text-white rounded-md
          hover:bg-yellow-700"
          onClick={() => { updateService() }}>Update service</button>
        </div>
      </div>
    </div>
     );
}
 
export default UpdateService;