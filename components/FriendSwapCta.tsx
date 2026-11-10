'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { BackgroundGradient } from './BackgroundGradient';
import { Bunting } from './Bunting';

const STEP_INTERVAL_MS = 4000;

const STEPS = [
  {
    image: '/friend-swap/cafe-chat.jpg',
    alt: 'Two NS members chatting at the NS Café counter',
    title: 'Show your QR',
    body: 'In the NS app, tap your membership card to flip it to your QR.',
  },
  {
    image: '/friend-swap/qr-scan.jpg',
    alt: 'One phone scanning the Friend QR on another NS member\'s membership card',
    title: 'Scan each other',
    body: 'Scan their QR with the NS app or your camera until you see "You\'re now friends".',
  },
  {
    image: '/friend-swap/now-friends.jpg',
    alt: 'Two phones showing the "You\'re now friends" Friend NFT screen',
    title: "You're friends",
    body: 'You both get a Friend NFT. Say hi in your NS inbox and keep the chat going.',
  },
];

interface FriendSwapCtaProps {
  title: string;
  subtitle: string;
  doneLabel: string;
  onDone: () => void;
}

export function FriendSwapCta({ title, subtitle, doneLabel, onDone }: FriendSwapCtaProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setActiveStep((prev) => (prev + 1) % STEPS.length), STEP_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <dialog
      ref={dialogRef}
      className="sheet-dialog"
      aria-labelledby="friend-swap-title"
      onCancel={(e) => {
        e.preventDefault();
        onDone();
      }}
    >
      <div role="document" className="no-scrollbar relative max-h-[100dvh] overflow-y-auto overflow-x-hidden rounded-t-3xl bg-white sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl">
        <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[280px] w-[880px] -translate-x-1/2">
          <BackgroundGradient className="absolute inset-0" />
        </div>
        <Bunting className="pointer-events-none absolute left-1/2 top-[-16px] h-[120px] w-[760px] -translate-x-1/2" />

        <button
          type="button"
          onClick={onDone}
          aria-label="Close"
          className="ns-button --secondary --icon absolute right-4 top-4 z-20"
        >
          <XIcon />
        </button>

        <div className="relative z-10 flex flex-col gap-5 px-5 pb-6 pt-24 sm:px-6">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-iron-600 shadow-skeuomorphic-xs">
              Time&apos;s up
            </span>
            <h2 id="friend-swap-title" className="mt-3 text-[28px] font-semibold leading-tight text-iron-900 sm:text-[32px]">
              {title}
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-balance text-base text-iron-500">{subtitle}</p>
          </div>

          <div className="relative aspect-[40/21] w-full overflow-hidden rounded-2xl bg-iron-100 shadow-skeuomorphic-xs">
            {STEPS.map((step, i) => (
              <Image
                key={step.image}
                src={step.image}
                alt={step.alt}
                fill
                sizes="(min-width: 640px) 512px, 100vw"
                priority={i === 0}
                className={`object-cover transition-opacity duration-700 ${i === activeStep ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-x-3 top-3 flex gap-1.5" aria-hidden>
              {STEPS.map((step, i) => (
                <span key={step.image} className="h-1 flex-1 overflow-hidden rounded-full bg-white/40">
                  <span
                    key={i === activeStep ? `active-${activeStep}` : 'idle'}
                    className={`block h-full rounded-full bg-white ${
                      i < activeStep ? 'w-full' : i === activeStep ? 'animate-[friend-swap-progress_4000ms_linear_forwards]' : 'w-0'
                    }`}
                  />
                </span>
              ))}
            </div>
          </div>

          <ol className="flex flex-col gap-1">
            {STEPS.map((step, i) => {
              const active = i === activeStep;
              return (
                <li key={step.image}>
                  <button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    aria-current={active ? 'step' : undefined}
                    className={`flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                      active ? 'bg-iron-100' : 'hover:bg-iron-50'
                    }`}
                  >
                    <span
                      className={`flex size-7 flex-none items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        active ? 'bg-iron-800 text-iron-25 shadow-skeuomorphic' : 'bg-iron-200 text-iron-600'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-base font-semibold text-iron-900">{step.title}</span>
                      <span className="text-sm leading-snug text-iron-500">{step.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <button type="button" onClick={onDone} autoFocus className="ns-button --primary w-full">
            {doneLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
