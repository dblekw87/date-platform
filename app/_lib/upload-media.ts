type MediaUploadResponse = {
  asset?: {
    public_url?: string;
  };
};

export async function uploadMedia(file: File, usageType: "profile" | "community" | "trade-journal") {
  const formData = new FormData();

  formData.set("file", file);
  formData.set("usageType", usageType);

  const response = await fetch("/api/backend/media", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("media_upload_failed");
  }

  const data = await response.json() as MediaUploadResponse;
  const publicUrl = data.asset?.public_url;

  if (!publicUrl) {
    throw new Error("media_upload_missing_url");
  }

  return publicUrl;
}
