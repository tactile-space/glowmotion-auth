
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'shimmer';
}

export function AnimatedButton({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: AnimatedButtonProps) {
  
  const getButtonClass = () => {
    if (variant === 'shimmer') {
      return cn(
        "relative overflow-hidden rounded-lg px-4 py-2 font-medium transition-all",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      );
    }
    
    return cn(
      "transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.97]",
      className
    );
  };
  
  return variant === 'shimmer' ? (
    <button className={getButtonClass()} {...props}>
      {children}
    </button>
  ) : (
    <Button 
      className={getButtonClass()} 
      variant={variant as any} 
      {...props}
    >
      {children}
    </Button>
  );
}
