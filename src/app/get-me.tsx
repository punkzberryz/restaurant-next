"use client";

import { Button } from "@/components/ui/button";

export const GetMe = () => {
  const handleOnClick = async () => {
    const resp = await fetch("/auth/me");
    const data = await resp.json();
    console.log(data);
  };
  return <Button onClick={handleOnClick}>get me</Button>;
};
