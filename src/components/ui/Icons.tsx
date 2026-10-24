type IconProps = {
  className?: string;
};

export function InstagramIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M14.4 3c.5 2.5 1.9 4.2 4.3 4.5v2.7c-1.5-.1-2.8-.6-4-1.4v6.6c0 3.4-2.7 6.1-6.2 6.1S2.2 18.8 2.2 15.4c0-3.3 2.6-6 5.9-6.1v2.8c-1.8.1-3.2 1.6-3.2 3.4 0 1.9 1.5 3.4 3.5 3.4s3.4-1.5 3.4-3.5V3h2.6Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 3C7.31 3 3.5 6.7 3.5 11.3c0 1.46.4 2.88 1.16 4.12L3.4 21l5.72-1.22a9.3 9.3 0 0 0 2.92.46c4.73 0 8.54-3.7 8.54-8.3C20.58 6.7 16.77 3 12.04 3Zm4.86 11.72c-.2.56-1.16 1.07-1.62 1.14-.42.06-.94.08-1.52-.1-.35-.1-.8-.26-1.38-.5-2.42-1.04-4-3.48-4.12-3.64-.12-.16-.98-1.3-.98-2.48 0-1.18.62-1.76.84-2 .22-.24.48-.3.64-.3h.46c.14 0 .34-.05.52.4.2.48.66 1.64.72 1.76.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.26.32-.36.42-.12.12-.24.26-.1.5.14.24.62 1.02 1.32 1.66.92.82 1.68 1.08 1.94 1.2.26.12.4.1.56-.06.16-.16.64-.74.82-1 .18-.26.34-.2.56-.12.22.08 1.42.66 1.66.78.24.12.4.18.46.28.06.1.06.58-.14 1.14Z" />
    </svg>
  );
}
