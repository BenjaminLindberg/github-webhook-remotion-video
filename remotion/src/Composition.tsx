import {
	AbsoluteFill,
	Img,
	Sequence,
	useVideoConfig,
	spring,
	interpolate,
	useCurrentFrame,
} from 'remotion';

export const MyComposition: React.FC<{
	repository: string;
	repoLogo: string;
	messages: string[];
	authorUsernames: string[];
	commitIds: string[];
}> = ({repository, repoLogo, messages, authorUsernames, commitIds}) => {
	const {width, height, fps, durationInFrames} = useVideoConfig();

	const frame = useCurrentFrame();

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
					return (
						<Sequence
							from={fps * (4 + index * 2) + 10}
							durationInFrames={fps * 2 - 10}
						>
							<h1
								style={{
									margin: '1em',
								}}
							>
								Commit {index + 1}
							</h1>
							<AbsoluteFill
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<h1 style={{}}>{authorUsernames[index]}</h1>
								<h1>{item}</h1>
								<h1>{commitIds[index]}</h1>
							</AbsoluteFill>
						</Sequence>
					);
				})}
			</AbsoluteFill>
		</>
	);
};
