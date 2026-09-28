import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cn } from "@/lib/utils"

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-6", className)} {...props} />
}

/* Список вкладок — «капсула» с ползунком-индикатором, который переезжает между вкладками */
function TabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("relative z-0 flex w-max gap-1 rounded-full bg-paper p-1.5 shadow-plush-sm", className)}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        data-slot="tabs-indicator"
        className="absolute top-1.5 left-0 -z-10 h-[calc(100%-12px)] w-(--active-tab-width) translate-x-(--active-tab-left) rounded-full bg-ink transition-[translate,width] duration-[250ms] ease-[var(--ease-in-out)]"
      />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative flex h-10 items-center gap-2 rounded-full px-4 text-[15px] font-bold whitespace-nowrap text-ink transition-colors duration-200 outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink data-active:text-cream hov:bg-ink/5 data-active:hov:bg-transparent",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={cn("outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
