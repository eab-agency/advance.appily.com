'use client'
 
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components";
 
export default function ABButton({ label, appearance, href, className}) {
  const searchParams = useSearchParams()?.toString()

  return <Button
  label={label}
  appearance={appearance}
  href={`${href}?${searchParams}`}
  className={className}
  />
}