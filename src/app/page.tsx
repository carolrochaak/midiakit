import { redirect } from "next/navigation";
import { mediaKitPath } from "@/lib/site";

export default function Home() {
  redirect(mediaKitPath);
}
