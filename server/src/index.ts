/* @ts-ignore */
import GithubWebHook from 'express-github-webhook';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import Render from './utils/Render';
import DiscordWebhook from './utils/DiscordWebhook';
import path from 'path';
import * as fs from 'fs';

const config = require('../../config.json');

let app = express();
//app.use(express.static(path.resolve('out')));
app.use(bodyParser.json()); // must use bodyParser in express

app.post('/', (req: Request, res: Response) => {
	Render({
		repository: req.body.repository.full_name,
		repoLogo: req.body.repository.owner.avatar_url,
		messages: req.body.commits.map((commit: any) => {
			return commit.message;
		}),
		commitIds: req.body.commits.map((commit: any) => {
			return commit.id;
		}),
		authorUsernames: req.body.commits.map((commit: any) => {
			return commit.author.username;
		}),
	}).then((res) => {
		DiscordWebhook({
			video: `${config.host}/${res}`,
		});
	});
	res.status(200);
});

app.get('/:id', (req: Request, res: Response) => {
	if (!fs.existsSync(path.resolve(`out/${req.params?.id}.mp4`))) {
		return res.status(404).send({
			error: '404',
		});
	}
	return res.sendFile(path.resolve(`out/${req.params?.id}.mp4`));
});
app.listen(3000, () => console.log('App started'));
