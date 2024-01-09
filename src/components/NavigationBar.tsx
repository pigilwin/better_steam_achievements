import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

interface NavigationBarProps {}
export const NavigationBar = ({}: NavigationBarProps): JSX.Element => {

    const navigate = useNavigate();

    const openSettingsHandler = () => {
        navigate('/settings');
    };

    return (
        <nav className="flex justify-between items-center p-2 mx-4 bg-white rounded-md sticky top-2">
            <div className="w-full">
                <span className="text-lg">Better Steam Achivements</span>
            </div>
            <div className="w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center justify-between h-full py-1 pb-4 sm:py-0 sm:pb-0">
                <span className="p-2">
                    <Button buttonText={"Settings"} onClick={openSettingsHandler}/>
                </span>
            </div>
        </nav>
    );
};