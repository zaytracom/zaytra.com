import { FaGithub } from "react-icons/fa";
import { Logo } from "./logo";
import { VantaBackground } from "./vanta-background";

export default function Home() {
  return (
    <VantaBackground>
      <a
        href="https://github.com/zaytracom"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-20"
      >
        <FaGithub size={28} />
      </a>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="w-full max-w-md mb-6">
          <Logo color="white" className="w-full" />
        </div>
        <p className="text-lg sm:text-xl text-white text-center max-w-md">
          Open-source tools for developers and teams.
        </p>
      </main>
    </VantaBackground>
  );
}
