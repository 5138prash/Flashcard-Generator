import React from "react";
import CardItem from "./CardItem";

//the component renders the Input list to add Card items
function TermList({ termCards, arrayHelpers, errors, touched }) {
  return (
    <div  className="shadow-lg w-full bg-white px-5 py-1 mt-4 rounded-lg">
      <ol>
      {termCards.map((item, index) => (
        <CardItem
          key={index}
          item={item}
          index={index}
          arrayHelpers={arrayHelpers}
          errors={errors[index]}
          touched={touched[index]}
          termCards={termCards}
        />
      ))}
      <button
        type="button"
        className='text-blue-500 font-semibold mt-3'
        onClick={() => arrayHelpers.push({ term: '', definition: '', image: null })}
      >
        + Add more
      </button>
      </ol>
    </div>
  );
}

export default TermList;