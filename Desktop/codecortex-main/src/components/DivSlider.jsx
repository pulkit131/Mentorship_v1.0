import React from "react";
import Image1 from "../assets/machine.jpg";
import Image2 from "../assets/w2a.r.png";
import Image3 from "../assets/w2b.r.png";
import Image4 from "../assets/machine2.jpg";
import Spline from "@splinetool/react-spline";

const DivSlider = () => {
  return (
    <div className="w-full h-full py-[10%] bg-[#6A9DF0]">

      <div className="w-[90%] h-[100vh] sticky top-20 rounded-tl-3xl rounded-tr-3xl bg-white mx-auto flex">

        <div className="w-1/2 bg-black flex flex-col justify-center items-center text-center p-10 pt-4 rounded-tl-3xl rounded-bl-3xl">
          <div className="mx-auto mb-4">
            <iframe
              src="https://my.spline.design/particles-5f22f4dea11bd133bd1a982447684717/"
              frameborder="0"
              width="100%"
              height="160%"
              allowFullScreen
            ></iframe>
          </div>

          <h2 className="text-white text-xl font-semibold mt-20">
            AI Chiller Plant Optimizer
          </h2>
          <p className="text-white mt-4">
            The solution incorporates machine learning algorithms to enhance the
            efficiency of chiller plants by predicting the necessary variables
            required for optimal performance in real time. The system is powered
            by an AI model built using the Random Forest algorithm, which
            analyzes historical and real-time data from the chiller plant. The
            model predicts key variables that influence plant efficiency, such
            as temperature, flow rates, and energy consumption. By understanding
            these variables, the system can directly control and optimize the
            chiller plant's operations, ensuring optimal efficiency and reduced
            energy consumption.
          </p>
        </div>

        <section className="flex justify-center items-center h-screen">
          <div
            className="p-10 rounded-tr-3xl rounded-br-3xl bg-cover bg-center ml-0 mb-10"
            style={{
              backgroundImage: `url(${Image1})`,
              width: "684px",
              height: "690px",
            }}
          >

          </div>
        </section>
      </div>

      <div className="w-[90%] h-[100vh] sticky top-20 rounded-tl-3xl rounded-tr-3xl bg-white mx-auto flex">

        <div className="w-1/2 bg-gray-300 flex flex-col justify-center items-center text-center p-10 rounded-tl-3xl rounded-bl-3xl">
          <img
            src={Image2}
            alt="Optimization Icon"
            className="mx-auto mb-4 w-32 h-32"
          />
          <h2 className="text-xl font-semibold">Chiller Plant Optimization</h2>
          <p className="text-gray-600">
            We are developing an AI-driven solution to optimize the efficiency
            of chiller plants by estimating the necessary variables for optimal
            performance. Our approach involves creating an AI model using the
            Random Forest algorithm to predict key operational variables. These
            predictions will guide the direct control of the chiller plant,
            allowing for real-time adjustments that optimize energy consumption
            and enhance overall plant efficiency. The model will continuously
            monitor variables such as temperature, pressure, and flow rates,
            adjusting the plant's parameters to meet the required operational
            efficiency.
          </p>
        </div>

        <div className="w-1/2 bg-gray-200 flex flex-col justify-center items-center text-center p-10 rounded-tr-3xl rounded-br-3xl">
          <img
            src={Image3}
            alt="Fault Detection Icon"
            className="mx-auto mb-4 w-32 h-32"
          />
          <h2 className="text-xl font-semibold">Fault Detection</h2>
          <p className="text-gray-600">
            In addition to optimization, the solution incorporates a fault
            detection system that relies on real-time sensor data. This system
            is designed to identify potential faults or malfunctions in critical
            components like sensors, pipes, and valves. Using real-time data,
            the fault detection model predicts the likelihood of various faults,
            enabling timely maintenance and reducing downtime. By identifying
            potential issues early, we can prevent costly failures and maintain
            the smooth operation of the chiller plant.
          </p>
        </div>
      </div>

      <div className="w-[90%] h-[100vh] sticky top-20 rounded-tl-3xl rounded-tr-3xl bg-black mx-auto flex">

        <section className="flex justify-center items-center h-screen">
          <div
            className="p-10 rounded-tl-3xl rounded-bl-3xl bg-cover bg-center ml-4 "
            style={{
              backgroundImage: `url(${Image4})`,
              width: "648px",
              height: "729px",
            }}
          >
          </div>
        </section>

        <div className="w-1/2 bg-black flex flex-col justify-center items-center text-center p-10 rounded-tr-3xl rounded-br-3xl ml-5">
          <div className="mx-auto mb-20">
            <iframe
              src="https://my.spline.design/ai-60a38404a0f2fca32ca19ac8abf9de0e/"
              frameborder="0"
              width="100%"
              height="160%"
              allowFullScreen
            ></iframe>
          </div>
          <h2 className="text-white text-xl font-semibold">
            Fault Detection and Prediction
          </h2>
          <p className="text-white">
            The fault detection component is designed to prevent operational
            failures before they occur. Using real-time sensor data, the AI
            model continuously monitors the chiller plant's critical components,
            such as pipes, valves, and sensors. When abnormal readings or
            patterns are detected, the model predicts potential faults (e.g.,
            sensor malfunctions, pipe leaks) and provides alerts, allowing
            maintenance teams to take corrective action before a breakdown
            happens.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DivSlider;
