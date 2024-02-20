import { FreshContext } from "$fresh/server.ts";

import twilio from "npm:twilio";

const accountSid = "xx";
const authToken = "xx";
const workspaceSid = "xx";
const assignToAnyoneWorkflow = "WW2998cfb7095cfe11322e4a98eafeb025";

const client = twilio(accountSid, authToken);


export const handler = async (_req: Request, _ctx: FreshContext) => {
  console.log(_req.body);
    const task = await client.taskrouter.v1.workspaces(workspaceSid).tasks.create(
    {
      attributes:
        JSON.stringify({conversation: _req.body}), 
        workflowSid: assignToAnyoneWorkflow
    });
    const res = new Response( task.sid );
    return res;
}


//export const handler = (_req: Request, _ctx: FreshContext): Response => {
//  const randomIndex = Math.floor(Math.random() * JOKES.length);
//  const body = JOKES[randomIndex];
//  return new Response(body);
//};
