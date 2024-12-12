import { Link } from "react-router-dom"

// Route component for handling the default (404) page not found scenario.
export default function NotFound() {
    return (
        <div className="w-[90vw] sm:w-[80vw] mx-auto mt-3 flex flex-col gap-5 justify-center items-center min-h-[300px]  rounded-xl">
            <div className="w-full flex flex-col gap-5 items-center justify-center min-h-[600px]">
                    <p className="text-lg">Oops! No card details found.</p>
                    <Link to={'/'}> <div className="flex justify-center  px-4 py-2 rounded-lg bg-[#cc1313] text-[#fff] hover:bg-red-600 shadow-lg shadow-[#cc1313]/75">
                    <button >
                        <Link to={'/'}>Back to Homepage</Link>
                    </button>
                    </div></Link>
                </div>
        </div>
    )
}
