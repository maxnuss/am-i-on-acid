# am-i-on-acid
The lack of payoff is its own reward.

## Local development and testing
- Pull latest updates
- Run `npm install`
- Make changes
- Run `node index.js` to start the app on port 3000
- Open http://localhost:3000 in your browser

## Deploy the app
- Commit changes
- Push changes to GitHub with `git push origin master` (1)
- Push changes to Heroku with `git push heroku master` (2)


1. Assuming you have `origin` pointing to `git@github.com:maxnuss/am-i-on-acid.git`. Verify by running `git remote -v`

2. This requires installing the Heroku command line tool which can be found [here](https://devcenter.heroku.com/articles/heroku-cli). Then the Heroku app can be set as a remote with `heroku git:remote -a am-i-on-acid` if your Heroku accound has been added to this project.
