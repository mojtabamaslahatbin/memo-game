import React from "react";

type Props = {
    card: string;
    index: number;
    isCardFlipped: boolean;
    flipCard: (index: number) => void;
};

const Card: React.FC<Props> = ({ card, index, isCardFlipped, flipCard }) => {
    return (
        <div
            className={"card-outer " + (isCardFlipped ? "flipped" : "")}
            key={index}
            onClick={() => flipCard(index)}
        >
            <div className="card">
                <div className="front">
                    <img src={card} alt="card" />
                </div>
                <div className="back"></div>
            </div>
        </div>
    );
};

export default Card;
