import { execSync } from "child_process";


// Originally tried providing dayjs, then Date. Everything ends up being a string, so no point.
// Also why remarked-formatter.ts is a thing.
export function remarkModifiedTime() {
  return function (_, file) {
    const filepath = file.history[0];
    // TODO: would prefer not running many sync commands, so find a way to build a map
    // not high pri unless there are many posts, though.
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}