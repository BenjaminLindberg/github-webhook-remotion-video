/* @ts-ignore */
import GithubWebHook from 'express-github-webhook';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import Render from './utils/Render';
import DiscordWebhook from './utils/DiscordWebhook';
import path from 'path';

const config = require('../../config.json');

let app = express();
app.use(express.static(path.resolve('out')));
app.use(bodyParser.json()); // must use bodyParser in express

app.post('/', (req: Request, res: Response) => {
	console.log({
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
	});
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
			video: `${config.host}/${res}.mp4`,
		});
	});
	res.status(200);
});
app.listen(3000);
