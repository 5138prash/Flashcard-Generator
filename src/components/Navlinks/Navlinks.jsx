import {NavLink, useParams } from "react-router-dom";

// Function that provides navigation links.
function NavLinks() {
    const {param} = useParams();  
    return (
      <>
        <nav className="flex flex-col border-gray- pb-[2px] my-4">
        <div className="flex z-10">
        <h2>
        <NavLink to='/' className={`h-full text-lg font-semibold text-gray-500 mr-2 pb-1 ${param === '/' ? 'active':''}`}>Create New</NavLink>
        </h2>
        <h2>
        <NavLink to='/MyFlashCard' className={`h-full text-lg font-semibold text-gray-500 ml-2 pb-1 ${param === '/MyFlashCard' ? 'active':''}`}>My FlashCard</NavLink>
        </h2>
        </div>

        <div className="border-b-[1px] border-gray-300 w-full relative top-[1px]">
          
        </div>
      </nav>
      </>
    );
  }

  export default NavLinks;