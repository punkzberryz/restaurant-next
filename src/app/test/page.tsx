import { UnauthorizedMessageCode } from "@/components/error-ui";
import { validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import React from "react";

const TestPage = async () => {
  const { user } = await validateRequest();
  if (user?.role !== "ADMIN") {
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
  }
  return <div>TestPage</div>;
};

export default TestPage;
