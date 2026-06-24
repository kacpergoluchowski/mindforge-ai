import { profileStats } from "../../data/profileData";
import ProfileStatCard from "./ProfileStatCard";

export default function ProfileStats() {
  return (
    <section className="grid gap-6 xl:grid-cols-4">
      {profileStats.map((stat) => (
        <ProfileStatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}
