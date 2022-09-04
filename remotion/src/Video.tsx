import {Composition, getInputProps} from 'remotion';
import {MyComposition} from './Composition';

export const RemotionVideo: React.FC = () => {
	const props = getInputProps();
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
