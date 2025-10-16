
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 3-1.9 5.8-5.6.8 4 3.9-1 5.5 5-2.6 5 2.6-1-5.5 4-3.9-5.6-.8Z" />
    <path d="M6 19.5 4.5 21l-1.5-1.5" />
    <path d="M19.5 3 21 4.5 19.5 6" />
    <path d="M18 13.5 19.5 15l-1.5 1.5" />
  </svg>
);
