import { Trash2 } from "lucide-react";

const MentorBookingCard = ({ name, date, userEmail, status }) => (
  <div className="w-full md:w-[320px] rounded-2xl bg-white shadow-xl border border-gray-100 p-6 relative transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-red-500 font-medium">Booked by</span>
        <h3 className="text-2xl font-semibold text-indigo-700">{name}</h3>
        {userEmail && <div className="text-gray-700 text-sm">Email: {userEmail}</div>}
      </div>
      <div className="mt-2 text-gray-950 text-base">
        {date && <div>Time: {new Date(date).toLocaleString()}</div>}
        <div>
          Status: <span className="text-green-600">{status || "Confirmed"}</span>
        </div>
        <p>Kindly email your available time slots to the user.</p>
      </div>
    </div>
  </div>
);

export default MentorBookingCard;