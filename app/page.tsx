import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1> tu bedzie landing page </h1>
      <Link href={"/dashboard"} className="bg-red-200"> Przejdz do dashboardu </Link>
    </div>
  );
}
