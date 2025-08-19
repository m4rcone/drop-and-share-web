import type { Upload } from "@/types/upload";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getUpload(id: string): Promise<Upload> {
  const response = await fetch(`${apiUrl}/uploads/${id}`);

  const responseBody = await response.json();

  if (response.status !== 200) {
    throw new Error(responseBody.message);
  }

  const result = {
    id: responseBody.id,
    url: responseBody.remote_url,
    expiresAt: responseBody.expires_at,
  };

  return result;
}
