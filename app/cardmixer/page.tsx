'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Timer } from '@/components/Timer';
import { Footer } from '@/components/Footer';
import { FriendSwapCta } from '@/components/FriendSwapCta';

const ROUND_SECONDS = 180;

type Deck = 'green' | 'yellow' | 'red' | 'crowd';

const DECKS: Record<Deck, { name: string; color: string; tint: string; instruction: string }> = {
  green: {
    name: 'Warm-up',
    color: '#22A55B',
    tint: '#E8F7EE',
    instruction: 'Each draw a card and answer it.',
  },
  yellow: {
    name: 'Build',
    color: '#E0A100',
    tint: '#FFF6DB',
    instruction: 'Each draw a card and answer it.',
  },
  red: {
    name: 'Real',
    color: '#E5484D',
    tint: '#FDECEC',
    instruction: 'Each draw a card and answer it.',
  },
  crowd: {
    name: 'Crowd deck',
    color: '#26272B',
    tint: '#F4F4F5',
    instruction: 'Draw from the crowd deck: questions written by the room.',
  },
};

const ROUNDS: Deck[] = ['green', 'green', 'green', 'yellow', 'yellow', 'yellow', 'red', 'crowd'];

export default function CardMixerPage() {
  const [round, setRound] = useState(0);
  const [showFriendSwap, setShowFriendSwap] = useState(false);
  const [finished, setFinished] = useState(false);
  const [roundSeconds, setRoundSeconds] = useState(ROUND_SECONDS);

  // ?seconds=10 shortens every round for rehearsals.
  useEffect(() => {
    const seconds = Number(new URLSearchParams(window.location.search).get('seconds'));
    if (seconds > 0) setRoundSeconds(seconds);
  }, []);

  const deck = DECKS[ROUNDS[round]];
  const isLastRound = round === ROUNDS.length - 1;

  const goToRound = (index: number) => {
    setShowFriendSwap(false);
    setFinished(false);
    setRound(index);
  };

  const handleFriendSwapDone = () => {
    setShowFriendSwap(false);
    if (isLastRound) setFinished(true);
    else setRound((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full gap-6 sm:gap-8 p-4 pb-10 sm:p-6 sm:pb-12 md:p-8 md:pb-12">
        <Link
          href="/"
          className="self-start px-4 py-2 text-text-light hover:text-text transition-colors text-base font-medium min-h-[44px] flex items-center touch-manipulation"
        >
          ← Back
        </Link>

        <ol className="flex gap-1.5 sm:gap-2" aria-label="Rounds">
          {ROUNDS.map((key, i) => {
            const current = !finished && i === round;
            const done = finished || i < round;
            return (
              <li key={i} className="flex-1">
                <button
                  type="button"
                  onClick={() => goToRound(i)}
                  aria-current={current ? 'step' : undefined}
                  aria-label={`Round ${i + 1}: ${DECKS[key].name}`}
                  className="w-full h-2.5 rounded-full transition-all touch-manipulation"
                  style={{
                    background: DECKS[key].color,
                    opacity: current ? 1 : done ? 0.55 : 0.18,
                    transform: current ? 'scaleY(1.6)' : undefined,
                  }}
                />
              </li>
            );
          })}
        </ol>

        {finished ? (
          <FinishScreen onRestart={() => goToRound(0)} />
        ) : (
          <>
            <div className="text-center">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-iron-900"
                style={{ background: deck.tint }}
              >
                <span className="size-2.5 rounded-full" style={{ background: deck.color }} />
                Round {round + 1} of {ROUNDS.length} · {deck.name}
              </span>
              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text text-balance">
                {deck.instruction}
              </h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <Timer key={`${round}-${roundSeconds}`} initialDuration={roundSeconds} onComplete={() => setShowFriendSwap(true)} />
            </div>

            <ul className="w-full p-5 sm:p-6 bg-white rounded-2xl shadow-sm text-base sm:text-lg text-text-light space-y-2">
              <li>Don&apos;t like your card? Hand it to your partner to answer instead.</li>
              <li>Drew a wildcard? Do it, then draw again.</li>
              <li>Love a card? Keep it in your pocket for the end.</li>
            </ul>
          </>
        )}
      </div>

      {showFriendSwap && (
        <FriendSwapCta
          title="Swap Friend NFTs"
          subtitle={
            isLastRound
              ? "Last swap of the night! Scan each other's QR."
              : "Scan each other's QR. Then Side B moves one seat right and the cards move one table left."
          }
          doneLabel={isLastRound ? 'Finish' : `Start round ${round + 2}`}
          onDone={handleFriendSwapDone}
        />
      )}
      <Footer />
    </div>
  );
}

function FinishScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
      <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-iron-600 shadow-skeuomorphic-xs">
        That&apos;s a wrap
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text text-balance">
        Hold up your favourite card!
      </h1>
      <p className="max-w-lg text-lg sm:text-xl text-text-light text-balance">
        Share the best answer you heard tonight. Then open your NS inbox: everyone you swapped with is there.
        Message one person and grab a Tashkent Tea this week.
      </p>
      <button type="button" onClick={onRestart} className="ns-button --secondary">
        Start over
      </button>
    </div>
  );
}
