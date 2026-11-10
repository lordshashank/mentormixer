'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Timer } from '@/components/Timer';
import { PromptDisplay } from '@/components/PromptDisplay';
import { Footer } from '@/components/Footer';
import { FriendSwapCta } from '@/components/FriendSwapCta';
import { SwitchIndicator } from '@/components/SwitchIndicator';
import hotSeatPrompts from '@/data/hotSeatPrompts.json';

const TURNS = 5;

export default function HotSeatPage() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [showFriendSwap, setShowFriendSwap] = useState(false);
  const [showSwitch, setShowSwitch] = useState(false);
  const [turn, setTurn] = useState(0);

  const prompts = hotSeatPrompts.prompts;
  const currentPrompt = prompts[currentPromptIndex] || prompts[0];

  const handleTimerComplete = () => {
    if (turn === TURNS - 1) {
      setShowFriendSwap(true);
      return;
    }
    setShowSwitch(true);
    setTimeout(() => {
      setShowSwitch(false);
      setTurn((prev) => prev + 1);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full gap-6 sm:gap-8 p-4 pb-10 sm:p-6 sm:pb-12 md:p-8 md:pb-12">
        <Link
          href="/"
          className="self-start mb-2 px-4 py-2 text-text-light hover:text-text transition-colors text-base font-medium min-h-[44px] flex items-center touch-manipulation"
        >
          ← Back
        </Link>

        <div className="text-center text-lg sm:text-xl font-heading font-semibold text-text">
          Hot seat: person {turn + 1} of {TURNS}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8">
          <Timer key={turn} initialDuration={180} onComplete={handleTimerComplete} />
        </div>

        <PromptDisplay prompt={currentPrompt} />

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
            }}
            className="px-6 py-3 bg-primary-green-light text-white rounded-xl font-semibold text-base active:scale-95 transition-transform min-h-[48px] touch-manipulation"
          >
            Next Prompt
          </button>
        </div>
      </div>

      {showSwitch && <SwitchIndicator />}
      {showFriendSwap && (
        <FriendSwapCta
          title="Swap with your group"
          subtitle="Everyone's had the hot seat. Swap Friend NFTs with anyone in your group you haven't yet."
          doneLabel="Done"
          onDone={() => {
            setShowFriendSwap(false);
            setTurn(0);
          }}
        />
      )}
      <Footer />
    </div>
  );
}

