"use client";
import { Ad } from "@/modal/types";
import { createClient } from "@/utils/supabase/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AdsCard } from "@/app/components";

const Marketplace = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("All");
  const supabase = createClient();

  const fetchads = useCallback(async () => {
    const { data, error } = await supabase
      .from("ads_with_profile")
      .select("*")
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching doctors:", error);
    } else {
      setAds(data || []);
    }
  }, []);

  useEffect(() => {
    fetchads();
  }, [fetchads]);

  const titleOptions = useMemo(() => {
    const uniqueTitles = Array.from(
      new Set(
        ads
          .map((ad) => (ad.title || "").trim())
          .filter((title) => title.length > 0),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return ["All", ...uniqueTitles];
  }, [ads]);

  const filteredAds = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return ads.filter((ad) => {
      const matchesTitle =
        selectedTitle === "All" || ad.title === selectedTitle;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        ad.title.toLowerCase().includes(normalizedSearch) ||
        ad.body.toLowerCase().includes(normalizedSearch);

      return matchesTitle && matchesSearch;
    });
  }, [ads, searchTerm, selectedTitle]);

  return (
    <div className=" min-h-screen container mx-auto px-4">
      <div className="flex flex-col gap-4 py-6">
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="ad-search"
          >
            Search ads
          </label>
          <input
            id="ad-search"
            type="text"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-darkbggreen focus:ring-2 focus:ring-green-lightbgGreen"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="ad-filter"
          >
            Filter by title
          </label>
          <select
            id="ad-filter"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-darkbggreen focus:ring-2 focus:ring-green-lightbgGreen"
            value={selectedTitle}
            onChange={(event) => setSelectedTitle(event.target.value)}
          >
            {titleOptions.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredAds && filteredAds.length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredAds.map((ad) => (
            <div key={ad.id}>
              <AdsCard ad={ad} />
            </div>
          ))}
        </div>
      : <div className="flex flex-col items-center justify-center py-24 gap-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2e2e3e"
            strokeWidth="1"
            className="w-16 h-16"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <p className="text-zinc-600 text-sm">No ads found</p>
        </div>
      }
    </div>
  );
};

export default Marketplace;
