import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { AuthNav } from "./auth-nav";
import ThemeToggleButton from "../theme-toggle-button";

export interface BreadcrumbLinkProps {
  href: string;
  title: string;
}

export const PageHeader = ({
  title,
  links,
}: {
  title: string;
  links: BreadcrumbLinkProps[];
}) => {
  return (
    <header className="flex flex-col space-y-4 pb-4 pt-2">
      <MaxWidthWrapper className="flex items-center space-x-4 border-b pb-4 shadow-md">
        <Button size="icon" className="h-7 w-7">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="hidden md:block">{title}</h1>
        {/* User Button */}
        <div className="flex-1">
          <div className="ml-auto mr-4 flex w-fit items-center space-x-2">
            <ThemeToggleButton />
            <AuthNav />
          </div>
        </div>
      </MaxWidthWrapper>
      {/* Breadcrumbs */}

      <MaxWidthWrapper className="pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            {links.map((link, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
                </BreadcrumbItem>
                {index + 1 !== links.length && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </MaxWidthWrapper>
    </header>
  );
};