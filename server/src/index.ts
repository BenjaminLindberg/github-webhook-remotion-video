/* @ts-ignore */
import GithubWebHook from 'express-github-webhook';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import Render from './utils/Render';

let app = express();
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
	});
	res.status(200);
});
app.listen(3000);
