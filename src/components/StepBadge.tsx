import { ShieldCheck } from 'lucide-react'

export function StepBadge({
  order,
  isGate,
  size = 'md',
}: {
  order: number
  isGate: boolean
  size?: 'sm' | 'md'
}) {
  const dims = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <span
      className={`inline-flex ${dims} shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-sm ${
        isGate
          ? 'bg-gradient-to-br from-slate-500 to-slate-700'
          : 'badge-gradient'
      }`}
    >
      {isGate ? (
        <ShieldCheck size={size === 'sm' ? 14 : 17} />
      ) : (
        <span className={textSize}>{order}</span>
      )}
    </span>
  )
}
