const core = require("@actions/core");
const github = require("@actions/github");
const { Version3Client } = require("jira.js");
const fnTranslate = require("md-to-adf");

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
View ${issue.title} on [GitHub](${issue.html_url})


  `;

  try {
    await jiraClient.issues.createIssue({
      fields: {
        summary: issue.title,
        issuetype: {
          name: core.getInput("JIRA_ISSUE_NAME"),
        },
        project: { key: core.getInput("JIRA_PROJECT_ID") },
        description: fnTranslate(descriptionBody),
      },
    });
  } catch (error) {
    console.error(error);
  }
}

createIssueInJIRA();
