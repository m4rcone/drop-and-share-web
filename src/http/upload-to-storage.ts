import type { Upload } from "@/types/upload";

const apiUrl = import.meta.env.VITE_API_URL!;

export async function uploadToStorage(file: File): Promise<Upload> {
  const data = new FormData();

  data.append("file", file);

  const response = await fetch(`${apiUrl}/uploads`, {
    method: "POST",
    body: data,
  });

  const responseBody = await response.json();

  if (response.status !== 201) {
    throw new Error(responseBody.message);
  }

  const result = {
    id: responseBody.id,
    url: responseBody.remote_url,
    expiresAt: responseBody.expires_at,
  };

  return result;
}
