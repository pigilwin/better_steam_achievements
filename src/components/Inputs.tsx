import {ChangeEventHandler, ReactElement} from "react";

interface InputProps {
    label: string;
    onChange: ChangeEventHandler<HTMLInputElement>,
    id: string,
    errorMessage: string | null,
    value: string
}
export const Input = ({label, onChange, id, errorMessage, value}: InputProps): ReactElement => {

    let error: ReactElement | null = null;
    if (errorMessage !== null) {
        error = <span className="p-2 border border-red-500">{errorMessage}</span>
    }

    return (
        <span className="flex flex-col gap-2">
            <label className="p-2" htmlFor={id}>{label}</label>
            <input
                id={id}
                className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none p-2"
                onChange={onChange}
                value={value}
            />
            {error}
        </span>
    );
}

interface RangeProps {
    label: string;
    onChange: ChangeEventHandler<HTMLInputElement>,
    id: string,
    value: number,
    min: number,
    max: number
}
export const Range = ({label, onChange, id, value, min, max}: RangeProps): ReactElement => {
    return (
        <span className="flex flex-col gap-2">
            <label className="p-2" htmlFor={id}>{label}</label>
            <input
                type="range"
                min={min}
                max={max}
                id={id}
                onChange={onChange}
                value={value}
                className="text-sm sm:text-base relative w-full border rounded focus:border-indigo-400 focus:outline-none p-2"
            >
            </input>
        </span>
    );
};
