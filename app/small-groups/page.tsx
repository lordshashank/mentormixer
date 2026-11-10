'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Timer } from '@/components/Timer';
import { InstructionsBanner } from '@/components/InstructionsBanner';
import { PromptDisplay } from '@/components/PromptDisplay';
import { Footer } from '@/components/Footer';
import { FriendSwapCta } from '@/components/FriendSwapCta';
import smallGroupsPrompts from '@/data/smallGroupsPrompts.json';

export default function SmallGroupsPage() {
  const [showFriendSwap, setShowFriendSwap] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const prompts = smallGroupsPrompts.prompts;
  const currentPrompt = prompts[currentPromptIndex] || prompts[0];

  const handleFriendSwapDone = () => {
    setShowFriendSwap(false);
    setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    setTimerKey((prev) => prev + 1);
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
        <InstructionsBanner text='Answer with specifics: a concrete example, artifact, or decision you made. Prefer "what I did" over "what I believe." It&apos;s always allowed to say: "Pass / not sure yet." Click "Next Prompt" if everyone is either done or chooses to pass.' />

        <div className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8">
          <Timer key={timerKey} initialDuration={300} onComplete={() => setShowFriendSwap(true)} />
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

      {showFriendSwap && (
        <FriendSwapCta
          title="Swap with your group"
          subtitle="Haven't swapped Friend NFTs with everyone in your group yet? Do it now."
          doneLabel="Done, next prompt"
          onDone={handleFriendSwapDone}
        />
      )}
      <Footer />
    </div>
  );
}

