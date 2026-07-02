import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import type { PromptExample } from '../data/workflows'

export function PromptCard({ prompt }: { prompt: PromptExample }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = prompt.prompt
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-gray-100">
        <div>
          <div className="font-medium text-sm text-gray-900">{prompt.title}</div>
          <div className="text-xs text-gray-500 mt-0.5">{prompt.when}</div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100"
        >
          {copied ? (
            <>
              <Check size={13} className="text-green-600" />
              복사됨
            </>
          ) : (
            <>
              <Copy size={13} />
              복사
            </>
          )}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-words px-4 py-3 text-[13px] leading-relaxed text-gray-700 font-mono bg-gray-50/60">
        {prompt.prompt}
      </pre>
    </div>
  )
}
