import { useState } from "react";

const DropdownPerPage = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="relative inline-flex  mx-1 my-1 sm:mx-6">
      <select
        value={selectedOption}
        onChange={(e) => handleOptionChange(e.target.value)}
        className="block appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option} per page
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-4-4h8l-4 4z" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default DropdownPerPage;
