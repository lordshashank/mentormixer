// Blurred blue/red/orange/purple wash behind the NS Friend NFT card.

interface BackgroundGradientProps {
  className?: string;
}

const ORBS = [
  { left: '20%', color: '#4A84FF' },
  { left: '40%', color: '#FD5959' },
  { left: '60%', color: '#FDA740' },
  { left: '80%', color: '#A97EFF' },
] as const;

export function BackgroundGradient({ className }: BackgroundGradientProps) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        filter: 'blur(80px)',
      }}
    >
      {ORBS.map(({ left, color }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left,
            width: 280,
            height: 280,
            marginTop: -140,
            marginLeft: -140,
            borderRadius: '9999px',
            background: color,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}
