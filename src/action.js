// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");
const { Version3Client } = require("jira.js");
const fnTranslate = require("md-to-adf");

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
  const jiraIssueName = core.getInput("jiraIssueName");
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");

  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { issue } = context.payload;

  // const { data: issueFromGH } = await octokit.rest.issues.createComment({
  //   ...context.repo,
  //   issue_number: issue.number,
  //   body: "I am so in ACTION!",
  // });

  console.log(issue);

  // try {
  //   const newIssue = await jiraClient.issues.createIssue({
  //     fields: {
  //       summary: "Issue from the script",
  //       issuetype: {
  //         name: jiraIssueName,
  //       },
  //       project: { key: jiraProjectId },
  //       description: fnTranslate(issue.body),
  //     },
  //   });
  // } catch (error) {}
}

run();
