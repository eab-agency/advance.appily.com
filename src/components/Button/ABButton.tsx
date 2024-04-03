'use client'
 
import { useSearchParams } from 'next/navigation'
import { Button as ButtonComponent } from "@/components";
import { Suspense } from 'react'

 
function Button({ label, appearance, href, className}) {
  const searchParams = useSearchParams()?.toString()

  return <ButtonComponent
  label={label}
  appearance={appearance}
  href={`${href}?${searchParams}`}
  className={className}
  />
}

export default function ABButton({label, appearance, href, className}) {
  return (
    <Suspense fallback={<ButtonComponent
      label={label}
      appearance={appearance}
      href={href}
      className={className}
      />}>
      <Button
      label={label}
      appearance={appearance}
      href={href}
      className={className}
      />
    </Suspense>
  )
}