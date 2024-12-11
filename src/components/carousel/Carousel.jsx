import React from 'react';
import { FaGreaterThan } from "react-icons/fa6"; // Importing right arrow icon
import { FaLessThan } from "react-icons/fa6"; // Importing left arrow icon

// Carousel component to display term cards with images and definitions
const Carousel = ({ cardDetail, currentIndex, setCurrentIndex }) => {

  // Function to go to the next term card in the carousel
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      // If the current card is the last one, reset to the first card
      prevIndex === cardDetail.termCards.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous term card in the carousel
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      // If the current card is the first one, go to the last card
      prevIndex === 0 ? cardDetail.termCards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container container w-full sm:w-full ">

      {/* Carousel Item: Contains the image and definition of the current term card */}
      <div className='carousel-item flex flex-col lg:flex-row lg:w-full '>
        
        {/* Carousel Image Section */}
        <div className="lg:w-3/4 sm:w-full flex corousel-img overflow-hidden p-2 lg:border-r-[1px] sm:p-5">
          <img
            // Display image if available, else show a placeholder image
            src={cardDetail.termCards[currentIndex].image ? cardDetail.termCards[currentIndex].image : 'placeholder-image-url'}
            alt={`Flashcard ${currentIndex + 1}`}
            className='lg:w-full lg:h-[430px] lg:object-contain rounded-xl sm:object-contain sm:w-full'
          />
        </div>

        {/* Carousel Definition Section */}
        <div className="lg:w-2/4 carousel-defination sm:w-full overflow-auto lg:text-md lg:flex p-5">
          {/* Display the definition of the current term card */}
          {cardDetail.termCards[currentIndex].definition}
        </div>
      </div>

      {/* Carousel Navigation Controls */}
      <div className='flex justify-center gap-2 p-2 text-gray-500'>
        {/* Previous button to go to the previous term card */}
        <button onClick={goToPrevious} aria-label='previous-carousel-item'>
          <FaLessThan />
        </button>

        {/* Display the current index and total number of cards */}
        <p className='px-10'>{currentIndex + 1} / {cardDetail.termCards.length}</p>

        {/* Next button to go to the next term card */}
        <button onClick={goToNext} aria-label='next-carousel-item'>
          <FaGreaterThan />
        </button>
      </div>

    </div>
  );
};

export default Carousel;
