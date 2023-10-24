import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


const Flash = ({clearFlash, showFlashFunc, success, showFlash}) => {
    const classes = {
        "con1": "fixed top-[80px] left-0 text-green-200 w-screen bg-green-700 px-[20px] py-[5px] flex flex-row justify-between gap-4",
        "con2": "fixed top-[80px] left-0 text-red-200 w-screen bg-red-700 px-[20px] py-[5px] flex flex-row justify-between gap-4",
        "btn1": "hover:text-green-400",
        "btn2": "hover:text-red-400"
    }
    
    return ( 
        <div className={showFlash ? "block" : "hidden"}>
            <div className={success ? classes.con1 : classes.con2}>
                <h3>{showFlash}</h3>
                <button onClick={clearFlash} 
                className={success ? classes.btn1 : classes.btn2}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
        </div>
     );
}
 
export default Flash;
