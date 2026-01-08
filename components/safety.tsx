import React from "react";
import { Shield, CreditCard, Undo, HeadphonesIcon } from "lucide-react";
export function TrustSafetySection() {
  return (
    <section className="py-16 bg-white my-10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            Your Safety is Our Priority
          </h2>
          <p className="text-lg text-gray-600">
            We've built HireMe with your security and peace of mind at the core
            of everything we do.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className=" bg-green-lightbgGreen p-3 rounded-full mb-4">
              <Shield size={20} strokeWidth={1.5} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Background Verified</h3>
            <p className="text-gray-600">
              Every professional on HireMe undergoes thorough background checks
              and identity verification. We ensure you're inviting trusted
              experts into your home.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className=" bg-green-lightbgGreen p-3 rounded-full mb-4">
              <CreditCard
                size={20}
                strokeWidth={1.5}
                className="text-primary"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
            <p className="text-gray-600">
              Your financial information is protected with bank-level
              encryption. Pay safely through our platform and never worry about
              cash transactions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className=" bg-green-lightbgGreen p-3 rounded-full mb-4">
              <Undo size={20} strokeWidth={1.5} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Money-Back Guarantee</h3>
            <p className="text-gray-600">
              Not satisfied with the service? We offer a full refund if the work
              doesn't meet our quality standards. Your satisfaction is
              guaranteed.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className=" bg-green-lightbgGreen p-3 rounded-full mb-4">
              <HeadphonesIcon
                size={20}
                strokeWidth={1.5}
                className="text-primary"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
            <p className="text-gray-600">
              Our customer support team is always available to help. Whether you
              have questions or need assistance, we're just a call or message
              away.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
