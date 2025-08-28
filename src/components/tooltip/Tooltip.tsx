import { useState, ReactNode, ReactElement, cloneElement } from "react";

interface TooltipProps {
    children: ReactElement<any>[] | ReactElement<any>;
}

export default function Tooltip({ children }: TooltipProps) {
    const [tooltip, setTooltip] = useState({
        visible: false,
        x: 0,
        y: 0,
        content: "",
    });

    const childrenArray = Array.isArray(children) ? children : [children];

    const enhancedChildren = childrenArray.map((child) => {
        const tooltipText = (child.props as any).tooltipText || (child.props as any)["data-tooltip"];

        return cloneElement(child, {
            onMouseMove: (e: React.MouseEvent) => {
                if (tooltipText) {
                    setTooltip({
                        visible: true,
                        x: e.clientX + 15,
                        y: e.clientY + 15,
                        content: tooltipText,
                    });
                }
                if (child.props.onMouseMove) child.props.onMouseMove(e);
            },
            onMouseLeave: (e: React.MouseEvent) => {
                setTooltip({ ...tooltip, visible: false });
                if (child.props.onMouseLeave) child.props.onMouseLeave(e);
            },
        });
    });

    return (
        <div className="relative inline-block">
            {enhancedChildren}
            {tooltip.visible && (
                <div

                    style={{ top: tooltip.y, left: tooltip.x }}
                    className="fixed bg-black text-white text-xs px-2 py-1 rounded pointer-events-none z-50 whitespace-nowrap"
                >
                    {tooltip.content}
                </div>
            )}
        </div>
    );
}
