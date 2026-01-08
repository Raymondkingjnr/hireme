import React from "react";
import { Star } from "lucide-react";
import { CustomBtn } from "./custom-btn";
import { IReview } from "../page";

export const stories: IReview[] = [
  {
    title: "Saved My Business from Disaster",
    name: "Ngozi Okafor",
    occupation: "Restaurant Owner",
    location: "GRA",
    review:
      "Our restaurant's refrigeration system failed on a Friday night during peak hours. I found an emergency technician through HireMe within 20 minutes. He arrived in less than an hour and had us back up and running before closing time. HireMe literally saved my weekend revenue!",
    service: "Emergency Electrical Repair",
  },
  {
    title: "Finally Found Someone I Can Trust",
    name: "James Eze",
    occupation: "Homeowner",
    location: "Independence Layout",
    review:
      "I've had bad experiences with unreliable handymen in the past. When my ceiling started leaking, I was hesitant to call anyone. HireMe's verification process gave me confidence. The plumber they connected me with was professional, punctual, and fixed the problem permanently. I've used HireMe three times since then.",
    service: "Plumbing Repair",
  },
  {
    title: "Made Moving Day So Much Easier",
    name: "Ada Nwankwo",
    occupation: "New Resident",
    location: "New Haven",
    review:
      "Moving into a new apartment is stressful enough. HireMe helped me book a cleaner, electrician, and carpenter all in one day. Everyone showed up on time, did excellent work, and the prices were fair. I recommend HireMe to everyone I know who's relocating.",
    service: "House Cleaning, Electrical Installation, Carpentry",
  },
  {
    title: "Quality Work at a Fair Price",
    name: "Chidi Okonkwo",
    occupation: "Property Manager",
    location: "Trans-Ekulu",
    review:
      "I manage 15 rental properties and need reliable service providers regularly. HireMe has become my go-to platform. The professionals are skilled, the booking system is efficient, and I can track all my service requests in one place. It's made my job significantly easier.",
    service: "Multiple (Plumbing, Electrical, Painting, Cleaning)",
  },
];
export function SuccessStoriesSection() {
  return (
    <section className="py-9 my-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            Real Stories from Real Customers
          </h2>
          <p className="text-lg text-gray-600">
            See how HireMe has helped homeowners across Enugu solve their
            problems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <h3 className="font-bold text-xl mb-2">"{story.title}"</h3>
                <p className="text-gray-700 mb-4">{story.review}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-medium">{story.name}</p>
                    <p className="text-sm text-gray-600">
                      {story.occupation}, {story.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Service Used:</p>
                    <p className="text-sm font-medium text-primary">
                      {story.service}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" grid place-content-center place-items-center mt-6">
          <CustomBtn
            title="Read More Success Stories"
            className="bg-white border rounded-full border-gray-300 h-[50px] font-semibold text-primary px-6 hover:bg-green-darkbggreen hover:text-white transition-colors"
          />
        </div>
      </div>
    </section>
  );
}
