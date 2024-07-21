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
import { SideNavbarToggleButton } from "./side-navbar-toggle-button";
import { SideNavbarMobileView } from "./side-navbar-mobile-view";

export interface BreadcrumbLinkProps {
  href: string;
  title: string;
}

export const PageHeader = ({
  title,
  links,
  role,
}: {
  title: string;
  links: BreadcrumbLinkProps[];
  role: "cashier" | "admin";
}) => {
  return (
    <header className="flex flex-col space-y-4 pb-4 pt-2">
      <MaxWidthWrapper className="flex items-center space-x-4 border-b pb-4 shadow-md">
        <>
          <SideNavbarToggleButton />
          <SideNavbarMobileView role={role} />
        </>
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
