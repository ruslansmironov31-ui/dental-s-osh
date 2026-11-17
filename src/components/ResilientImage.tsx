import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  srcSet,
  sizes,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#C4C9CF] to-[#9DA3AA] dark:from-[#222629] dark:to-[#2D3134] text-[#23272B] dark:text-slate-300 p-6 text-center ${className}`}
      >
        <ShieldCheck className="w-10 h-10 mb-2 text-[#434950] dark:text-slate-300" strokeWidth={1.75} />
        <span className="text-sm font-semibold text-[#23272B] dark:text-slate-200">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
