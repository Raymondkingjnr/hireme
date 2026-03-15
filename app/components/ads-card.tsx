import React, { useState } from "react";
import { InstagramIcon, PhoneIcon, WhatsappIcon } from "@/assets/icons";
import { MapIcon, MapPinIcon } from "lucide-react";
import { Ad } from "@/modal/types";
import Image from "next/image";

interface AdCardProps {
  ad: Ad;
}

export const AdsCard = React.memo(({ ad }: AdCardProps) => {
  const [imgError, setImgError] = useState<boolean>(false);

  const location = [ad.address, ad.city, ad.state].filter(Boolean).join(", ");
  const hasLocation = Boolean(ad.city ?? ad.state);
  const hasTags = (ad.metadata?.tags?.length ?? 0) > 0;
  const hasLinks =
    ad.phone_number ?? ad.whatsapp_link ?? ad.instagram_link ?? ad.website_link;

  return (
    <div
      className={`bg-white gap-5  shadow-sm border hover:shadow-md  group relative    rounded-2xl overflow-hidden
         transition-all duration-300
        flex flex-col`}
    >
      {/* ── Image ── */}
      <div className="relative h-48 overflow-hidden bg-[#1a1a24]">
        {ad.media_url && !imgError ?
          <img
            src={ad.media_url}
            alt={ad.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        : <div className="w-full h-full flex items-center justify-center">
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
          </div>
        }

        {/* Status badge */}
        <div
          className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full
            text-[11px] font-semibold tracking-wide
            ${
              ad.is_active ?
                "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30"
            }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              ad.is_active ? "bg-emerald-400" : "bg-zinc-500"
            }`}
          />
          {ad.is_active ? "Active" : "Inactive"}
        </div>

        {/* Category badge */}
        {ad.metadata?.category && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full
              bg-[#0f0f13]/80 backdrop-blur-sm border border-[#1e1e2a]
              text-[11px] text-zinc-400 font-medium"
          >
            {ad.metadata.category}
          </div>
        )}

        {/* Price overlay */}
      </div>

      {/* ── Content ── */}

      <div className="px-4 py-3 flex flex-col flex-1 gap-3">
        <div className=" flex items-center gap-2">
          <Image
            src={ad.avatar_url ?? ""}
            alt="User avatar"
            width={100}
            height={100}
            className="rounded-full w-[50px] h-[50px] object-cover border-2 border-green-darkbggreen"
          />
          <span>
            <p>{ad.full_name}</p>
            <h3 className="text-green-darkbggreen capitalize font-semibold text-[15px] leading-snug line-clamp-1">
              {ad.title}
            </h3>
          </span>
        </div>
        {/* Title */}

        {/* Body */}
        <p className="text-zinc-500 text-[13px] leading-relaxed line-clamp-2">
          {ad.body}
        </p>

        {/* Location */}
        {hasLocation && (
          <div className="flex items-center gap-1.5 text-zinc-500 text-[12px]">
            <MapPinIcon size={16} />
            <span className="line-clamp-1">{location}</span>
          </div>
        )}

        {/* Tags */}
        {hasTags && (
          <div className="flex flex-wrap gap-1.5">
            {ad.metadata!.tags!.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[#1a1a24] border border-[#2a2a38]
                  text-[11px] text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        {/* <div className="border-t border-[#1e1e2a] mt-auto" /> */}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Contact / social links */}
          {hasLinks && (
            <div className="flex items-center gap-2">
              {ad.phone_number && (
                <a
                  href={`tel:${ad.phone_number}`}
                  title={ad.phone_number}
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-xl bg-green-lightbgGreen  flex items-center
                    justify-center text-zinc-400 hover:text-[#25D366] hover:border-zinc-500
                    transition-all duration-150"
                >
                  <PhoneIcon />
                </a>
              )}
              {ad.whatsapp_link && (
                <a
                  href={ad.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-xl bg-green-lightbgGreen  flex items-center
                    justify-center text-zinc-400 hover:text-[#25D366] hover:border-[#25D366]/40
                    transition-all duration-150"
                >
                  <WhatsappIcon />
                </a>
              )}
              {ad.instagram_link && (
                <a
                  href={ad.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-xl bg-green-lightbgGreen  flex items-center
                    justify-center text-zinc-400 hover:text-[#E1306C] hover:border-[#E1306C]/40
                    transition-all duration-150"
                >
                  <InstagramIcon />
                </a>
              )}
              {ad.website_link && (
                <a
                  href={ad.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-xl bg-green-lightbgGreen  flex items-center
                    justify-center text-zinc-400 hover:text-[#f97316] hover:border-[#f97316]/40
                    transition-all duration-150"
                >
                  <MapIcon size={16} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
