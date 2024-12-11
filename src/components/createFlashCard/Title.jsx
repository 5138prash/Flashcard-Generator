import React from "react";
import { Field } from "formik";

//The component renders the input for the Group Title
function Title({error}) {
  return (
    <div className="mb-5">
      <label htmlFor="title" className="block text-[#6c7b91] mb-1 font-semibold">Create Group*</label>
      <div className="flex sm:items-center flex-wrap flex-col sm:flex-row ">
        <Field
          name="title"
          type="text"
          id="title"
         placeholder="Enter the title"
          className={`md:min-w-[400px] border-2 rounded-lg p-2 ${error?'border-[#cc1313]':'border-gray-300'}`}
          required
        />
      </div>
    </div>
  );
}

export default Title;