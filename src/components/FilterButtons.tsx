// src/components/FilterButtons.tsx

interface FilterButtonsProps {
  filter: number;
  onFilterChange: (filter: number) => void;
}

const filterOptions = [
  {
    label: "All",
    value: -1,
  },
  {
    label: "Completed",
    value: 0,
  },
  {
    label: "Incomplete",
    value: 1,
  },
];
const FilterButtons = ({ filter, onFilterChange }: FilterButtonsProps) => {
  return (
    <div className="my-4 lg:y-6">
      <div className="flex justify-center gap-2 flex-wrap">
        {filterOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => onFilterChange(option.value)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === option.value
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-colors duration-300`}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
