"use client"

import { useEffect, useRef } from "react"
import { Users, Calendar, Compass, Code, Target, MessageSquare } from "lucide-react"

const offerings = [
  {
    icon: Users,
    title: "Small Group Mentorship",
    description: "12–15 students per batch for personalized attention and peer learning",
  },
  {
    icon: Calendar,
    title: "Live Mentor Sessions",
    description: "3–4 weekend sessions monthly with engineers from Google, Amazon & top firms",
  },
  {
    icon: Compass,
    title: "Step-by-Step Guidance",
    description: "Clear direction on what to learn, when, and how—based on your current level",
  },
  {
    icon: Code,
    title: "Project-Based Learning",
    description: "Build real projects with peers instead of grinding alone through tutorials",
  },
  {
    icon: Target,
    title: "Weekly Accountability",
    description: "Regular feedback, direction, and personal accountability to keep you on track",
  },
  {
    icon: MessageSquare,
    title: "Doubt Support System",
    description: "Group-based doubt resolution with dedicated senior ensuring you're never stuck long",
  },
]

const Wrapper = () => {
  const sliderRef = useRef(null)
  const animationFrameId = useRef(null)
  const isPaused = useRef(false)
  const translateX = useRef(0)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const speed = 1.5
    const cardWidth = 384 + 32 // w-96 (384px) + gap-8 (32px)
    const totalOriginalWidth = cardWidth * offerings.length

    const animate = () => {
      if (!isPaused.current) {
        translateX.current += speed

        if (translateX.current >= totalOriginalWidth) {
          translateX.current = 0
        }

        slider.style.transform = `translateX(-${translateX.current}px)`
      }
      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  // Pause/resume handlers for both mouse and touch
  const handlePause = () => { isPaused.current = true }
  const handleResume = () => { isPaused.current = false }

  const tripleOfferings = [...offerings, ...offerings, ...offerings]

  return (
    <div className="w-full relative overflow-hidden py-12 bg-gradient-to-b from-emerald-500 to-blue-600">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse pointer-events-none"></div>
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/30 transform rotate-12 scale-150"></div>
      </div>
      
      <div className="relative z-10">
        <div className="w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-8 whitespace-nowrap"
            style={{
              width: `calc(3 * 384px * ${offerings.length} + 3 * 32px * ${offerings.length})`,
            }}
          >
            {tripleOfferings.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={index}
                  className="flex-none w-96 min-h-48 p-6 bg-white border-2 border-gray-200 rounded-3xl text-gray-800 flex flex-col justify-between cursor-pointer group whitespace-normal shadow-xl hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 ease-in-out"
                  onMouseEnter={handlePause}
                  onMouseLeave={handleResume}
                  onTouchStart={handlePause}
                  onTouchEnd={handleResume}
                >
                  <p className="text-base leading-relaxed mb-4 text-gray-700 break-words">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-blue-600 shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wrapper
