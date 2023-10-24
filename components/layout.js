import Flash from "./flash";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout ({showFlash, success, clearFlash, admin, showFlashFunc, logOut, children}) {
    return ( 
        <div>
            { children }
            <Flash 
                clearFlash={clearFlash} 
                showFlashFunc={showFlashFunc} 
                success={success}
                showFlash={showFlash}
            />
            <Navbar admin={admin} logOut={logOut}/>
            <Footer admin={admin}/>
        </div>
     );
}

 