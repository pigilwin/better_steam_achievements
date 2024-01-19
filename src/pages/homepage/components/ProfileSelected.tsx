import {ReactElement} from "react";

interface ProfileSelectedProps {
    gameCount: number;
}
export default ({gameCount}: ProfileSelectedProps): ReactElement => {
    return (
        <article className="flex flex-col items-center justify-center bg-white w-full p-2 rounded-md">
            <h2 className="text-xl">{gameCount} games have been loaded</h2>
            <p className="text-sm">A total of 0 achievements have been acquired.</p>
        </article>
    );
};
