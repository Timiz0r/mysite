export const BlogTags = [
    "ctf",
    "ctf:web",
    "ctf:forensics",
    "ctf:re",
    "ctf:crypto",
    "ctf:pwn",
    "ctf:misc",

    "homelab",
    "programming",
] as const;

export type BlogTag = typeof BlogTags[number];

export function TagGroup<T>(): Record<BlogTag, T[]> {
    return {
        ctf: [],
        "ctf:web": [],
        "ctf:forensics": [],
        "ctf:re": [],
        "ctf:crypto": [],
        "ctf:pwn": [],
        "ctf:misc": [],
        homelab: [],
        programming: []
    };
}
