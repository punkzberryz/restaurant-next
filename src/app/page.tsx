import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/signin");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>
    </main>
  );
}
