import React from "react";
import { Share2 } from "lucide-react";
export function ReferralSection() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto">
        <div className=" mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-3/5 p-8">
              <h2 className="text-3xl font-bold mb-2">Refer & Earn ₦1,000</h2>
              <p className="text-lg text-gray-600 mb-6">
                Love HireMe? Share it with friends and family!
              </p>
              <p className="text-gray-700 mb-6">
                For every friend you refer who completes their first booking,
                you both earn ₦1,000 in credits. There's no limit to how much
                you can earn – the more you share, the more you save on future
                services.
              </p>
              <div className="mb-6">
                <h3 className="font-semibold mb-3">How it works:</h3>
                <ol className="space-y-2 pl-6 list-decimal">
                  <li>Share your unique referral code with friends</li>
                  <li>They sign up and book their first service</li>
                  <li>You both receive ₦1,000 in account credits</li>
                </ol>
              </div>
              {/* <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Your Referral Code:
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value="HIREME123"
                    readOnly
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-l-md bg-gray-50"
                  />
                  <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
                    Copy
                  </button>
                </div>
              </div> */}
              <button className="bg-green-darkbggreen text-white rounded-full px-6 py-3 hover:bg-opacity-90 transition-colors flex items-center">
                <Share2 size={20} className="mr-2" />
                Share Now
              </button>
              <p className="text-xs text-gray-500 mt-4">
                Credits are automatically added to your account within 24 hours
                of your referral's completed booking. Credits can be used toward
                any service on HireMe and never expire.
              </p>
            </div>
            <div className="md:w-2/5 bg-green-950 flex items-center justify-center p-8 text-white">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-5xl font-bold mb-2">₦1,000</div>
                <p className="text-lg">For you and your friend</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
