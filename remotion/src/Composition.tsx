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
	addedFiles: Array<Array<string>>;
	deletedFiles: Array<Array<string>>;
	modifiedFiles: Array<Array<string>>;
}> = ({
	repository,
	repoLogo,
	messages,
	authorUsernames,
	commitIds,
	addedFiles,
	modifiedFiles,
	deletedFiles,
}) => {
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
						[-50, -8],
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
								<h1>🙂 {authorUsernames[index]}</h1>
								<h1>✍️ {item}</h1>

								<div
									style={{
										width: '70%',
										height: '5px',
										background: 'royalblue',
									}}
								/>

								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-evenly',
										width: '80%',
										height: 'auto',
										flexDirection: 'row',
										boxShadow: 'gray 0px 2px 8px 0px',
										marginTop: '3em',
									}}
								>
									{addedFiles[index].length ? (
										<h1
											style={{
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											{addedFiles[index].map((item: string) => {
												return (
													<span
														style={{
															color: 'lime',
															textShadow: '1px 1px 4px black',
														}}
													>
														+ {item}
													</span>
												);
											})}
										</h1>
									) : null}

									{modifiedFiles[index].length ? (
										<h1
											style={{
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											{modifiedFiles[index].map((item: string) => {
												return (
													<span
														style={{
															color: 'yellow',
															textShadow: '1px 1px 7px black',
														}}
													>
														&#xb1; {item}
													</span>
												);
											})}
										</h1>
									) : null}

									{deletedFiles[index].length ? (
										<h1
											style={{
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											{deletedFiles[index].map((item: string) => {
												return (
													<span
														style={{
															color: 'tomato',
															textShadow: '1px 1px 4px black',
														}}
													>
														- {item}
													</span>
												);
											})}
										</h1>
									) : null}
								</div>
							</AbsoluteFill>
						</Sequence>
					);
				})}
			</AbsoluteFill>
		</>
	);
};
