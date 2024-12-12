import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { MdOutlineContentCopy } from "react-icons/md";



// Function to handle sharing to different apps
// It triggers the app's URL scheme or falls back to opening a web URL
const handleAppShare = (appUrlScheme, webUrl) => {
  // Creating a hidden iframe to trigger the app's URL scheme
  const ifr = document.createElement("iframe");
  ifr.style.display = "none"; // Hiding the iframe from view
  ifr.src = appUrlScheme; // Setting the URL scheme for the app
  document.body.appendChild(ifr);

  const now = Date.now();

  // Set a timeout to open the web URL if the app didn't respond in time
  setTimeout(() => {
    if (Date.now() - now < 2000) {
      window.open(webUrl, "_blank"); // Open web URL in a new tab if app scheme fails
    }
    document.body.removeChild(ifr); // Clean up iframe after attempt
  }, 1500);
};

// Function to copy text to clipboard
const copyToClipboard = (text) => {
  // Check if the browser supports the Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    // Use Clipboard API to copy text
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err); // Log error if failed
      });
  } else {
    // Fallback for browsers that don't support Clipboard API
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Position textarea off-screen
    textarea.style.opacity = 0; // Make textarea invisible
    document.body.appendChild(textarea);
    textarea.focus(); // Focus textarea to enable select
    textarea.select(); // Select the text to be copied
    try {
      document.execCommand("copy"); // Attempt to copy using execCommand (older method)
      console.log("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err); // Log error if failed
    }
    document.body.removeChild(textarea); // Clean up textarea element
  }
};

// SharePopup component - Displays a popup for sharing the current URL to different apps
const SharePopup = ({ onClose }) => {
  return (
    <div  className="fixed  inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#f5f1ec] p-6 rounded-lg  w-[500px] ">
        <h3 className="text-lg font-semibold mb-4">Share</h3>
        
        
        <div className="share-input w-full flex gap-2 items-center justify-around rounded-lg bg-[#fff] shadow-xl">
        <input
          type="text"
          value={window.location.href}
          readOnly
          className="w-3/4 p-2 bg-[#fff] rounded "
        />

        {/* Button to copy the current page URL */}
        <button
          className=" hover:text-blue-500  rounded text-2xl"
          onClick={() => copyToClipboard(window.location.href)} // Copy current URL to clipboard
        >
          <MdOutlineContentCopy />
        </button>
        {/* Close button to close the popup */}
        <button
          className="text-2xl hover:text-[#cc1313]  rounded "
          onClick={onClose}
        >
        <TiDelete/>
        </button>

        </div>

        {/* Input field displaying the current page URL */}
        <div className="flex w-full  justify-around  my-5">
          {/* Icons for different social media apps */}
          <FaFacebookF
            className="cursor-pointer hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/30 rounded-full bg-white p-2 text-4xl"
            onClick={() => handleAppShare("fb://", "https://www.facebook.com")}
          />
          <FaLinkedinIn
            className="cursor-pointer  hover:text-blue-500 hover:shadow-lg hover:shadow-blue-500/30 rounded-full bg-white p-2 text-4xl"
            onClick={() =>
              handleAppShare("linkedin://", "https://www.linkedin.com")
            }
          />
          <FaWhatsapp
            className="cursor-pointer  hover:text-green-500 hover:shadow-lg hover:shadow-green-500/30 rounded-full bg-white p-2 text-4xl"
            onClick={() =>
              handleAppShare(
                "whatsapp://send?text=",
                "https://www.whatsapp.com"
              )
            }
          />
          <FaXTwitter
            className="cursor-pointer  hover:text-zinc-500 hover:shadow-lg hover:shadow-gray-500/30 rounded-full bg-white p-2 text-4xl"
            onClick={() =>
              handleAppShare(
                "twitter://post?message=",
                "https://www.twitter.com"
              )
            }
          />
          <FaEnvelope
            className="cursor-pointer hover:shadow-lg hover:shadow-red-500/30 hover:text-[#cc1313] rounded-full bg-white p-2 text-4xl"
            onClick={() =>
              handleAppShare("mailto:?body=", "https://mail.google.com")
            }
          />
        </div>
        
      </div>
    </div>
  );
};

export default SharePopup;
