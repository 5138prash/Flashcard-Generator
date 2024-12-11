import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteFlashCardButton from "../components/deleteFlashCard/DeleteFlashCard";

// Route component to show all the FlashCards.
export default function MyFlashCard() {
  const myCards = useSelector((state) => state.cards) || []; // Ensure it defaults to an empty array
  const [seeAll, setSeeAll] = useState(false);

  // Manage the number of cards to be displayed.
  const displayedCards = seeAll ? myCards : myCards.slice(0, 6);

  return (
    <div className="w-[90vw] sm:w-[80vw] mx-auto mt-3">
      <ul className="w-full m-0 p-0 flex flex-wrap gap-2 justify- min-h-[60vh] ">
        {displayedCards.map((card, index) => (
          <li
            className="mx-[20px] w-full sm:mx-0 sm:w-[250px] md:w-[378px] relative "
            key={index}
          >
            <div className="inline-block  w-full flex justify-center absolute left-0 top-0 z-10 ">
              <div className="relative w-[80px] h-[80px]">
                <img
                  src={card.uploadImage || "placeholder-image-url"}
                  alt={`Flashcard ${index}`}
                  className="absolute  inset-0 h-full w-full object-cover border-2 rounded-full"
                />
              </div>
            </div>

            <div className="w-full  min-h-[245px] sm:h-[200px] bg-white border-2  shadow-xl rounded-lg mt-8 pt-16 px-4 pb-4 relative flex flex-col">
              <DeleteFlashCardButton index={index} />
              <h3 className="text-center text-xl font-semibold">
                {card.title || "Untitled"}
              </h3>
              <div className="max-h-[55px]  ">
                <p className="text-center py-1 mt-2 text-gray-500 h-full overflow-auto ">
                  {card.description?.length < 30
                    ? card.description
                    : card.description.slice(0, 25) + `...` ||
                      "No description available"}
                </p>
              </div>
              <p className="text-center py-1 text-gray-500 mt-1 font-semibold ">{`${
                card.termCards?.length || 0
              } Cards`}</p>
              <div className="text-center py-1 flex items-end justify-center">
                <Link to={`/card/${card.id || index}`}>
                  <button className="border-[3px] w-[220px] border-[#cc1313] text-[#cc1313] px-7 py-1 rounded-md font-semibold hover:text-[#fff] hover:bg-[#cc1313] transition-colors duration-300 ease-in-out">
                    View Cards
                  </button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {myCards.length > 6 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setSeeAll(!seeAll)}
            className="font-semibold text-[#cc1313]"
          >
            {seeAll ? "See Less" : "See All"}
          </button>
        </div>
      )}
    </div>
  );
}
