import React from "react";
import { Field } from "formik";

//The component renders the input for Froup Description
function Description({error}) {
  return (
    <div>
      <label htmlFor="description" className="block text-[#6c7b91] font-semibold mb-1">Add Description</label>
      <Field
        as="textarea"
        name="description"
        id="description"
        className={`w-4/6 border-2 h-40 p-2 rounded-lg ${error? 'border-[#cc1313]' : 'border-gray-300'}`}
        placeholder="Describe the group..."
        required
      />
    </div>
  );
}

export default Description;