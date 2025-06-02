import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCheck, FaClock, FaShieldAlt,
  FaMapMarkerAlt, FaCreditCard, FaGasPump, FaTools
} from "react-icons/fa";

const faqs = [
  {
    question: "What are the requirements to rent a vehicle?",
    answer: "You need a valid driving license, a government-issued ID, and a credit or debit card for payment.",
    icon: <FaUserCheck />
  },
  {
    question: "How long can I rent a vehicle?",
    answer: "You can rent a vehicle for a few hours to several weeks, depending on your preference.",
    icon: <FaClock />
  },
  {
    question: "Is insurance included in the rental price?",
    answer: "Yes, basic insurance is included, but you can opt for additional coverage.",
    icon: <FaShieldAlt />
  },
  {
    question: "Can I pick up and drop off the vehicle at different locations?",
    answer: "Yes, we offer flexible pick-up and drop-off locations based on availability.",
    icon: <FaMapMarkerAlt />
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, UPI, and digital wallets.",
    icon: <FaCreditCard />
  },
  {
    question: "Do I need to return the vehicle with a full tank?",
    answer: "Yes, vehicles should be returned with the same fuel level as when rented to avoid extra charges.",
    icon: <FaGasPump />
  },
  {
    question: "What if the vehicle breaks down during my trip?",
    answer: "We provide 24/7 roadside assistance to help you with any issues.",
    icon: <FaTools />
  }
];

const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative bg-black w-full min-h-screen flex justify-center p-6 md:p-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="w-full max-w-3xl rounded-xl p-6 md:p-8 relative z-10 shadow-2xl">
        <div className="text-center">
          <h1 className="text-xl font-medium text-white">Vehicle Rental FAQs</h1>
          <p className="text-gray-400 mt-2">
            Got questions? We have answers! Can't find what you're looking for? <br />
            <a href="mailto:support@ryde.com" className="text-white underline hover:text-blue-400 transition">
              Email us
            </a>{" "}
            or call <span className="font-medium text-white">+91 8307872368</span>.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-black rounded-lg transition-all duration-300 border border-white/10"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-3 text-white">
                  <div className="text-xl">{faq.icon}</div>
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                </div>
                <span
                  className={`transition-transform duration-300 text-white ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-gray-300 ml-10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
