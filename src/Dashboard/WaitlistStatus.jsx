import React, { useEffect } from 'react';
import { useWaitlistStore } from '../store/useWaitlistStore';
import { useUserStore } from '../store/useUserStore';

const WaitlistStatus = () => {
  const { userWaitlistEntries, getUserWaitlistEntries, removeFromWaitlist, isLoading } = useWaitlistStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user?.id) {
      getUserWaitlistEntries(user.id);
    }
  }, [user, getUserWaitlistEntries]);

  const handleRemoveFromWaitlist = async (mentorId) => {
    if (user?.id) {
      await removeFromWaitlist(user.id, mentorId);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Waitlist Status</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!userWaitlistEntries || userWaitlistEntries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Waitlist Status</h2>
        <p className="text-gray-600">You are not on any waitlists.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Waitlist Status</h2>
      <div className="space-y-3">
        {userWaitlistEntries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{entry.mentor.name}</p>
              <p className="text-sm text-gray-600">{entry.mentor.email}</p>
              <p className="text-xs text-gray-500">
                Joined: {new Date(entry.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleRemoveFromWaitlist(entry.mentorId)}
              className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Make a payment to automatically get assigned to mentors when slots become available!
        </p>
      </div>
    </div>
  );
};

export default WaitlistStatus; 