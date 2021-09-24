const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  console.log("Holla!");

  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");

  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { issue } = context.payload;

  await octokit.issues.createComment({
    ...context.repo,
    issue_number: issue.number,
    body: "I am so in ACTION!",
  });
}

run();
