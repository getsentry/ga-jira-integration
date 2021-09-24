# Create JIRA issues from Github Issues

Whenever you assign a label to your Github issue and that label matches `TRIGGER_LABEL` from the action configuration `.yml` file, it will trigger this action which will result in a JIRA issue on your JIRA board.

# Usage

As for any Github action, you have to create an `.github/workflows` folder and a yaml file for each workflow configuration you want to have. Most of the time, you need only one workflow for this.

Here is a simple setup:

```yaml
name: Create JIRA issue

on:
  issues:
    types: [labeled]

jobs:
  createIssue:
    runs-on: ubuntu-latest
    steps:
      - uses: vladanpaunovic/ga-jira-integration@main
        with:
          JIRA_API_HOST: ${{secrets.JIRA_API_HOST}}
          JIRA_API_TOKEN: ${{secrets.JIRA_API_TOKEN}}
          JIRA_EMAIL: ${{secrets.JIRA_EMAIL}}
          TRIGGER_LABEL: Backlog
          JIRA_PROJECT_ID: TES
          JIRA_ISSUE_NAME: Story
```

> For sensitive information (secrets) in this file, it is recommended to [follow this Github documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) where it shows how to store secrets in GitHub. Stored secrets will be exposed to this GtiHub action.

## PARAMETERS

This is a list of parameters used in your `.yml` file. All parameters are required.

| Parameter         | Description                                                                                                   | Example                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `JIRA_API_HOST`   | The hostname to connect to JIRA                                                                               | `https://mycompany.atlassian.net` |
| `JIRA_API_TOKEN`  | This is JIRA User API Token. You can create one [using this page](https://id.atlassian.com/manage/api-tokens) | `TVSeDycuGWVfDjDwRrpPZJVZ`        |
| `JIRA_EMAIL`      | This is the login/email you're using to connect to JIRA.                                                      | `username@example.com`            |
| `TRIGGER_LABEL`   | The hostname to connect to JIRA.                                                                              | `Jira`                            |
| `JIRA_PROJECT_ID` | A project key. This will tell the action in which project in JIRA to synchronize the issues into              | (like `PRO`, `TES`, `INC`...)     |
| `JIRA_ISSUE_NAME` | This is the name of the issue type, used for storing isues in JIRA                                            | `Story` or `Task`                 |

## Contributing

Feel free to contribute or submit bugs [here](https://github.com/vladanpaunovic/ga-jira-integration/issues).
