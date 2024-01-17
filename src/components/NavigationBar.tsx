import { BlueButton } from "./Buttons";
import { useNavigate } from "react-router-dom";

interface NavigationBarProps {}
export const NavigationBar = ({}: NavigationBarProps): JSX.Element => {

    const navigate = useNavigate();

    const openHomepageHandler = () => {
        navigate('/');
    };
    const openProfilesHandler = () => {
        navigate('/profiles');
    };
    const openSettingsHandler = () => {
        navigate('/settings');
    };

    return (
        <nav className="flex justify-between items-center p-4 mx-4 bg-white rounded-md sticky top-2">
            <div className="w-full">
                <span className="text-4xl">Better Steam Achievements</span>
            </div>
            <div className="w-full flex flex-row items-center justify-end h-full gap-3">
                <BlueButton buttonText="Homepage" onClick={openHomepageHandler}/>
                <BlueButton buttonText="Profiles" onClick={openProfilesHandler}/>
                <BlueButton buttonText="Settings" onClick={openSettingsHandler}/>
            </div>
        </nav>
    );
};