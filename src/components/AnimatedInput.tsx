
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export function AnimatedInput({ 
  label, 
  icon, 
  error, 
  className, 
  type = 'text',
  ...props 
}: AnimatedInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const id = React.useId();
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  return (
    <div className="relative mb-4">
      <div
        className={cn(
          "group relative flex items-center rounded-lg border border-input bg-background px-3 py-1.5 text-sm transition-all duration-300 ease-out",
          error ? "border-red-500" : focused ? "border-primary shadow-sm ring-1 ring-primary/20" : "",
          "hover:border-primary/50",
          className
        )}
      >
        {icon && (
          <span className={cn(
            "mr-2 text-muted-foreground transition-colors duration-300",
            focused ? "text-primary" : ""
          )}>
            {icon}
          </span>
        )}
        
        <input
          id={id}
          type={inputType}
          className={cn(
            "flex-1 bg-transparent py-2 outline-none placeholder:text-muted-foreground/80",
            "transition-all duration-300"
          )}
          placeholder=" "
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        
        <label
          htmlFor={id}
          className={cn(
            "absolute left-3",
            icon && "left-9",
            "top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
            "transition-all duration-300 ease-out",
            (focused || props.value) ? "text-xs -translate-y-[26px] text-primary" : ""
          )}
        >
          {label}
        </label>
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-red-500 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
