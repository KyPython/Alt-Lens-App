export const BACKEND_URL = "https://alt-lens-backend.vercel.app";

export interface MediaMetadata {
  mediaId: string;
  altText: string;
  caption?: string;
  userId: string;
  mediaUrl?: string;
  imageUrl?: string;
}

export async function saveMediaMetadata(data: MediaMetadata) {
  const url = `${BACKEND_URL}/api/save-media-metadata`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}