import { CheckCircle, XCircle } from "lucide-react"

const Info = () => {
  const howItWorksPoints = [
    "Once you register, you're added to a private group with your batch and senior",
    "Mentors take sessions on weekends and give clear action plans",
    "Your senior checks in, tracks progress, helps with resources, and coordinates doubt resolution",
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

  const whyItWorksPoints = [
    "You get weekly direction no guessing what to do next",
    "You learn in a small peer group which keeps you consistent and motivated",
    "You're guided by someone who's already cracked it not just teaching, but mentoring"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600/90 via-white to-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold  leading-tight mb-4 sm:mb-6">
            Tech is confusing when you're on your own.
          </h1>
          <p className="text-base sm:text-md md:text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto">
            We pair you with engineers from Google, Amazon & top tech firms in small batches to personally guide your growth, give direction, and keep you consistent.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-center">
            <div className="flex justify-center lg:justify-self-end">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full max-w-md">
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
            </div>

            <div className="space-y-8 lg:space-y-12 flex flex-col items-center">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full max-w-md">
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

              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full max-w-md">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                    What It's Not:
                  </h2>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  {whatItsNotPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3">
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm sm:text-base lg:text-lg text-black">
                        {point} 
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-self-start">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full max-w-md">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                    Why It Works:
                  </h2>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  {whyItWorksPoints.map((point, index) => (
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
          </div>
          </div>
        </div>
      </div>
  )
}

export default Info