import React from "react";
import ReviewStar from "@/components/review/reviewStar";
import styles from "../../styles/components/review/reviewStars.module.css";

interface RatingProps {
    rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
    const wholeStars = Math.floor(rating);
    const fractionalStar = rating - wholeStars;
    const starsArray = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
        <div className={styles.ratingContainer}>
            <div className={styles.starsWrapper}>
                {starsArray.map((star, index) => {
                    let fillPercentage = 0;
                    if (index < wholeStars) {
                        fillPercentage = 100;
                    } else if (index === wholeStars) {
                        fillPercentage = fractionalStar * 100;
                    }
                    return <ReviewStar key={index} fillPercentage={fillPercentage} />;
                })}
            </div>
        </div>
    );
};

export default Rating;
