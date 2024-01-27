import {ChangeEvent, ReactElement, useState} from "react";
import {GameCard} from "@components/GameCard";
import {Games} from "@store/types";
import {Range} from "@components/Inputs";

interface GridProps {
    games: Games;
}

export const ResizableGrid = ({games}: GridProps): ReactElement => {
    const [items, setItems] = useState<number>(3);

    const cards = [];
    for (const [key, value] of Object.entries(games)) {
        cards.push(
            <GameCard game={value} key={key}/>
        );
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setItems(Number.parseInt(event.currentTarget.value));
    };

    const possibleClasses: Record<number, string> = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
        11: 'grid-cols-11',
        12: 'grid-cols-12'
    };

    const gridClasses: string[] = [
        'bg-white',
        'w-full',
        'p-2',
        'rounded-md',
        'grid',
        possibleClasses[items],
        'gap-4'
    ];

    return (
        <>
            <article className="bg-white w-full p-2 rounded-md flex justify-end h-full gap-1">
                <Range
                    column={false}
                    label="How many games per row?"
                    onChange={onChange}
                    id="games-per-row"
                    value={items}
                    min={1}
                    max={5}
                />
            </article>
            <article className={gridClasses.join(' ')}>
                {cards}
            </article>
        </>
    );
};
