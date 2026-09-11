import { Resend } from "resend";

import { createContactHandler } from "../../../lib/contact-email";

export const dynamic = "force-dynamic";

export const POST = createContactHandler({
  getApiKey: () => process.env.RESEND_API_KEY,
  sendEmail: async (apiKey, payload) => {
    const resend = new Resend(apiKey);
    return resend.emails.send(payload);
  },
});
