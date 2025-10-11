import { formatDistanceToNow } from "date-fns";

type CollectionStatusInput = {
  status: string;
  mintStartDate?: string; // Thời gian bắt đầu sớm nhất của collection
  publicMint?: {
    startDate?: string; // Thời gian bắt đầu public mint
    endDate?: string; // Thời gian kết thúc public mint
    mintPrice?: string; // Giá mint cho public
  };
  totalMinted: string;
  maxSupply: string;
};

type CollectionStatusOutput = {
  isUpcoming: boolean;
  isLive: boolean;
  isEnded: boolean;
  isSoldOut: boolean;
  statusText: string;
  statusColor: string;
  formattedStartDate: string;
  formattedEndDate: string;
};

export function getCollectionStatus({
  status,
  mintStartDate,
  publicMint,
  totalMinted,
  maxSupply,
}: CollectionStatusInput): CollectionStatusOutput {
  const now = new Date();
  // Ưu tiên mintStartDate cho thời gian bắt đầu sớm nhất
  const startDate = mintStartDate
    ? new Date(mintStartDate)
    : publicMint?.startDate
      ? new Date(publicMint.startDate)
      : null;
  const endDate = publicMint?.endDate ? new Date(publicMint.endDate) : null;

  // Validate ngày
  const isValidStartDate = startDate && !isNaN(startDate.getTime()) ? startDate : null;
  const isValidEndDate = endDate && !isNaN(endDate.getTime()) ? endDate : null;

  // Trạng thái
  const isUpcoming = isValidStartDate ? isValidStartDate > now : false;
  const isLive =
    (status === "upcoming" || status === "live") &&
    isValidStartDate &&
    isValidEndDate &&
    isValidStartDate <= now &&
    isValidEndDate > now &&
    parseInt(totalMinted) < parseInt(maxSupply);
  const isEnded = isValidEndDate ? isValidEndDate <= now : false;
  const isSoldOut = parseInt(totalMinted) >= parseInt(maxSupply);

  // Format ngày
  const formattedStartDate = isValidStartDate
    ? isValidStartDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";
  const formattedEndDate = isValidEndDate
    ? isValidEndDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  // Đếm ngược cho isLive
  let statusText: string;
  if (isUpcoming) {
    statusText = `Upcoming - ${formattedStartDate}`;
  } else if (isLive && isValidEndDate) {
    const millisecondsLeft = isValidEndDate.getTime() - now.getTime();
    const daysLeft = millisecondsLeft / (1000 * 60 * 60 * 24);
    if (daysLeft <= 7) {
      statusText = `Live - ${formatDistanceToNow(isValidEndDate, {
        addSuffix: true,
      })}`;
    } else {
      statusText = `Live - ${formattedEndDate}`;
    }
  } else if (isSoldOut) {
    statusText = "Sold out";
  } else if (isEnded) {
    statusText = `Ended - ${formattedEndDate}`;
  } else {
    statusText = "Not available";
  }

  // Màu trạng thái
  const statusColor = isUpcoming ? "bg-yellow-500" : isLive ? "bg-green-500" : "bg-red-500";

  return {
    isUpcoming,
    isLive: isLive!,
    isEnded,
    isSoldOut,
    statusText,
    statusColor,
    formattedStartDate,
    formattedEndDate,
  };
}

export async function fetchCollectionBySlug(slug: string) {
  return {
    slug,
    name: "Test Collection",
    description: "Test Description",
    imageUrl: "https://via.placeholder.com/150",
    bannerUrl: "https://via.placeholder.com/150",
  };
}
