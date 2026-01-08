import React from "react";
import { CheckCircle } from "lucide-react";
export function ServiceAreasSection() {
  const areas = [
    "Independence Layout",
    "GRA (Government Reserved Area)",
    "New Haven",
    "Trans-Ekulu",
    "Achara Layout",
    "Uwani",
    "Ogui",
    "Abakpa Nike",
    "Coal Camp",
    "Emene",
    "Obiagu",
    "Asata",
    "Maryland",
    "Ngwo",
    "Iva Valley",
    "9th Mile",
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">We Cover All of Enugu</h2>
          <p className="text-lg text-gray-600">
            Quality service providers available across every major neighborhood
            and district.
          </p>
        </div>
        <div className=" max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-3">
            {areas.map((area, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle
                  size={18}
                  className="text-green-600 mr-2 flex-shrink-0"
                />
                <span>{area}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-gray-600">
            Don't see your area? We're constantly expanding! Contact us to
            request service coverage in your neighborhood.
          </p>
        </div>
      </div>
    </section>
  );
}
