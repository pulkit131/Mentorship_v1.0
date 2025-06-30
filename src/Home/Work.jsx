import React from 'react';
import { 
  Users, 
  BookOpen, 
  Video, 
  MessageCircleQuestion, 
  MapPin
} from 'lucide-react';

const steps = [
  {
    icon: Users,
    title: "Mentor Match",
    description: "You'll be paired with a mentor from a top tech company—based on your goals and tech stack.",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: BookOpen,
    title: "Small Learning Batches",
    description: "Learn in groups of 8–15 students for better peer learning and shared doubt solving.",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Video,
    title: "Live Sessions",
    description: "Get guidance on your overall tech journey and on topics like DSA, System Design, Resume Review, and Mock Interviews.",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: MessageCircleQuestion,
    title: "Dedicated Doubt Support",
    description: "Raise unlimited doubts—your mentor will guide you or connect you with others who've cracked it.",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    icon: MapPin,
    title: "Personalized Roadmaps",
    description: "Every student receives a step-by-step roadmap based on their target company and current skill level.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-100"
  }
];

const Work = () => (
  <div className="bg-gradient-to-b from-emerald-500 to-white min-h-[500px]">
    {/* Hero Section */}
    <div className="pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
          How It Works
        </h1>
        <p className="font-normal text-xl text-center leading-[31px] mb-6 max-w-2xl mx-auto">
          Experience a structured, mentor-led journey that builds your skills and prepares you for real-world opportunities in tech.
        </p>
      </div>
    </div>

    {/* Steps Section */}
    <div className="px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="hidden lg:grid grid-cols-5 gap-8 -mt-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                  <IconComponent className={`w-10 h-10 ${step.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{step.title}</h3>
                <p className="text-base text-gray-700 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 ${step.color}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-base text-gray-700 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export default Work;
