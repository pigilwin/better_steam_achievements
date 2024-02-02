import {ChangeEvent, ReactElement, useState} from 'react';
import {Achievements} from '@store/game/achievement';
import {ToggleSwitch} from '@components/Inputs';

interface GameAchievementsProps {
    achievements: Achievements
}
export const GameAchievements = ({achievements}: GameAchievementsProps): ReactElement => {
	const [showHidden, setShowHidden] = useState<boolean>(false);
	const [showNotUnlocked, setShowNotUnlocked] = useState<boolean>(false);

	const achievementElements: ReactElement[] = [];
	for (const [key, achievement] of Object.entries(achievements)) {

		if (!showHidden && achievement.hidden) {
			continue;
		}

		if (!showNotUnlocked && !achievement.completed) {
			continue;
		}

		const url = achievement.completed ? achievement.iconUrl : achievement.grayIconUrl;

		achievementElements.push(
			<AchievementRow
				key={key}
				name={achievement.name}
				description={achievement.description}
				url={url}
			/>
		);
	}

	const changeHiddenHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setShowHidden(event.currentTarget.checked);
	};
	const changeNotUnlockedHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setShowNotUnlocked(event.currentTarget.checked);
	};

	return (
		<>
			<article className="w-full flex flex-row gap-2 p-2 bg-white rounded-md">
				<ToggleSwitch
					value={showHidden}
					title="Show hidden?"
					onChange={changeHiddenHandler}
					column={false}
				/>
				<ToggleSwitch
					value={showNotUnlocked}
					title="Show not unlocked?"
					onChange={changeNotUnlockedHandler}
					column={false}
				/>
			</article>
			<article className="w-full flex flex-col gap-2">
				{achievementElements}
			</article>
		</>
	);
};

interface AchievementRowProps {
    name: string;
    description: string;
    url: string;
}

const AchievementRow = ({name, description, url}: AchievementRowProps): ReactElement => {
	return (
		<span className="w-full flex flex-row gap-2 bg-white rounded-md">
			<span className="w-full flex flex-col p-2">
				<p className="text-xl">{name}</p>
				<p>{description}</p>
			</span>
			<span className="p-2">
				<img className="w-12 h-12" alt={`Icon for ${name}`} src={url}/>
			</span>
		</span>
	);
};
