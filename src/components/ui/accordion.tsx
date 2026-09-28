import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "@/lib/utils"
import { IconPlus } from "@/components/icons"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root data-slot="accordion" className={cn("flex w-full flex-col gap-3", className)} {...props} />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "rounded-[22px] bg-paper shadow-plush-sm transition-colors duration-200 data-open:bg-mint-soft/60",
        className,
      )}
      {...props}
    />
  )
}

/* «Плюс» поворачивается в «крестик» — индикатор состояния, а не украшение */
function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-4 rounded-[22px] px-5 py-4 text-left font-display text-[17px] font-extrabold tracking-[-0.01em] outline-none focus-visible:outline-3 focus-visible:outline-ink sm:text-lg",
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-ink shadow-plush-sm transition-transform duration-[250ms] ease-[var(--ease-spring)] group-aria-expanded/accordion-trigger:rotate-45">
          <IconPlus size={18} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-ink-soft transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0"
      {...props}
    >
      <div className={cn("px-5 pb-5 text-[16.5px] leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
