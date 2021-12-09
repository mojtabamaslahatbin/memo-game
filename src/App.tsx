import { useState } from "react";
import shuffle from "lodash/shuffle";
import "./App.css";
import imagesArray from "./Images";
import Card from "./Components/Card";
import Button from "@mui/material/Button";

function App() {
    const [cards, setCards] = useState<string[]>(shuffle([...imagesArray, ...imagesArray]));
    const [activeCards, setActiveCards] = useState<number[]>([]);
    const [foundPairs, setFoundPairs] = useState<number[]>([]);
    const [gameWon, setGameWon] = useState<boolean>(false);

    const handleReset = () => {
        setCards(shuffle([...imagesArray, ...imagesArray]));
        setGameWon(false);
        setActiveCards([]);
        setFoundPairs([]);
    };

    const handleGlimpse = () => {
        const currentActiveCards = [...activeCards];
        const activeCardHelp = [];
        for (let i = 0; i < cards.length; i++) {
            activeCardHelp.push(i);
        }
        setActiveCards(activeCardHelp);
        setTimeout(() => {
            setActiveCards(currentActiveCards);
        }, 2000);
    };

    const flipCard = (index: number) => {
        if (activeCards.length === 0) {
            setActiveCards([...activeCards, index]);
        }

        if (activeCards.length === 1) {
            setActiveCards([...activeCards, index]);
            const firstCardIndex = activeCards[0];
            const secondCardIndex = index;
            setTimeout(() => {
                if (cards[firstCardIndex] === cards[secondCardIndex]) {
                    if (foundPairs.length + 2 === cards.length) {
                        setGameWon(true);
                    }
                    setFoundPairs([...foundPairs, firstCardIndex, secondCardIndex]);
                    setActiveCards([]);
                } else {
                    setActiveCards([]);
                }
            }, 500);
        }
    };

    return (
        <div className="App">
            <div className="board">
                {cards.map((card, index) => {
                    const isCardFlipped = activeCards.includes(index) || foundPairs.includes(index);
                    return (
                        <Card
                            key={index}
                            card={card}
                            index={index}
                            isCardFlipped={isCardFlipped}
                            flipCard={flipCard}
                        />
                    );
                })}
                {gameWon && (
                    <div className="text-message">
                        <h4>Found Pairs : {foundPairs.length / 2}</h4>
                        <span>
                            <Button variant="contained" onClick={handleGlimpse}>
                                Help
                            </Button>
                        </span>
                    </div>
                )}
                {!gameWon && (
                    <div className="text-message">
                        <h4>Found Pairs : {foundPairs.length / 2}</h4>
                        <h1>You Won!!</h1>
                        <span>
                            <Button variant="contained" onClick={handleReset}>
                                RESET GAME
                            </Button>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
