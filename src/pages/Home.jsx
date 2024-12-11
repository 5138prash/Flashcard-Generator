import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../redux/reducers/cardSlice"; // Redux action to create a card
import { Formik, Form, FieldArray } from "formik"; // Formik for form handling
import ValidationSchema from "../schemas/ValidationSchema"; // Import Yup schema for validation
import Title from "../components/createFlashCard/Title"; // Title input component
import UploadImage from "../components/createFlashCard/UploadImage"; // Image upload component
import TermList from "../components/createFlashCard/TermList"; // Term list component for flashcards
import Description from "../components/createFlashCard/Description"; // Description input component
import { toast } from "react-toastify"; // Toast notifications for feedback

function Home() {
  const dispatch = useDispatch(); // Initialize Redux dispatch function
  const [isBlurred, setIsBlurred] = useState(true); // State to track form field completion
  
  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    try {
      // Fetch existing flashcards from localStorage (if any)
      const existingCards = JSON.parse(localStorage.getItem('flashCards')) || [];
      const updatedCards = [...existingCards, values]; // Add new flashcard to the list
      // Save updated flashcards back to localStorage
      localStorage.setItem('flashCards', JSON.stringify(updatedCards));
      toast.success("Flashcard updated successfully"); // Show success notification
    } catch (error) {
      console.error('Flashcard is unable to store:', error); // Log error if saving to localStorage fails
    }

    dispatch(createCard(values)); // Dispatch action to create card in Redux store
    resetForm(); // Reset form fields after submission
  };

  // Validate if the necessary fields are filled for controlling the blur effect
  const checkBlurStatus = (values) => {
    // If any of the required fields are empty, set blur effect to true
    if (!values.title || !values.description || !values.uploadImage) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false); // Remove blur if all fields are filled
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          description: '',
          uploadImage: null,
          termCards: [{ term: '', definition: '', image: null }],
        }}
        validationSchema={ValidationSchema} // Use Yup schema for validation
        onSubmit={handleSubmit} // Submit handler
        validateOnChange={true} // Validate on change
        validateOnBlur={true} // Validate on blur
      >
        {({ values, setFieldValue, errors, touched }) => {
          checkBlurStatus(values); // Check blur status on every render

          return (
            <Form className="w-[90vw] sm:w-[80vw] mx-auto min-h-[60vh] mt-3">
              <div className="shadow-lg w-full bg-[#fff] p-5 rounded-xl">
                {/* Title and Upload Image Section */}
                <div className="flex sm:items-center flex-wrap flex-col sm:flex-row">
                  <div>
                    <Title error={errors.title && touched.title} /> {/* Title input field */}
                    {errors.title && touched.title && (
                      <div className="text-[#cc1313] text-xs mb-1">{errors.title}</div>
                    )}
                  </div>

                  <div className="flex flex-col pb-2">
                    <UploadImage
                      setFieldValue={setFieldValue}
                      uploadImage={values.uploadImage}
                      error={touched.uploadImage && errors.uploadImage}
                      titleError={errors.title && touched.title}
                    />
                  </div>
                </div>

                {/* Description Section */}
                <Description error={errors.description && touched.description} />
                {errors.description && touched.description && (
                  <div className="text-[#cc1313] text-xs mt-2">{errors.description}</div>
                )}
              </div>

              {/* Conditional section to control the blur effect */}
              <div id="conditional" className={ ` ${isBlurred ? 'conditional' : ''}`}>
                <div id="card-items">
                  <FieldArray
                    name="termCards" // Render an array of terms and definitions
                    render={(arrayHelpers) => (
                      <TermList
                        termCards={values.termCards}
                        arrayHelpers={arrayHelpers}
                        errors={errors.termCards || []}
                        touched={touched.termCards || []}
                      />
                    )}
                  />
                </div>
                {/* Submit Button */}
                <div className="flex justify-center mt-7">
                  <button type="submit" className="btn bg-[#cc1313] text-white rounded-lg w-40 py-2">
                    Create
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Home;
