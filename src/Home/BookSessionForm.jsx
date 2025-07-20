import React, { useState, useEffect } from "react";
import { ChevronDown, User, Phone, AtSign } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/useBookingStore";
import { useWaitlistStore } from "../store/useWaitlistStore";
import { axiosInstance } from "../lib/axios";

const BookSessionForm = () => {
  const navigate = useNavigate();
  const { createBooking, getBookingByUser, booking } = useBookingStore();
  const { getUserWaitlistEntries } = useWaitlistStore();

  const [mentors, setMentors] = useState([]);
  const [mentorsLoading, setMentorsLoading] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      setMentorsLoading(true);
      try {
        const res = await axiosInstance.get("/users?role=MENTOR");
        setMentors(res.data);
      } catch (error) {
        setMentors([]);
      } finally {
        setMentorsLoading(false);
      }
    };
    fetchMentors();

    // Auto-fill email from localStorage if available
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setFormData((prev) => ({ ...prev, email: storedEmail }));
    }

    // Listen for changes to userEmail in localStorage (e.g., after login/logout)
    const handleStorage = (event) => {
      if (event.key === "userEmail") {
        setFormData((prev) => ({ ...prev, email: event.newValue || "" }));
      }
    };
    window.addEventListener("storage", handleStorage);

    // Listen for a custom event to handle logout in the same tab
    const handleCustomLogout = (event) => {
      if (event.detail && event.detail.type === "logout") {
        setFormData((prev) => ({ ...prev, email: "" }));
      }
    };
    window.addEventListener("customUserLogout", handleCustomLogout);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("customUserLogout", handleCustomLogout);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    mentor: "",
    timeSlot: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Simple DOM scroll function
  const scrollToPremiumPlans = () => {
    console.log("Attempting to scroll to premium plans...");

    const premiumPlansSection = document.getElementById("premium-plans");
    console.log("Premium plans section found:", premiumPlansSection);

    if (premiumPlansSection) {
      try {
        // Direct DOM scroll
        const targetScroll = premiumPlansSection.offsetTop - 100;
        console.log("Scrolling to position:", targetScroll);

        document.documentElement.scrollTop = targetScroll;
        document.body.scrollTop = targetScroll;

        console.log("DOM scroll executed successfully");
        return true;
      } catch (error) {
        console.error("Scroll failed:", error);
      }
    }

    console.log("Premium plans section not found");
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mentorId = formData.mentor;
    const userId = localStorage.getItem("userId");
    console.log("Fetched userId from localStorage:", userId);
    
    if(!userId){
      return Swal.fire({
                title: "Login",
                icon: "error",
                confirmButtonText: "Okay",
              });
    }
    
    // Validate all fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !mentorId
      // !formData.timeSlot
    ) {
      return Swal.fire({
        title: "Missing Fields",
        text: "Please fill in all fields and select a mentor and time slot.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
    }

    // Validate timeSlot is in the future
    // if (new Date(formData.timeSlot) <= new Date()) {
    //   return Swal.fire({
    //     title: "Invalid Time Slot",
    //     text: "Please select a time slot in the future.",
    //     icon: "warning",
    //     confirmButtonText: "Okay",
    //   });
    // }

    // Prevent booking more than one mentor
    const userBookings = Array.isArray(booking) ? booking : booking ? [booking] : [];
    if (userBookings.length > 0) {
      return Swal.fire({
        title: "Mentor Already Booked",
        text: "You have already booked a mentor.",
        icon: "info",
        confirmButtonText: "Okay",
      });
    }

    // Prevent double booking: check if user already booked this mentor
    const alreadyBooked = userBookings.some(
      (b) => b.mentor && b.mentor.id === mentorId
    );
    if (alreadyBooked) {
      return Swal.fire({
        title: "Already Booked",
        text: "You have already booked this mentor.",
        icon: "info",
        confirmButtonText: "Okay",
      });
    }

    try {
      console.log({
        userId,
        mentorId,
        //timeSlot: new Date(formData.timeSlot).toISOString(),
      });
      const result = await createBooking({ userId, mentorId });
      await getBookingByUser(userId);
      if (result && result.waitlistEntry) {
        await getUserWaitlistEntries(userId);
        console.log(result);
        console.log(result.waitlistEntry)
        Swal.fire({
          title: "Waitlist Token Raised",
          text: "You have been added to the waitlist. Our team will contact you via mail if any vacancy.",
          icon: "info",
          confirmButtonText: "Okay",
        });
        setFormData({
          name: "",
          contact: "",
          email: "",
          mentor: "",
        });
        navigate("/myDashboard");
        return;
      }
      Swal.fire({
        title: "Session Booked!",
        text: "Your session has been successfully booked.",
        icon: "success",
        confirmButtonText: "Great!",
      });

      setFormData({
        name: "",
        contact: "",
        email: "",
        mentor: "",
        //timeSlot: "",
      });
      navigate("/myDashboard");
    } catch (err) {
      console.log("Booking error caught:", err);
      console.log("Error response data:", err?.response?.data);

      // Check if the error is due to payment requirement
      if (err?.response?.data?.requiresPayment) {
        console.log("Payment required error detected");
        Swal.fire({
          title: "Payment Required",
          text: "Please subscribe to a plan before booking sessions.",
          icon: "info",
          confirmButtonText: "View Plans",
          showCancelButton: true,
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(
              "User confirmed, attempting to scroll to premium plans..."
            );
            // Wait for dialog to fully close before scrolling
            setTimeout(() => {
              console.log("Dialog closed, now scrolling...");
              scrollToPremiumPlans();
              // Backup scroll attempt after a longer delay
              setTimeout(() => {
                console.log("Backup scroll attempt...");
                const premiumPlansSection =
                  document.getElementById("premium-plans");
                if (premiumPlansSection) {
                  const targetScroll = premiumPlansSection.offsetTop - 100;
                  console.log("Backup scroll to position:", targetScroll);
                  document.documentElement.scrollTop = targetScroll;
                  document.body.scrollTop = targetScroll;
                }
              }, 500);
            }, 300);
          }
        });
      } else {
        Swal.fire({
          title: "Booking Failed",
          text: err?.message || "Something went wrong.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    }
  };

  return (
    <section id="booking">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-white px-2">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            Book Your Session
          </h1>
          
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg px-8 py-8 gap-4 flex flex-col"
          >
            {/* Name and Contact */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative flex-1">
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12"
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                />

                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12"
                readOnly
              />
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mentor Dropdown */}
            <div className="relative">
              <select
                name="mentor"
                value={formData.mentor}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-lg px-4 py-3 appearance-none"
                disabled={mentorsLoading}
              >
                <option value="">Select Mentor</option>
                {mentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Time Slot */}
            {/* <div className="relative">
              <input
                type="datetime-local"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12"
              />
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book Session
            </button>

            {/* Test button for debugging */}
            {/* <button
              type="button"
              onClick={() => {
                console.log('Testing scroll...');
                scrollToPremiumPlans();
              }}
              className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition mt-2"
            >
              Test Scroll to Premium Plans
            </button> */}
            <p className="text-center text-sm text-gray-700 mt-2">
              1-Hour Interactive Session | Subscription Required
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookSessionForm;