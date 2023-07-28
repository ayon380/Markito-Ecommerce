import React, { useState } from "react";

const StarRating = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (value) => {
        onRatingChange(value);
    };

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
                <span
                    key={value}
                    className={`cursor-pointer ${(hoverRating || rating) >= value ? "text-yellow-500" : "text-gray-400"
                        }`}
                    onMouseEnter={() => handleMouseEnter(value)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(value)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
