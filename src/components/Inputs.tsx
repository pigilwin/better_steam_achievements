import {ChangeEventHandler, PropsWithChildren, ReactElement} from "react";

interface InputWrapper {
    column: boolean;
}
const Wrapper = ({column, children}: PropsWithChildren<InputWrapper>): ReactElement => {
    const classes = ['flex gap-2'];
    if (column) {
        classes.push('flex-col');
    } else {
        classes.push('flex-row');
    }

    return (
        <span className={classes.join(' ')}>
            {children}
        </span>
    );
}

interface InputProps extends InputWrapper {
    label: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    id: string;
    errorMessage: string | null;
    value: string;
}
export const Input = ({label, onChange, id, errorMessage, value, column}: InputProps): ReactElement => {

    let error: ReactElement | null = null;
    if (errorMessage !== null) {
        error = <span className="p-2 border border-red-500">{errorMessage}</span>
    }

    return (
        <Wrapper column={column}>
            <label className="p-2" htmlFor={id}>{label}</label>
            <input
                id={id}
                className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none p-2"
                onChange={onChange}
                value={value}
            />
            {error}
        </Wrapper>
    );
}

interface RangeProps extends InputWrapper {
    label: string;
    onChange: ChangeEventHandler<HTMLInputElement>,
    id: string,
    value: number,
    min: number,
    max: number
}
export const Range = ({label, onChange, id, value, min, max, column}: RangeProps): ReactElement => {
    return (
        <Wrapper column={column}>
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
        </Wrapper>
    );
};
