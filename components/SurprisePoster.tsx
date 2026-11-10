'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const POSTER_IMAGE = '/surprise/tashkent-tea-poster.jpg';

export function SurprisePoster() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ns-button --secondary mx-auto min-h-10 px-4 py-2 text-sm"
      >
        <span aria-hidden>🎁</span>
        Surprise
      </button>
      {open && <PosterDialog onClose={() => setOpen(false)} />}
    </>
  );
}

function PosterDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="sheet-dialog --wide"
      aria-label="Meet for Tashkent Tea poster"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div role="document" tabIndex={-1} autoFocus className="no-scrollbar outline-none relative max-h-[100dvh] overflow-y-auto rounded-t-3xl bg-white sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ns-button --secondary --icon absolute right-4 top-4 z-20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <Image
          src={POSTER_IMAGE}
          alt="Meet for Tashkent Tea: discover members in the Directory, coordinate a meet up, exchange Friend NFTs, then claim a free Tashkent Tea at the café within 5 minutes."
          width={1648}
          height={2339}
          sizes="(min-width: 640px) 648px, 100vw"
          priority
          className="h-auto w-full"
        />
      </div>
    </dialog>
  );
}
