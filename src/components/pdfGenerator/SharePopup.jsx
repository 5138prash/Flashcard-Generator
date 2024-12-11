import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


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
    <div  className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Share</h3>
        <div className="flex justify-around mb-4">
          {/* Icons for different social media apps */}
          <FaFacebookF
            className="cursor-pointer hover:text-blue-600"
            onClick={() => handleAppShare("fb://", "https://www.facebook.com")}
          />
          <FaLinkedinIn
            className="cursor-pointer  hover:text-blue-500"
            onClick={() =>
              handleAppShare("linkedin://", "https://www.linkedin.com")
            }
          />
          <FaWhatsapp
            className="cursor-pointer  hover:text-green-500"
            onClick={() =>
              handleAppShare(
                "whatsapp://send?text=",
                "https://www.whatsapp.com"
              )
            }
          />
          <FaXTwitter
            className="cursor-pointer  hover:text-zinc-500"
            onClick={() =>
              handleAppShare(
                "twitter://post?message=",
                "https://www.twitter.com"
              )
            }
          />
          <FaEnvelope
            className="cursor-pointer hover:text-[#cc1313]"
            onClick={() =>
              handleAppShare("mailto:?body=", "https://mail.google.com")
            }
          />
        </div>
        {/* Input field displaying the current page URL */}
        <input
          type="text"
          value={window.location.href}
          readOnly
          className="w-full p-2 border rounded mb-4"
        />
        {/* Button to copy the current page URL */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={() => copyToClipboard(window.location.href)} // Copy current URL to clipboard
        >
          Copy Link
        </button>
        {/* Close button to close the popup */}
        <button
          className="w-full bg-[#cc1313] text-white py-2 rounded mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
