// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");
const mdEscape = require("markdown-escape");
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
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");

  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { issue } = github.context.payload;

  // const { data: issueFromGH } = await octokit.rest.issues.createComment({
  //   ...context.repo,
  //   issue_number: issue.number,
  //   body: "I am so in ACTION!",
  // });

  console.log("--------------------");
  const translated = fnTranslate(mdEscape(issue.body.trim()));
  console.log(translated);
  console.log("--------------------");

  // try {
  //   const newIssue = await jiraClient.issues.createIssue({
  //     fields: {
  //       summary: issue.title,
  //       issuetype: {
  //         name: core.getInput("JIRA_ISSUE_NAME"),
  //       },
  //       project: { key: core.getInput("JIRA_PROJECT_ID") },
  //       description: fnTranslate(mdEscape(issue.body)),
  //     },
  //   });

  //   console.log(newIssue);
  // } catch (error) {
  //   console.error(error);
  // }
}

run();
