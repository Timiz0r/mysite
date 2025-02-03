import { execSync } from "child_process";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// Originally tried providing dayjs, then Date. Everything ends up being a string, so no point.
// Also why remarked-formatter.ts is a thing.
export function remarkModifiedTime() {
  return function (_, file) {
    const filepath = file.history[0];
    // TODO: would prefer not running many sync commands, so find a way to build a map
    // not high pri unless there are many posts, though.
    const timestamp = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    const time = dayjs(timestamp);
    file.data.astro.frontmatter.lastModified = time.utc().format("YYYY-MM-DDTHH:mm:ss.sssZ");
  };
}