import {
	AbsoluteFill,
	Img,
	Sequence,
	useVideoConfig,
	spring,
	interpolate,
	useCurrentFrame,
} from 'remotion';
import './styles/global.css';

export const MyComposition: React.FC<{
	repository: string;
	repoLogo: string;
	messages: string[];
	authorUsernames: string[];
	commitIds: string[];
}> = ({repository, repoLogo, messages, authorUsernames, commitIds}) => {
	const {width, height, fps, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();

	const logoTop = interpolate(frame, [0, 12], [50, 0], {
		extrapolateRight: 'clamp',
	});
	const size = spring({
		frame,
		fps,
		durationInFrames: 40,
		from: 0,
		to: 1,
		config: {
			damping: 5,
			mass: 0.2,
		},
	});
	return (
		<>
			<AbsoluteFill
				style={{
					color: 'black',
					fontWeight: '600',
					backgroundColor: 'white',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Sequence from={0} durationInFrames={fps * 4}>
					<h1
						style={{
							margin: '1em',
						}}
					>
						{repository}
					</h1>

					<AbsoluteFill
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: `${logoTop}%`,
							transform: `scale(${size})`,
						}}
					>
						<h1
							style={{
								fontSize: '3rem',
							}}
						>
							New commit! 🎉
						</h1>
						<Img src={repoLogo} />
					</AbsoluteFill>
				</Sequence>
				{messages.map((item, index) => {
					const scale = interpolate(
						frame,
						[fps * (4 + index * 2) + 10, fps * (4 + index * 2) + 30],
						[0.2, 1.2],
						{
							extrapolateRight: 'clamp',
						}
					);
					const top = interpolate(
						frame,
						[fps * (4 + index * 2) + 10, fps * (4 + index * 2) + 20],
						[-50, 0],
						{
							extrapolateRight: 'clamp',
						}
					);
					return (
						<Sequence
							from={fps * (4 + index * 2) + 10}
							durationInFrames={fps * 2 - 10}
							style={{
								height: '100%',
								width: '100%',
							}}
						>
							<h1
								style={{
									margin: '1em',
								}}
							>
								{commitIds[index]}
							</h1>
							<AbsoluteFill
								style={{
									display: 'flex',
									flexDirection: 'column',

									alignItems: 'center',
									justifyContent: 'center',
									transform: `scale(${scale})`,
									marginTop: `${top}%`,
								}}
							>
								<h1 style={{}}>🙂 {authorUsernames[index]}</h1>
								<h1>✍️ {item}</h1>
							</AbsoluteFill>
						</Sequence>
					);
				})}
			</AbsoluteFill>
		</>
	);
};
