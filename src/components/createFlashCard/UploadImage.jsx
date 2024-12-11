import React, { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineUploadFile } from "react-icons/md";
import { convertToBase64 } from "../utils/convertToBase64";


//The component renders the input image for Group Display Picture
function UploadImage({ uploadImage, setFieldValue, error, titleError }) {
  const uploadImageInputRef = useRef(null);

  const handleChangeuploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file); // Converting the input image into base64
    setFieldValue('uploadImage', base64);
    uploadImageInputRef.current.value = null; // Clear the input value
  };

  return (
    <>
      {uploadImage ? (
        <div className="sm:ml-5 mt-3  flex items-center sm:mt-0 flex gap-1 mb-3 sm:mb-0">
          <img
            src={uploadImage}
            alt="Uploaded"
            className="h-[84px]  w-[84px] object-cover rounded-lg shadow-xl"
          />
          <button
            type="button"
            onClick={() => setFieldValue('uploadImage', null)}
            className="flex items-center justify-center hover:bg-[#cc1313] text-[12px] hover:text-[12px] hover:transition hover:ease-in-out p-[2px] text-[#cc1313]  hover:text-[#fff] rounded-full "
          >
            <MdDelete />
          </button>
        </div>
      ) : (
        <label
          htmlFor="uploadImage"
          className={`display-block w-[150px] sm:inline-block custom-upload-button mt-0 mb-2 sm:mb-0 sm:mt-3 sm:ml-5 cursor-pointer text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-[#fff] p-[5px] h-[43px] rounded-lg ${(titleError && error) ? '' : titleError ? 'sm:mb-4' : error ? 'sm:mt-[40px]' : ''}`}
        >
          <span className="flex items-center justify-center  h-full">
          <MdOutlineUploadFile className="text-2xl mr-1"/>Upload Image

          </span>
        </label>
      )}
      <input
        ref={uploadImageInputRef}
        onChange={handleChangeuploadImage}
        type="file"
        id="uploadImage"
        accept="image/*"
        className="hidden"
      />
      {error && <p className="text-red-500 text-xs sm:mt-2 sm:ml-5">{error}</p>}
    </>
  );
}

export default UploadImage;