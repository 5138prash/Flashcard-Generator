import { Link } from "react-router-dom"

// Route component for handling the default (404) page not found scenario.
export default function NotFound() {
    return (
        <div className="w-[90vw] sm:w-[80vw] mx-auto mt-3 flex flex-col gap-5 justify-center items-center min-h-[300px]">
            <h1 className="text-lg">
                "404 - Page Not Found"
            </h1>
            <button className="border-2 border-red-500 p-1 rounded-lg bg-white">
                <Link to={'/'}>Create Your New FlashCard</Link>
            </button>
        </div>
    )
}