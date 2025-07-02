import { CheckCircle, XCircle } from "lucide-react"

const Info = () => {
  const howItWorksPoints = [
    "Once you register, you're added to a private group with your batch and senior",
    "Mentors take sessions on weekends and give clear action plans",
    "Your senior checks in, tracks progress, helps with resources, and coordinates doubt resolution",
    "Doubts aren't answered 24x7 — but your senior makes sure you're never blocked for long"
  ]

  const whoItsForPoints = [
    "Students (from 1st year onward) feeling overwhelmed or unsure where to start",
    "Learners stuck in tutorial overload with no real progress",
    "Placement-focused students who want honest feedback, structure, and mentorship"
  ]

  const whatItsNotPoints = [
    "Not a course",
    "Not recorded videos",
    "Not vague or generic \"mentorship\""
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600/90 via-white to-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold  leading-tight mb-4 sm:mb-6">
            Tech is confusing when you're on your own.
          </h1>
          <p className="text-base sm:text-md md:text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto">
            We pair you with engineers from Google, Amazon & top tech firms — in small batches — to personally guide your growth, give direction, and keep you consistent.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Left Half - How It Works */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full"></div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                How It Works:
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {howItWorksPoints.map((point, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Half - Who It's For */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full"></div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                Who It's For:
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {whoItsForPoints.map((point, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Center - What It's Not */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full"></div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-center">
                What It's Not:
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {whatItsNotPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-black sm:text-center">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info