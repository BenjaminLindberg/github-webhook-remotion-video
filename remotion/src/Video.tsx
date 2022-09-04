import {Composition, getInputProps} from 'remotion';
import {MyComposition} from './Composition';

export const RemotionVideo: React.FC = () => {
	const props = getInputProps();
	/* 	const props = {
		repository: 'B3nnjoe/test-repo',
		repoLogo: 'https://avatars.githubusercontent.com/u/95551073?v=4',
		messages: ['Update readme.md'],
		commitIds: ['3a1b41e1924c15576118d416d284b6c8f9776664'],
		authorUsernames: ['B3nnjoe'],
	}; */
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={
					60 * (4 + props.messages.length * 2) + props.messages.length * 10
				}
				fps={60}
				width={1280}
				height={720}
				defaultProps={{
					...props,
				}}
			/>
		</>
	);
};
