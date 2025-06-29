import { Trash2 } from "lucide-react";
const BookingCard = ({ name, onDelete }) => {
  return (
    <div className="w-full md:w-[300px] rounded-2xl bg-white shadow-lg border border-gray-200 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl relative">
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        title="Delete booking"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-indigo-600">{name}</h3>
        <div className="flex items-center gap-2 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg> Time will be informed by mentor
          
        </div>
      </div>
    </div>
  );
};
export default BookingCard;
