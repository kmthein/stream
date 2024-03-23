"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { FaMoon, FaSun } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";

import { cn } from "@/lib/utils"

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-7 w-9 rounded-full bg-white dark:bg-[#181818] shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}>{props.isDarkMode ? <FaMoon className=" mx-auto my-1 text-[#e6d466]" /> : <FaSun className=" mx-auto my-1 text-[#ffc252]" />}</SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
