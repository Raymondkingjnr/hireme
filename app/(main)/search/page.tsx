"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Ad } from "@/modal/types";
import { AdsCard } from "@/app/components";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = typeof searchParams?.q === "string" ? searchParams.q : "";
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const fetchAds = useCallback(async () => {
    if (!query.trim()) {
      setAds([]);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("ads_with_profile")
      .select("*")
      .ilike("title", `%${query}%`)
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching ads:", error);
      setAds([]);
    } else {
      setAds(data || []);
    }
    setLoading(false);
  }, [query, supabase]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold text-gray-900">Search</h1>
        <p className="mt-2 text-sm text-gray-600">
          {query ?
            `Showing results for \"${query}\".`
          : "Use the search bar to find a service."}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <label
            htmlFor="service-search"
            className="text-sm font-medium text-gray-700"
          >
            Search services
          </label>
          <input
            id="service-search"
            type="text"
            defaultValue={query}
            placeholder="Try plumbers, electricians, or cleaners..."
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-darkbggreen focus:ring-2 focus:ring-green-lightbgGreen"
          />
        </div>
        <div className="mt-8">
          {loading ?
            <p className="text-sm text-gray-500">Loading ads...</p>
          : ads.length > 0 ?
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ads.map((ad) => (
                <AdsCard key={ad.id} ad={ad} />
              ))}
            </div>
          : <div className="flex flex-col items-center justify-center py-16 gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2e2e3e"
                strokeWidth="1"
                className="w-14 h-14"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <p className="text-zinc-600 text-sm">No ads found</p>
            </div>
          }
        </div>
        <div className="mt-8">
          <Link
            href="/market-place"
            className="text-sm font-semibold text-green-darkbggreen hover:text-green-lightbgGreen"
          >
            Browse all ads
          </Link>
        </div>
      </div>
    </div>
  );
}
