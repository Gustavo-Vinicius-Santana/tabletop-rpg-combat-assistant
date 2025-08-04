"use client";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/ui/shadcn/components/collapsible";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/ui/shadcn/components/sidebar";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { IconType } from "react-icons";
import Link from "next/link";

type MenuOption = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: IconType;
};

interface SidebarMenuSectionProps {
  title: string;
  icon?: IconType;
  options: MenuOption[];
  defaultOpen?: boolean;
}

export function MenuCollapse({
  title,
  icon: Icon,
  options,
  defaultOpen = false,
}: SidebarMenuSectionProps) {
  return (
    <SidebarMenu className="pt-3">
      <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="flex items-center hover:bg-sessions rounded-md py-5 cursor-pointer hover:-translate-y-1 transition duration-300 ease-in-out justify-between w-full gap-3 text-base md:text-lg mb-1">
              <div className="flex items-center gap-3">
                {Icon && <Icon className="text-2xl" />}
                <span className="font-medium">{title}</span>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  "group-data-[state=open]/collapsible:rotate-180"
                )}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {options.map(({ href, onClick, label, icon: OptionIcon }, index) => (
                <SidebarMenuSubItem key={index}>
                  {href ? (
                    <Link
                      href={href}
                      className="flex items-center px-3 py-1 hover:bg-sessions rounded-md transition duration-300 ease-in-out text-sm md:text-base"
                    >
                      {OptionIcon && <OptionIcon className="text-xl" />}
                      <span className="ml-2 hover:translate-x-1 transition duration-300 ease-in-out">
                        {label}
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={onClick}
                      className="w-full text-left flex items-center px-3 py-1 hover:bg-sessions rounded-md transition duration-300 ease-in-out text-sm md:text-base"
                    >
                      {OptionIcon && <OptionIcon className="text-xl" />}
                      <span className="ml-2 hover:translate-x-1 transition duration-300 ease-in-out">
                        {label}
                      </span>
                    </button>
                  )}
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}