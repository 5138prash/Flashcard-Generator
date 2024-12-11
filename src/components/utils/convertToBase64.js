// Function that converts a File object to base64 format
export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {

      // Check if file exists
      if (!file) {
          resolve(null);
      } else {
          const reader = new FileReader();   // Create a new instance of FileReader

          reader.onload = () => resolve(reader.result); //FileReader onload event: resolve with the base64 string.

          reader.onerror = reject;          // FileReader onerror event: reject with the error

          reader.readAsDataURL(file);       // Read the file as a Data URL (base64 format)
      }
  });
};
