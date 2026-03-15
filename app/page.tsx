"use client";
import ShinyText from "@/components/ShinyText";
import { heroBg } from "@/assets";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useMemo, useState } from "react";
import { BadgeCheckIcon } from "lucide-react";
import { ReferralSection } from "./components/referral";
import { useRouter, useParams } from "next/navigation";
import {
  SuccessStoriesSection,
  ServiceAreasSection,
  NavBar,
  Footer,
  Faq,
  RecentJobsSection,
  TrustSafetySection,
  CustomBtn,
  EmergencyServicesSection,
} from "@/app/components";

type Trade = {
  id: string;
  label: string;
};

const artisans: Trade[] = [
  { id: "electrician", label: "Electrician" },
  { id: "plumbers", label: "Plumbers" },
  { id: "mobile-mechanics", label: "Mobile Mechanics" },
  { id: "house-cleaners", label: "House Cleaners" },
  { id: "carpenters", label: "Carpenters" },
];

const allServices = [
  { name: "Plumber", shortcut: "⌘P" },
  { name: "Mobile Mechanics", shortcut: "⌘M" },
  { name: "Home Tutors", shortcut: "⌘H" },
  { name: "Electricians", shortcut: "⌘E" },
  { name: "Cleaners", shortcut: "⌘C" },
];

export interface IReview {
  title: string;
  name: string;
  occupation: string;
  location: string;
  review: string;
  service: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const displayedServices = useMemo(() => {
    if (searchQuery.trim() === "") {
      return allServices;
    }

    return allServices.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);
  const router = useRouter();

  return (
    <>
      <NavBar />
      <section
        className=" w-full h-fit md:h-[800px] border rounded bg-cover bg-no-repeat bg-center px-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroBg.src})`,
        }}
      >
        <div className="max-w-[1500px] mx-auto ">
          <div className=" flex justify-between items-center ">
            <div className="py-8">
              <ShinyText
                text=" Find trusted handymen around Enugu. "
                speed={5}
                className="md:text-3xl text-lg"
              />
            </div>
            <main className=" flex relative w-[80px]   ">
              <div className=" w-[50px] h-[50px] rounded-full bg-green-lightbgGreen" />
              <div className=" w-[50px] h-[50px] absolute z-30 right-0 rounded-full bg-green-darkbggreen" />
            </main>
          </div>
          <div className="max-w-3xl ">
            <p className=" text-gray-50 leading-10 pb-6 md:text-4xl text-2xl">
              Hire skilled electricians, plumbers, cleaners, and more — all
              verified and available in your region for as low as ₦7,000.
            </p>
          </div>
          <section className=" mt-5 flex flex-wrap gap-6 max-w-[600px]">
            {artisans.map((t) => (
              <div
                key={t.id}
                className=" border-[1px] border-gray-50 w-fit px-2 py-1 rounded-full cursor-pointer hover:bg-green-lightbgGreen hover:border-transparent transition-all duration-300"
              >
                <p
                  className="font-semibold text-gray-50 text-sm hover:text-gray-700"
                  onClick={() =>
                    router.push(`/search?q=${encodeURIComponent(t.id)}`)
                  }
                >
                  {t.label}
                </p>
              </div>
            ))}
          </section>
          <div>
            <div className="max-w-4xl mt-[1rem] mb-10">
              <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                <CommandInput
                  placeholder="Search for services..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>No services found.</CommandEmpty>

                  {displayedServices.length > 0 && (
                    <CommandGroup heading="Popular Services">
                      {displayedServices.map((service) => (
                        <CommandItem key={service.name}>
                          <span
                            onClick={() =>
                              router.push(
                                `/search?q=${encodeURIComponent(service.name)}`,
                              )
                            }
                          >
                            {service.name}
                          </span>
                          <CommandShortcut>{service.shortcut}</CommandShortcut>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </div>

            {/* <div className=" bg-white rounded-xl md:w-[500px] w-full">
          <AnimatedList
            items={stories}
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={false}
          />
        </div> */}
          </div>
        </div>
      </section>
      <div className=" max-w-[1500px] mx-auto mt-[3rem] px-5">
        <section className="py-12 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">
            Verified Professionals Near You
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 gap-5 rounded-xl shadow-sm border hover:shadow-md transition"
                >
                  <div className=" flex  gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <div className=" flex items-center gap-1">
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          Electrician
                        </p>
                        <BadgeCheckIcon
                          size={17}
                          strokeWidth={1.5}
                          fill="green"
                          stroke="#fff"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">
                    “Fast, reliable, and affordable service around Independence
                    Layout.”
                  </p>
                </div>
              ))}
          </div>
        </section>

        <TrustSafetySection />

        <RecentJobsSection />

        <Faq />

        <EmergencyServicesSection />

        <ServiceAreasSection />

        {/* <ReferralSection /> */}

        <SuccessStoriesSection />

        <section className="py-16 bg-green-lightbgGreen text-center px-3">
          <h2 className="text-2xl font-semibold mb-4">
            Are you a skilled worker in Enugu?
          </h2>
          <p className="text-gray-600 mb-6">
            Join hundreds of verified professionals and grow your income with
            HireMe.
          </p>
          <div className=" grid place-content-center place-items-center">
            <CustomBtn
              title="Register & Add Your Service"
              className=" bg-green-darkbggreen text-green-lightbgGreen h-[45px] font-semibold"
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
