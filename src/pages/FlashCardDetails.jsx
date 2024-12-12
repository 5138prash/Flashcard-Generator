import { useParams, Link } from "react-router-dom"; // Importing necessary hooks for routing
import { useSelector } from "react-redux"; // Importing Redux hook to access store state
import { MdKeyboardBackspace } from "react-icons/md"; // Importing backspace icon
import Carousel from "../components/carousel/Carousel"; // Importing Carousel component for displaying flashcards
import FlashcardPDFGenerator from "../components/pdfGenerator/pdfGenerator"; // Importing PDF Generator for downloading/printing
import { useState } from 'react'; // Importing useState to manage local state
import NotFound from "./NotFound";

// FlashCardDetails component to show the details of a selected flashcard
export default function FlashCardDetails() {
    const { index } = useParams(); // Retrieving the card index from URL params
    const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index of the term card
    const cardDetail = useSelector(state => state.cards[index]);  // Accessing the specific card using the index from the Redux store

    return (
        <div className="w-[90vw] sm:w-[80vw] mx-auto max-h-full">
            {cardDetail ? (
                <>
                    {/* Flashcard Title and Description */}
                    <div className="w-full flex gap-3 pt-2">
                        <div>
                            {/* Back button to navigate to the previous page */}
                            <button aria-label="previous-page">
                                <Link to='/MyFlashCard' aria-label="previous-page">
                                    <MdKeyboardBackspace className="text-3xl" />
                                </Link>
                            </button>
                        </div>
                        <div className="pl-2 flex flex-col gap-2">
                            <h2 className="text-xl font-semibold">
                                {cardDetail.title}
                            </h2>
                            <div className="text-gray-500">
                                {cardDetail.description}
                            </div>
                        </div>
                    </div>

                    {/* Card Items List */}
                    <div className="w-full lg:flex-row lg:justify-around gap-5 mt-5 flex flex-col">

                        {/* List of Term Cards */}
                        <div className="">
                            <ol className="h-150px lg:max-h-[500px] w-full bg-[#fff] item-term rounded-lg flex overflow-auto lg:flex-col gap-1 inline-block lg:w-[250px] p-2 text-gray-500 shadow-lg">
                                {/* Static List Header for Flashcards */}
                                <li className="px-2 py-1 border-r-2 lg:border-b-2 lg:border-r-0 border-black lg:border-gray-200 lg:text-sm">
                                    Flashcards
                                </li>
                                {/* Map through term cards and display each term */}
                                {cardDetail.termCards.map((item, index) => (
                                    <li key={index} className="border-r-2 lg:border-0 relative">
                                        <button
                                            onClick={() => setCurrentIndex(index)} // Set the selected term index when clicked
                                            className={`px-2 lg:p-1 text-left ${currentIndex === index ? 'active-term font-semibold lg:text-[21px]' : 'lg:text-[20px]'}`}
                                        >
                                            {item.term}
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Carousel Component to display current term's image and definition */}
                        <div className="lg:w-full bg-white rounded-xl shadow-lg py-4 px-6">
                            <Carousel cardDetail={cardDetail} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
                        </div>

                        {/* PDF Generator Component to download/print/share flashcards */}
                        <FlashcardPDFGenerator cardDetail={cardDetail} />
                    </div>
                </>
            ) : (
                // If cardDetail is not found, display an error message and offer to create a new flashcard
                <NotFound/>
            )}
        </div>
    );
}
