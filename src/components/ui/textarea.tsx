import * as React from "react"
import { cn } from "@/lib/utils"
import { fieldBase } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "field-sizing-content min-h-24 resize-none py-3 leading-normal", className)}
      {...props}
    />
  )
}

export { Textarea }
