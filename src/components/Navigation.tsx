import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils"
import { BlogTags } from "@/lib/BlogTags";
import type { ComponentPropsWithRef } from "react";


export function Navigation({ currentPath }: { currentPath: string }) {
  return (
    <NavigationMenu className="justify-self-center" orientation="horizontal" delayDuration={500}>
      <NavigationMenuList>
        <NavigationMenuItem><Link href="/" title="Home" /></NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {/* TODO: the submenu briefly pops up when clicking the link */}
            <Link href="/blog" title="Blog" hasSubmenu={true} />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-wrap gap-4 w-80 p-4">
              {
                BlogTags.map(tag => (
                  <li>
                    <Link href={`/blog/tags/${tag}`} title={tag} />
                  </li>
                ))
              }
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem><Link href="/about" title="About" /></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  type LinkProps = ComponentPropsWithRef<"a"> & {
    title: string;
    hasSubmenu?: boolean;
  };
  function Link({ href, title, hasSubmenu, ...props }: LinkProps) {
    // TODO: not currently in use, since the links get highlighted just fine, so prob remove this plumbing
    // the current problem is that the blog link doesn't get highlighted.
    const active = currentPath == href;
    return (
      <NavigationMenuLink asChild active={active}>
        <a {...props} href={href} className={cn(
          "transition-colors rounded-md",
          !hasSubmenu ? navigationMenuTriggerStyle() : "",
          // these go at the end because they override navigationMenuTriggerStyle
          "text-xl font-medium")}>
          {title}
        </a>
      </NavigationMenuLink>
    );
  };
}
