import { Banner } from "@/shared/types/banner";
import { randomImage } from "@/shared/utils/mock/randomImage";

const video_url =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const mockBanner = (n: number): Banner[] => {
  return Array.from({ length: n }, (_, index) => ({
    name: `Banner ${index + 1}`,
    author: `Author ${index + 1}`,
    totalItems: index + 1,
    thumbnailImages: [randomImage(), randomImage(), randomImage()],
    mainBackground: Math.random() > 0.5 ? randomImage() : video_url,
  }));
};
