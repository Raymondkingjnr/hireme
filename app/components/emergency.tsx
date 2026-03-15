import React from "react";
import { AlertCircle, Clock } from "lucide-react";
export const EmergencyServicesSection = () => {
  const emergencyServices = [
    "Emergency Plumbing",
    "Electrical Repairs",
    "Locksmith Services",
    "Security Installations",
  ];
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="p-8 md:w-2/3">
              <div className="flex items-center mb-4">
                <AlertCircle size={24} className="text-red-600 mr-2" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Need Urgent Help?
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                24/7 emergency services available for critical situations
              </p>
              <p className="text-gray-700 mb-6">
                Burst pipes? Electrical emergency? We've got you covered around
                the clock. Our emergency response team connects you with
                available professionals within minutes, not hours.
              </p>
              <div className="mb-6">
                <h3 className="font-semibold mb-3">
                  Available Emergency Services:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {emergencyServices.map((service, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="bg-red-600 rounded-full text-white px-6 py-3 hover:bg-red-700 transition-colors w-full sm:w-auto">
                Get Emergency Help Now
              </button>
              <div className="flex items-center mt-4 text-sm text-gray-600">
                <Clock size={14} className="mr-1" />
                <span>Average response time: 45 minutes</span>
              </div>
            </div>
            <div className="bg-red-600 md:w-1/3 flex items-center justify-center p-8">
              <div className="text-white text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3 className="text-2xl font-bold mb-2">Fast Response</h3>
                <p>
                  We prioritize emergency calls and dispatch professionals
                  immediately
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
