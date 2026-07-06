import type { DelegationLevel } from '../data/workflows'

const STYLES: Record<DelegationLevel, string> = {
  automate: 'bg-[var(--brand)] text-white border-[var(--brand)]',
  augment: 'bg-[var(--brand-light)] text-[var(--brand-dark)] border-[var(--brand-border)]',
  amplify: 'bg-[var(--brand-light)] text-[var(--brand-dark)] border-[var(--brand-border)] border-dashed',
  'human-own': 'bg-white text-gray-600 border-gray-300',
}

const DOT_STYLES: Record<DelegationLevel, string> = {
  automate: 'bg-[var(--brand)]',
  augment: 'bg-[var(--brand-border)]',
  amplify: 'bg-[var(--brand-border)]',
  'human-own': 'bg-gray-300',
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
