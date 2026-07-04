"use client";

import React from "react";
import Button from "../ui/Button";

const FilterNav = ({
    acitveFilter,
    setActiveFilter,
}: {
    acitveFilter: string;
    setActiveFilter: (item: string) => void;
}) => {
    return (
        <div className="overflow-x-auto scrollbar-hide">
            <ul className="flex grow-0 shrink-0 gap-3 md:gap-6">
                {filternav.map((item) => (
                    <li key={item} onClick={() => setActiveFilter(item)}>
                        <Button
                            className={`${item === acitveFilter
                                ? "gradientAnimateWhite !text-background"
                                : ""
                                } whitespace-nowrap !text-xs`}
                        >
                            {item}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterNav;

const filternav = [
    "All",
    "Web Apps",
    "Mobile Apps",
];
