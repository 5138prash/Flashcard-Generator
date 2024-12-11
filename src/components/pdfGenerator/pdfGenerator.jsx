import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { IoDownloadOutline } from "react-icons/io5";
import { BsPrinter } from "react-icons/bs";
import { HiOutlineShare } from "react-icons/hi2";
import SharePopup from "./SharePopup";

// Function to generate the PDF document with card details
const generatePDFDocument = (cardDetails) => {
  const doc = new jsPDF();
  let yOffset = 20; // Y-axis offset for the text to start rendering
  const margin = 20; // Page margin
  const lineHeight = 10; // Space between lines of text
  const pageWidth = doc.internal.pageSize.width; // PDF page width
  const pageHeight = doc.internal.pageSize.height; // PDF page height

  // Function to add a header with customizable text and color
  const addHeader = (text, color) => {
    doc.setTextColor(...color); // Set text color using RGB values
    doc.setFontSize(16); // Set font size for the header
    doc.setFont("helvetica", "bold"); // Set font type and style
    doc.text(text, margin, yOffset); // Add the header text at specified coordinates
    yOffset += lineHeight * 2; // Adjust the Y offset for the next content
    doc.setTextColor(0, 0, 0); // Reset text color to black
    doc.setFontSize(12); // Set normal font size for content
    doc.setFont("helvetica", "normal"); // Set normal font style
  };

  // Function to add content with text wrapping
  const addContent = (content) => {
    const maxWidth = pageWidth - margin * 2; // Calculate available width for content
    const contentLines = doc.splitTextToSize(content, maxWidth); // Split content into multiple lines if needed
    contentLines.forEach((line) => {
      doc.text(line, margin, yOffset); // Add each line of content to the PDF
      yOffset += lineHeight; // Move the Y offset down for the next line
      if (yOffset > pageHeight - margin) { // Check if content exceeds the page height
        doc.addPage(); // Add a new page if needed
        yOffset = margin; // Reset Y offset to start from the top of the new page
      }
    });
  };

  // Function to add an image with a border around it
  const addImageWithBorder = (image) => {
    const imageHeight = 50; // Image height
    const imageWidth = 50; // Image width
    if (yOffset + imageHeight > pageHeight - margin) { // Check if image fits on the current page
      doc.addPage(); // Add a new page if the image doesn't fit
      yOffset = margin; // Reset Y offset
    }
    doc.addImage(image, "JPEG", margin, yOffset, imageWidth, imageHeight); // Add image to the PDF
    doc.rect(margin - 2, yOffset - 2, imageWidth + 4, imageHeight + 4); // Draw a border around the image
    yOffset += imageHeight + 10; // Adjust Y offset for the next content
  };

  // Adding the group title header with blue color
  addHeader(`Group Title: ${cardDetails.title}`, [0, 0, 255]);

  // Adding the uploaded image if available
  if (cardDetails.uploadImage) {
    addImageWithBorder(cardDetails.uploadImage);
  }

  // Adding the group description section
  addHeader("Group Description:", [255, 0, 0]);
  addContent(cardDetails.description);

  // Adjusting Y offset before adding term cards
  yOffset += lineHeight;

  // Iterating over each term card to add its term and definition
  cardDetails.termCards.forEach((card, index) => {
    addHeader(`${index + 1}. Term: ${card.term}`, [0, 128, 0]);
    addContent(card.definition);

    // Adding image for the term card if available
    if (card.image) {
      addImageWithBorder(card.image);
    }

    yOffset += lineHeight; // Adjust Y offset after each term card
    if (yOffset > pageHeight - margin) { // Check if the content exceeds the page height
      doc.addPage(); // Add a new page if needed
      yOffset = margin; // Reset Y offset for the new page
    }
  });

  return doc; // Return the generated document
};

// Function to generate and download the PDF
const generatePDF = (cardDetails) => {
  const doc = generatePDFDocument(cardDetails); // Generate the PDF document
  doc.save("flashcards.pdf"); // Download the PDF with a specified filename
};

// Function to generate and print the PDF
const printPDF = (cardDetails) => {
  const doc = generatePDFDocument(cardDetails); // Generate the PDF document
  window.open(doc.output("bloburl"), "_blank").print(); // Open the PDF in a new window and trigger print
};

// React component for Flashcard PDF Generator
const FlashcardPDFGenerator = ({ cardDetail }) => {
  const [showSharePopup, setShowSharePopup] = useState(false); // State to manage visibility of the share popup

  // Function to toggle the visibility of the share popup
  const handleShareClick = () => {
    setShowSharePopup(!showSharePopup);
  };

  return (
    <div className="relative">
      {/* Buttons for share, download, and print actions */}
      <div className="sm:flex gap-2 lg:block bg-white-300 rounded-lg">
        <button
          className="w-full min-w-[135px] flex flex-wrap items-center justify-center lg:justify-start bg-white hover:bg-[#cc1313] text-gray-500 hover:text-white font-semibold py-2 px-8 rounded-lg mb-2 shadow-lg"
          onClick={handleShareClick}
        >
          <HiOutlineShare className="inline-block mr-2" />
          Share
        </button>
        <button
          className="w-full min-w-[230px] flex flex-wrap items-center justify-center lg:justify-start bg-white hover:bg-[#cc1313] text-gray-500 hover:text-white font-semibold py-2 px-8 rounded-lg mb-2 shadow-lg"
          onClick={() => generatePDF(cardDetail)} // Generate and download PDF
        >
          <IoDownloadOutline className="inline-block mr-2" />
          Download
        </button>
        <button
          className="w-full min-w-[135px] flex flex-wrap items-center justify-center lg:justify-start bg-white hover:bg-[#cc1313] text-gray-500 hover:text-white font-semibold py-2 px-8 rounded-lg mb-2 shadow-lg"
          onClick={() => printPDF(cardDetail)} // Generate and print PDF
        >
          <BsPrinter className="inline-block mr-2" />
          Print
        </button>
      </div>

      {/* Display the share popup if the state is true */}
      {showSharePopup && (
        <SharePopup onClose={() => setShowSharePopup(false)} />
      )}
    </div>
  );
};

export default FlashcardPDFGenerator;
