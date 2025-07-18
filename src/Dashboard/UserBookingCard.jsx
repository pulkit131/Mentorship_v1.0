import { Trash2 } from "lucide-react";
const BookingCard = ({ name, date, status, isWaitlist, mentorEmail, onDelete }) => (
  <div className="w-full md:w-[300px] rounded-2xl bg-white shadow-lg border border-gray-200 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl relative">
    {onDelete && (
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        title="Delete booking"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    )}
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-indigo-600">{name}</h3>
      <div className="text-gray-700 text-sm">
        {mentorEmail && <div>Email: {mentorEmail}</div>}
        {date && <div>Time: {new Date(date).toLocaleString()}</div>}
        <div>
          Status:{" "}
          {isWaitlist ? (
            <span className="text-yellow-600">Waitlist</span>
          ) : (
            <span className="text-green-600">{status || "Confirmed"}</span>
          )}
        </div>
      </div>
    </div>
  </div>
);
export default BookingCard;
