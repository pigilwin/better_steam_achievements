import {ReactElement} from "react";
import {Spinner} from "@components/icons";

export default (): ReactElement => {
    return (
        <span className="flex flex-col items-center justify-center bg-white w-full p-2 rounded-md">
            <Spinner/>
        </span>
    );
}