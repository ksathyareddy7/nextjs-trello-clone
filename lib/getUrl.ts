import { storage } from "@/appwrite";

export const getUrl = async (image: Image) => {
  const url = await storage.getFileView(image.bucketId, image.fileId);
  return url;
};
