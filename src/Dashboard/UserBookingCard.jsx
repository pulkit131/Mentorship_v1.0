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
        </div>
      </div>
    </div>
  );
};
export default BookingCard;
