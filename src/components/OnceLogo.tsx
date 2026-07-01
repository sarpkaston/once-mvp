interface OnceLogoProps {
  size?: number;
  opacity?: number;
  color?: string;
}

/**
 * Resmi ONCE sembolü: kum saati formu, üstte mühürlü zarf/mektup siluetiyle birleşmiş.
 * Kurallar (bkz. strateji dokümanı Bölüm 0.1):
 * - Küçük, sakin, %50-70 opaklık, asla baskın veya dekoratif değil.
 * - Anı fotoğraflarının üzerine asla yerleştirilmez.
 */
export function OnceLogo({ size = 22, opacity = 0.6, color = '#F4F1EA' }: OnceLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      style={{ opacity, display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        d="M 430 250 L 600 250 Q 600 250 600 280 L 600 310 Q 600 330 580 345 L 512 390 L 444 345 Q 424 330 424 310 L 424 280 Q 424 250 430 250 Z"
        stroke={color}
        strokeWidth="24"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 430 530 L 600 530 Q 600 530 600 500 L 600 470 Q 600 450 580 435 L 512 390 L 444 435 Q 424 450 424 470 L 424 500 Q 424 530 430 530 Z"
        stroke={color}
        strokeWidth="24"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M 470 330 L 512 390 L 554 330 Z" fill={color} opacity="0.9" />
    </svg>
  );
}
