import type { DelegationLevel } from '../data/workflows'

const STYLES: Record<DelegationLevel, string> = {
  automate: 'bg-[var(--lvl-automate)] text-white border-[var(--lvl-automate)]',
  augment: 'bg-[var(--lvl-augment-light)] text-[var(--lvl-augment)] border-[var(--lvl-augment-border)]',
  amplify:
    'bg-[var(--lvl-amplify-light)] text-[var(--lvl-amplify)] border-[var(--lvl-amplify-border)] border-dashed',
  'human-own': 'bg-[var(--lvl-human)] text-white border-[var(--lvl-human)]',
}

const DOT_STYLES: Record<DelegationLevel, string> = {
  automate: 'bg-[var(--lvl-automate)]',
  augment: 'bg-[var(--lvl-augment)]',
  amplify: 'bg-[var(--lvl-amplify)]',
  'human-own': 'bg-[var(--lvl-human)]',
}

export const LABELS: Record<DelegationLevel, string> = {
  automate: 'Automate',
  augment: 'Augment',
  amplify: 'Amplify',
  'human-own': 'Human Own',
}

export function DelegationBadge({ level }: { level: DelegationLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLES[level]}`}
    >
      {LABELS[level]}
    </span>
  )
}

export function DelegationDot({ level }: { level: DelegationLevel }) {
  return (
    <span
      title={LABELS[level]}
      className={`inline-block h-2 w-2 rounded-full ${DOT_STYLES[level]}`}
    />
  )
}
