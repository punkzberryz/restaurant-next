import { UnauthorizedMessageCode } from "@/components/error-ui";
import { UnauthorizedError } from "@/lib/error";
import React from "react";

const TestPage = () => {
  throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
  return <div>TestPage</div>;
};

export default TestPage;
