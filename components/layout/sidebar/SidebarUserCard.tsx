import LogoutButton from "@/features/auth/components/shared/LogoutButton";
import type { CurrentProfile } from "@/features/profile/types/profile.types";
import {
  formatPlan,
  getInitials,
} from "@/features/profile/utils/profileFormatters";

type SidebarUserCardProps = {
  profile: CurrentProfile;
};

export default function SidebarUserCard({ profile }: SidebarUserCardProps) {
  return (
    <div className="mt-6 shrink-0 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold text-white">
          {getInitials(profile.fullName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {profile.fullName}
          </p>

          <p className="truncate text-xs text-slate-400">
            {formatPlan(profile.plan)}
          </p>
        </div>

        <LogoutButton compact />
      </div>
    </div>
  );
}
