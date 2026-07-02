import type { DelegationLevel } from '../data/workflows'

const STYLES: Record<DelegationLevel, string> = {
  automate: 'bg-indigo-600 text-white border-indigo-600',
  augment: 'bg-indigo-50 text-indigo-700 border-indigo-300',
  amplify: 'bg-indigo-50 text-indigo-700 border-indigo-300 border-dashed',
  'human-own': 'bg-white text-gray-600 border-gray-300',
}

const DOT_STYLES: Record<DelegationLevel, string> = {
  automate: 'bg-indigo-600',
  augment: 'bg-indigo-300',
  amplify: 'bg-indigo-300',
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
