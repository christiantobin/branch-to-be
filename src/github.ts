import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Use an environment variable for the token
});

export async function getPullRequests(owner: string, repo: string) {
  const { data } = await octokit.pulls.list({
    owner,
    repo,
    state: 'open',
  });
  return data;
}

export async function getBranch(owner: string, repo: string, branch: string) {
  const { data } = await octokit.repos.getBranch({
    owner,
    repo,
    branch,
  });
  return data;
}
