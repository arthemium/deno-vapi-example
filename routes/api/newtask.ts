import { FreshContext } from "$fresh/server.ts";

import twilio from "npm:twilio";

const accountSid = "ACbd5894a9da4ac0a3435b67dc25fd0839";
const authToken = "66decf82a9df3e86c8522f1c83edabdf";
const workspaceSid = "WS435c1a55a4419a152d823634e07eb375";
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
