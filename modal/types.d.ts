export interface Iprofile {
  full_name?: string;
  username?: string;
  state?: string;
  city?: string;
  street?: string;
  postal_code?: string;
  phone_number?: string;
  avatar_url?: string;
}

export interface AdMetadata {
  category?: string;
  tags?: string[];
  [key: string]: unknown;
}

export interface Ad {
  id: string;
  profile_id: string;
  title: string;
  body: string;
  media_url?: string | null;
  metadata?: AdMetadata | null;
  price?: number | null;
  currency?: string | null;
  min_charge?: number | null;
  max_charge?: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  city?: string | null;
  state?: string | null;
  address?: string | null;
  phone_number?: string | null;
  whatsapp_link?: string | null;
  instagram_link?: string | null;
  website_link?: string | null;
  full_name?: string;
  username?: string;
  state?: string;
  city?: string;
  street?: string;
  postal_code?: string;
  phone_number?: string;
  avatar_url?: string;
}
