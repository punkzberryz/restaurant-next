import { GitHub, Google, Line, Facebook } from "arctic";

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID || "",
  process.env.GITHUB_CLIENT_SECRET || "",
);
export const google = new Google(
  process.env.GOOGLE_CLIENT_ID || "",
  process.env.GOOGLE_CLIENT_SECRET || "",
  process.env.GOOGLE_CALLBACK_URL || "",
);
export const line = new Line(
  process.env.LINE_CLIENT_ID || "",
  process.env.LINE_CLIENT_SECRET || "",
  process.env.LINE_CALLBACK_URL || "",
);
