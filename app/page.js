// app/page.js
// Root route — immediately redirects to /work.
// Using next/navigation redirect() means Next.js returns a 308 directly from
// the server component, giving Google a single clean response with no chained
// 301s that can trigger "Redirect error" in Search Console.

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/work");
}
