import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "white";
}

const Button = ({
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) => {
  const baseClasses = `rounded-3xl px-5 py-3 cursor-pointer transition-colors duration-200`;

  const variants = {
    default: `  border border-accent/20 hover:bg-accent/20 transition-all duration-200  text-foreground`,
    white: `bg-white/80   hover:bg-white text-background font-medium`,
  };

  return (
    <button
      className={`${baseClasses}   ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
