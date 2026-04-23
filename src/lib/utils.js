import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

// Atelier luma-flip helper. Returns ink for light tiles, paper for dark.
// YIQ threshold 0.58 — spec §inkOrPaper(on:).
export const INK = '#1A1612'
export const PAPER = '#E2DDD0'

export function inkOrPaper(hex) {
  const { r, g, b } = hexToRgb(hex)
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luma > 0.58 ? INK : PAPER
}
