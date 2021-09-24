// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");
const { Version3Client } = require("jira.js");
const fnTranslate = require("md-to-adf");

const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
const octokit = github.getOctokit(GITHUB_TOKEN);
const { issue } = github.context.payload;
const hasLabel = issue.labels.find(
  (label) => label.name === core.getInput("TRIGGER_LABEL")
);

const jiraClient = new Version3Client({
  host: core.getInput("JIRA_API_HOST"),
  authentication: {
    basic: {
      apiToken: core.getInput("JIRA_API_TOKEN"),
      email: core.getInput("JIRA_EMAIL"),
    },
  },
});

async function createIssueInJIRA() {
  if (!hasLabel) {
    console.log("No trigger label detected. Skipping...");
    return;
  }

  const descriptionBody = `${issue.body}
    ---
    Github issue: [${issue.title}](${issue.html_url})
  `;

  try {
    const newIssue = await jiraClient.issues.createIssue({
      fields: {
        summary: issue.title,
        issuetype: {
          name: core.getInput("JIRA_ISSUE_NAME"),
        },
        project: { key: core.getInput("JIRA_PROJECT_ID") },
        description: fnTranslate(descriptionBody),
      },
    });

    if (newIssue.id) {
      const { data: newComment } = await octokit.rest.issues.createComment({
        ...github.context.repo,
        issue_number: issue.number,
        body: core.getInput("after-jira-issue-message"),
      });

      console.log(newComment);
    }
  } catch (error) {
    console.error(error);
  }
}

createIssueInJIRA();
