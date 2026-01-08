import React from "react";
import { Check, Clock } from "lucide-react";
import { CustomBtn } from "@/app/components/custom-btn";
export function RecentJobsSection() {
  const recentJobs = [
    {
      service: "Electrical Repair",
      title: "Fixed faulty wiring and installed new sockets",
      location: "Independence Layout",
      time: "2 hours ago",
      provider: "Chukwudi O.",
      status: "Completed",
    },
    {
      service: "Plumbing",
      title: "Repaired leaking pipes and replaced bathroom faucet",
      location: "GRA",
      time: "4 hours ago",
      provider: "Emmanuel N.",
      status: "Completed",
    },
    {
      service: "House Cleaning",
      title: "Deep cleaning for 3-bedroom apartment",
      location: "New Haven",
      time: "5 hours ago",
      provider: "Grace A.",
      status: "Completed",
    },
    {
      service: "Carpentry",
      title: "Custom wardrobe installation and repair",
      location: "Trans-Ekulu",
      time: "7 hours ago",
      provider: "Michael I.",
      status: "Completed",
    },
    {
      service: "Mobile Mechanic",
      title: "Car battery replacement and engine check",
      location: "Achara Layout",
      time: "9 hours ago",
      provider: "Daniel U.",
      status: "Completed",
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Jobs Completed so far</h2>
          <p className="text-lg text-gray-600">
            Join thousands of satisfied customers across Enugu getting things
            done right now.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block bg-green-lightbgGreen text-primary text-sm px-3 py-1 rounded-full">
                    {job.service}
                  </span>
                  <div className="flex items-center text-green-600">
                    <Check size={16} className="mr-1" />
                    <span className="text-sm font-medium">{job.status}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                <div className="flex items-center text-gray-500 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-2">
                      {job.provider.charAt(0)}
                    </div>
                    <span className="text-sm">{job.provider}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span className="text-xs">{job.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid place-content-center mt-10">
          <CustomBtn
            title="View All Jobs"
            className=" rounded-full font-semibold text-white px-6 h-[47px] bg-green-darkbggreen hover:bg-opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
