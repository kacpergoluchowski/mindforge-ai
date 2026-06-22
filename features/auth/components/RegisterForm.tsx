import {
  AtSign,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";

export default function RegisterForm() {
  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-slate-950/50
        p-8 lg:p-10
        backdrop-blur-xl
      "
    >
      <h2 className="text-3xl font-bold text-white">
        Create your account
      </h2>

      <p className="mt-2 text-slate-400">
        Fill in the details below to get started
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          className="
            flex items-center justify-center gap-3
            rounded-2xl
            border border-white/10
            bg-white/[0.02]
            px-5 py-4
            text-white
            transition
            hover:border-violet-500/30
          "
        >
          Continue with GitHub
        </button>

        <button
          type="button"
          className="
            flex items-center justify-center gap-3
            rounded-2xl
            border border-white/10
            bg-white/[0.02]
            px-5 py-4
            text-white
            transition
            hover:border-violet-500/30
          "
        >
          Continue with Google
        </button>
      </div>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-sm text-slate-500">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white">
              Full name
            </label>

            <div className="relative">
              <User className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/[0.02]
                  py-4 pl-12 pr-4
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-500
                  focus:border-violet-500
                "
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">
              Username
            </label>

            <div className="relative">
              <AtSign className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                placeholder="Choose a username"
                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/[0.02]
                  py-4 pl-12 pr-4
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-500
                  focus:border-violet-500
                "
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white">
            Email address
          </label>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

            <input
              type="email"
              placeholder="Enter your email address"
              className="
                w-full rounded-2xl
                border border-white/10
                bg-white/[0.02]
                py-4 pl-12 pr-4
                text-white
                outline-none
                transition
                placeholder:text-slate-500
                focus:border-violet-500
              "
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

              <input
                type="password"
                placeholder="Create a password"
                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/[0.02]
                  py-4 pl-12 pr-12
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-500
                  focus:border-violet-500
                "
              />

              <EyeOff className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">
              Confirm password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

              <input
                type="password"
                placeholder="Confirm your password"
                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/[0.02]
                  py-4 pl-12 pr-12
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-500
                  focus:border-violet-500
                "
              />

              <EyeOff className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
            </div>
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-400">
          <input type="checkbox" />

          I agree to the Terms of Service and Privacy Policy
        </label>

        <button
          type="submit"
          className="
            w-full rounded-2xl
            bg-violet-600
            py-4
            font-medium text-white
            transition
            hover:bg-violet-500
          "
        >
          Create Account
        </button>
      </form>
    </div>
  );
}