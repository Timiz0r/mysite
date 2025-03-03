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
          <NavigationMenuTrigger className="p-4 h-fit">
            <Link href="/blog" title="Blog" hasSubmenu={true} />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-2 gap-4 w-80 p-4">
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
    const active = currentPath == href;
    return (
      <NavigationMenuLink asChild active={active}>
        <a {...props} href={href} className={cn(
          "text-xl font-medium rounded-md transition-colors w-fit",
          active ? "border-b-2 border-accent-foreground" : "",
          !hasSubmenu ? "p-4 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" : "")}>
          {title}
        </a>
      </NavigationMenuLink>
    );
  };
}
