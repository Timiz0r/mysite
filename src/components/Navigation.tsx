import {
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

export function Navigation({ currentPath }: { currentPath: string }) {
  return (
    <NavigationMenu className="justify-self-center" orientation="horizontal">
      <NavigationMenuList>
        <NavigationMenuItem><Link href="/" title="Home" /></NavigationMenuItem>
        <NavigationMenuItem><Link href="/blog" title="Blog" /></NavigationMenuItem>
        <NavigationMenuItem><Link href="/about" title="About" /></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  function Link({ href, title }: { href: string, title: string }) {
    const active = currentPath == href;
    return (
      <NavigationMenuLink asChild>
        <a href={href} className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          active ? "border-b-2 border-accent-foreground" : "")}>
          <div className="text-xl font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    );
  };
}
