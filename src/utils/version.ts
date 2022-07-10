import * as child from 'child_process';

let gitVersion = '';
if (process.env.GIT_HASH) {
  try {
    gitVersion = child.execSync('git rev-parse Head').toString().trim();
  } catch (e) {}
}

export const version = process.env.GIT_HASH || gitVersion || 'NO_VERSION';
