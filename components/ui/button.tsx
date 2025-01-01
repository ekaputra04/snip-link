import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex justify-center items-center disabled:opacity-50 rounded-md focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 font-medium text-sm whitespace-nowrap transition-colors disabled:pointer-events-none focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        comic:
          "will-change-transform relative flex gap-2 px-4 py-2 border-t-2 border-r-8 hover:border-r-2 border-b-8 border-black hover:border-b-2 border-l-2 rounded-3xl hover:translate-x-1 hover:translate-y-1",
      },
      size: {
        default: "px-4 py-2",
        sm: "rounded-md px-2 py-1",
        lg: "rounded-md px-6 py-2",
        icon: "w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
