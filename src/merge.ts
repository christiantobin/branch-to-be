import { existsSync } from 'fs';
import simpleGit, { SimpleGit } from 'simple-git';
import { getPullRequests } from './github';

export async function createBranchToBe(
  owner: string,
  repo: string,
  baseBranch: string,
): Promise<void> {
  const repoDir = `./tmp/${repo}`;
  if (existsSync(repoDir)) {
    console.log(`Repository already cloned in ${repoDir}`);
  } else {
    console.log(`Cloning repository into ${repoDir}...`);
    await simpleGit().clone(`https://github.com/${owner}/${repo}.git`, repoDir);
  }
  console.log(`Current directory before changing: ${process.cwd()}`);

  if (existsSync(repoDir)) {
    console.log(`Changed directory to: ${process.cwd()}`);
  } else {
    throw new Error(`Directory ${repoDir} does not exist`);
  }

  const git: SimpleGit = simpleGit(repoDir);

  await git.checkout(baseBranch);

  const prs = await getPullRequests(owner, repo);

  for (const pr of prs) {
    try {
      await git.raw([
        'fetch',
        'origin',
        `pull/${pr.number}/head:pr-${pr.number}`,
      ]);
      await git.mergeFromTo(`pr-${pr.number}`, baseBranch, ['--no-ff']);
    } catch (err) {
      console.error(`Error merging PR ${pr.number}:`, err);
    }
  }
}
