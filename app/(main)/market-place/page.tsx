"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useCallback, useEffect, useState } from "react";

const Marketplace = () => {
  const [ads, setAds] = useState<any[]>([]);
  const supabase = createClient();

  const fetchads = useCallback(async () => {
    const { data, error } = await supabase.from("ads").select("*");
    console.log(data);

    if (error) {
      console.error("Error fetching doctors:", error);
    } else {
      setAds(data || []);
    }
  }, []);

  useEffect(() => {
    fetchads();
  }, [fetchads]);

  console.log(ads);

  return <div>Marketplace</div>;
};

export default Marketplace;
