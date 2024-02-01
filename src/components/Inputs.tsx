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
                className="text-sm sm:text-base relative border rounded focus:border-indigo-400 focus:outline-none p-2"
            >
            </input>
        </Wrapper>
    );
};

interface ToggleSwitchProps {
    value: boolean;
    title: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}
export const ToggleSwitch = ({title, onChange, value}: ToggleSwitchProps): ReactElement => {
    return (
        <div className="flex flex-col">
            <div className="ml-3 text-xl">{title}</div>
            <div className="toggle-switch flex flex-col p-4">
                <label className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input onChange={onChange} checked={value} type="checkbox" className="hidden" />
                        <div className="toggle__line w-10 h-4 bg-white rounded-full shadow-inner"></div>
                        <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                    </div>
                </label>
            </div>
        </div>
    );
}
