import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { SurprisePoster } from '@/components/SurprisePoster';

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 gap-4 sm:gap-6 md:gap-8 overflow-y-auto">
        <div className="text-center mb-2 sm:mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text mb-1 sm:mb-2">
            Mentorship Matching Mixer
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-light">
            We all have something to teach and something to learn.
          </p>
        </div>

        <div className="w-full max-w-md space-y-3 sm:space-y-4 md:space-y-6">
          <Link
            href="/speed-round"
            className="block w-full p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] min-h-[100px] sm:min-h-[120px] flex flex-col justify-center"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-text mb-1 sm:mb-2">
              Speed Round
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-text-light">
              1:1 discussion with 60-second turns
            </p>
          </Link>

          <Link
            href="/small-groups"
            className="block w-full p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] min-h-[100px] sm:min-h-[120px] flex flex-col justify-center"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-text mb-1 sm:mb-2">
              Small Groups
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-text-light">
              Group discussion with 5-minute timer
            </p>
          </Link>

          <Link
            href="/hot-seat"
            className="block w-full p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] min-h-[100px] sm:min-h-[120px] flex flex-col justify-center"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-text mb-1 sm:mb-2">
              Hot Seat
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-text-light">
              Open discussion with 3-minute timer
            </p>
          </Link>
        </div>

        <SurprisePoster />
      </main>
      <Footer />
    </div>
  );
}

