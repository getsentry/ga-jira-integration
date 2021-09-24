// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");
const { Version3Client } = require("jira.js");

const jiraClient = new Version3Client({
  host: core.getInput("JIRA_API_HOST"),
  authentication: {
    basic: {
      apiToken: core.getInput("JIRA_API_TOKEN"),
      email: core.getInput("JIRA_EMAIL"),
    },
  },
});

async function run() {
  const jiraProjectId = core.getInput("JIRA_PROJECT_ID");

  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");

  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { issue } = context.payload;

  // const { data: issueFromGH } = await octokit.rest.issues.createComment({
  //   ...context.repo,
  //   issue_number: issue.number,
  //   body: "I am so in ACTION!",
  // });

  // console.log(issueFromGH);

  const issueMeta = await jiraClient.issues.getCreateIssueMeta({
    projectIds: [jiraProjectId],
  });

  console.log(issueMeta);
}

run();
