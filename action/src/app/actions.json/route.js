import { createActionHeaders, } from "@solana/actions";

export const GET = async () => {
  const payload = {
    rules: [
      {
        pathPattern: "/*",
        apiPath: "/api/actions/memo",
      }
    ],
  };

  return Response.json(payload, {
    headers: createActionHeaders(),
  });
};


export const OPTIONS = GET;