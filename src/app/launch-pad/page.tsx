import { redirect } from "next/navigation";

export const metadata = {
  title: "Mint",
  description: "Mint",
};

export default function page() {
  return redirect("/");
}
