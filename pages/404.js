import Link from "next/link";

const NotFounc = () => {
    return ( 
        <div className="w-screen h-screen pt-32 bg-slate-900 text-center text-slate-100 absolute 
        top-0 left-0">
            <h1 className="text-9xl">404</h1>
            <p className="text-xl mt-5">Page Not Found</p>
            <Link href="/"><p className="w-fit p-1 border-2 texl-lg m-auto mt-5 rounded-md
            hover:text-lg hover:bg-slate-700">
                Go Back</p></Link>
        </div>
     );
}
 
export default NotFounc;