
# Branch-to-Be Service

Branch-to-Be Service is a command-line tool that generates a "branch-to-be" for a given base branch in a GitHub repository. This branch represents the state of the base branch if all open pull requests (PRs) targeting it were merged.

## Features

- Clones a specified GitHub repository.
- Merges all open PRs into a specified base branch.
- Creates a new branch (`<baseBranch>-to-be`) representing the merged state.
- Skips cloning if the repository is already cloned locally.

## Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)
- A GitHub personal access token with repo access.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/branch-to-be-service.git
    cd branch-to-be-service
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Setup

1. Create a `.env` file in the project root directory and add your GitHub personal access token:
    ```env
    GITHUB_TOKEN=your_github_personal_access_token
    ```

2. Ensure the `/tmp` directory is writable and has enough space for cloning repositories.

## Usage

Run the following command to create the "branch-to-be":

```bash
npx ts-node src/cli.ts <owner> <repo> <baseBranch>
```

- `<owner>`: The GitHub owner of the repository (e.g., `your-username`).
- `<repo>`: The GitHub repository name (e.g., `your-repo`).
- `<baseBranch>`: The base branch name (e.g., `main`).

### Example

```bash
npx ts-node src/cli.ts your-username your-repo main
```

This command will:

1. Clone the repository `your-repo` owned by `your-username` into the `/tmp` directory.
2. Checkout the `main` branch.
3. Fetch and merge all open PRs targeting the `main` branch.
4. Push the resulting state to a new branch `main-to-be`.

## Project Structure

```
branch-to-be-service/
├── node_modules/
├── src/
│   ├── github.ts
│   ├── merge.ts
│   └── cli.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── .prettierrc.json
```

- `src/github.ts`: Handles interactions with the GitHub API.
- `src/merge.ts`: Contains the logic to clone the repo, merge PRs, and push the new branch.
- `src/cli.ts`: CLI entry point for the tool.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Troubleshooting

### Common Issues

1. **Repository Not Found**:
    - Ensure the GitHub owner and repository names are correct.
    - Verify that the GitHub token has the necessary permissions.

2. **Merge Conflicts**:
    - If there are merge conflicts, the tool will log the errors. You may need to resolve these conflicts manually.

3. **Permission Denied**:
    - Ensure you have write permissions to the `/tmp` directory.

## Acknowledgements

This project uses the following libraries:
- [Octokit](https://github.com/octokit/rest.js) for GitHub API interactions.
- [simple-git](https://github.com/steveukx/git-js) for Git operations.
- [commander](https://github.com/tj/commander.js) for CLI command parsing.

## Contact

For any questions or support, please open an issue on the GitHub repository.
