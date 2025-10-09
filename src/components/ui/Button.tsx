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
  const baseClasses = `rounded-3xl px-4 py-2 cursor-pointer transition-colors duration-200`;

  const variants = {
    default: `  border border-foreground/20 hover:border-white/50 text-foreground`,
    white: `bg-white  border border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-background font-medium`,
  };

  return (
    <button
      className={`${baseClasses}  ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
