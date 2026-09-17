/** Original monogram reconstructed as editable paths, cropped to its actual bounds. */
export function BrandMark({ className = "", animated = false }: {
  className?: string;
  animated?: boolean;
}) {
  return <svg className={`brand-mark ${animated ? "brand-mark-draw" : ""} ${className}`}
    viewBox="238 201 604 678" fill="none" stroke="currentColor"
    strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" focusable="false">
    <path pathLength="1" d="M528 209 250 366 543 536 825 374 674 290 537 369" />
    <path pathLength="1" d="M246 374 246 701 538 869 538 672 417 612" />
    <path pathLength="1" d="M834 383 549 546 549 870 827 700 827 546 695 626" />
    <path pathLength="1" strokeWidth="1.5" d="M250 366 825 377" />
    <path pathLength="1" strokeWidth="1.5" d="M246 701 544 543 827 700" />
    <path pathLength="1" d="M246 374 540 546" />
  </svg>;
}
