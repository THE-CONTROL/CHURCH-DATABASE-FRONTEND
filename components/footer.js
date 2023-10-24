import Link from "next/link";

const Footer = ({admin}) => {
    return ( 
        <div className={admin.logged_in ? "bg-slate-800 fixed bottom-0 w-screen text-slate-400 py-1 px-4 flex justify-between text-xs sm:text-sm":
         "bg-slate-800 fixed bottom-0 w-screen text-slate-400 py-1 px-4 text-xs sm:text-sm"}>
            {admin.logged_in && <Link href="/admin/delete"><a className="hover:text-red-700
            text-red-500">Delete Account</a></Link>}
            <a href="https://clinquant-churros-17d5a7.netlify.app/" className="float-right">
                <img src="https://res.cloudinary.com/de49puo0s/image/upload/v1697884155/gloaysc8nlrnimvcxwmi.jpg" className="h-5 w-5 mr-2 float-left rounded-lg" alt="Logo"/></a>
        </div>
     );
}
 
export default Footer;