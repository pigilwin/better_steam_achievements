import {Achievements} from "@store/game/achievement";

interface GameProgressBarProps {
    achievements: Achievements
}
export const GameProgressBar = ({achievements}: GameProgressBarProps) => {

    const values = Object.values(achievements);
    const completed = values.filter(ach => ach.completed);

    const percentage = (howMuch: number, totalValue: number): number => {
        return (100 * howMuch) / totalValue;
    }

    const amount = percentage(completed.length, values.length);
    const style = {width: `${amount}%`};

    return (
        <span className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-4 leading-none rounded-full"
                 style={style}> {amount}%
            </div>
        </span>
    );
};