import type { ReactNode } from 'react'

// Label above, optional hint, control, error below. Ids wire up aria-describedby for screen readers.
export function Field({
  id,
  label,
  required,
  hint,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden>
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-soft"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export const controlClass =
  'w-full border border-rule-strong bg-field px-4 text-base text-ink placeholder:text-ink-soft/70 transition-colors hover:border-ink/60 focus:border-link focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-link aria-[invalid=true]:border-danger'

export const describedBy = (id: string, hasHint: boolean, hasError: boolean) =>
  [hasHint && `${id}-hint`, hasError && `${id}-error`].filter(Boolean).join(' ') || undefined
