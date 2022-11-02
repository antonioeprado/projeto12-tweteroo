import express from "express";
import cors from "cors";

const users = [
	{
		username: "bobesponja",
		avatar:
			"https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	},
];
const tweets = [
	{
		username: "bobesponja",
		tweet: "eu amo o hub",
	},
];

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post(
	"/sign-up",
	(req, res, next) => {
		const user = req.body;
		users.push(user);
		next();
	},
	(req, res) => {
		res.send("Ok");
	}
);

app.post(
	"/tweets",
	(req, res, next) => {
		const tweet = req.body;
		tweets.unshift(tweet);
		next();
	},
	(req, res) => {
		res.send("Ok");
	}
);

app.get("/tweets", (req, res) => {
	const selectedTweets = [];
	const usernames = [];
	const length = tweets.length < 10 ? tweets.length : 10;
	for (let i = 0; i < length; i++) {
		selectedTweets.push(tweets[i]);
		if (!usernames.includes(tweets[i].username)) {
			usernames.push(tweets[i].username);
		}
	}
	const userArray = users.filter((user) => {
		if (usernames.includes(user.username)) {
			return user;
		}
	});
	const resTweets = selectedTweets.map((tweet) => {
		const obj = {
			...tweet,
			avatar: userArray.find((user) => {
				if (user.username === tweet.username) {
					return user;
				}
			}).avatar,
		};
		return obj;
	});
	res.send(resTweets);
});

app.listen(5000, () => {
	console.log("Server listening on port: 5000");
});
