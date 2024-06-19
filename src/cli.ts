import { Command } from 'commander';
import { createBranchToBe } from './merge';

const program = new Command();

program
  .name('branch-to-be')
  .description('CLI to create a branch-to-be state from all open PRs')
  .version('1.0.0')
  .arguments('<owner>')
  .arguments('<repo>')
  .arguments('<baseBranch>')
  .action(async (owner, repo, baseBranch) => {
    try {
      await createBranchToBe(owner, repo, baseBranch);
      console.log(`Branch-to-be for ${baseBranch} created successfully.`);
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
