interface TooltipChildProps {
    tooltipText: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function TooltipChild({
    tooltipText,
    children,
    className,
    onClick,
}: TooltipChildProps) {
    return (
        <div className={className} onClick={onClick} data-tooltip={tooltipText}>
            {children}
        </div>
    );
}
