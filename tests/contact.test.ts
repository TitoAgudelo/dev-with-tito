import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  CONTACT_EMAIL_FROM,
  CONTACT_EMAIL_TO,
  createContactHandler,
  type ContactEmailPayload,
} from "../lib/contact-email";

const validInput = {
  email: " recruiter@example.com ",
  subject: " Staff engineering role ",
  message: " I would like to discuss the role. ",
};

function request(body: unknown) {
  return new Request("http://localhost/api/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("contact endpoint accepts valid input only after the provider accepts it", async () => {
  let sentPayload: ContactEmailPayload | undefined;
  const handler = createContactHandler({
    getApiKey: () => "test-key",
    sendEmail: async (_apiKey, payload) => {
      sentPayload = payload;
      return { data: { id: "email_test" }, error: null };
    },
  });

  const response = await handler(request(validInput));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(sentPayload?.from, CONTACT_EMAIL_FROM);
  assert.equal(sentPayload?.to, CONTACT_EMAIL_TO);
  assert.equal(sentPayload?.replyTo, "recruiter@example.com");
  assert.equal(sentPayload?.subject, "[Portfolio] Staff engineering role");
  assert.match(sentPayload?.text ?? "", /I would like to discuss the role\./);
});

test("contact endpoint rejects invalid input before provider access", async () => {
  let providerCalls = 0;
  const handler = createContactHandler({
    getApiKey: () => "test-key",
    sendEmail: async () => {
      providerCalls += 1;
      return { data: { id: "unexpected" }, error: null };
    },
  });

  const response = await handler(request({
    email: "person@examplecom",
    subject: "Role",
    message: "Hello",
  }));

  assert.equal(response.status, 400);
  assert.equal(providerCalls, 0);
});

test("contact endpoint reports missing server configuration without provider access", async () => {
  let providerCalls = 0;
  const diagnostics: unknown[] = [];
  const handler = createContactHandler({
    getApiKey: () => undefined,
    sendEmail: async () => {
      providerCalls += 1;
      return { data: { id: "unexpected" }, error: null };
    },
    logger: { error: (...details) => diagnostics.push(details) },
  });

  const response = await handler(request(validInput));

  assert.equal(response.status, 503);
  assert.equal(providerCalls, 0);
  assert.equal(diagnostics.length, 1);
  assert.doesNotMatch(JSON.stringify(await response.json()), /RESEND_API_KEY|test-key/);
});

test("contact endpoint does not report success when the provider rejects a message", async () => {
  const diagnostics: unknown[] = [];
  const handler = createContactHandler({
    getApiKey: () => "test-key",
    sendEmail: async () => ({
      data: null,
      error: {
        name: "validation_error",
        statusCode: 403,
        message: "Private provider detail",
      },
    }),
    logger: { error: (...details) => diagnostics.push(details) },
  });

  const response = await handler(request(validInput));
  const body = await response.json();

  assert.equal(response.status, 502);
  assert.equal("success" in body, false);
  assert.doesNotMatch(JSON.stringify(body), /Private provider detail|test-key/);
  assert.deepEqual(diagnostics[0], [
    "Contact email provider rejected the request.",
    { errorName: "validation_error", statusCode: 403 },
  ]);
});

test("contact endpoint sanitizes thrown provider failures", async () => {
  const diagnostics: unknown[] = [];
  const handler = createContactHandler({
    getApiKey: () => "test-key",
    sendEmail: async () => {
      throw Object.assign(new Error("Private network detail"), { statusCode: 504 });
    },
    logger: { error: (...details) => diagnostics.push(details) },
  });

  const response = await handler(request(validInput));
  const body = await response.json();

  assert.equal(response.status, 502);
  assert.doesNotMatch(JSON.stringify(body), /Private network detail|test-key/);
  assert.deepEqual(diagnostics[0], [
    "Contact email provider request failed.",
    { errorName: "Error", statusCode: 504 },
  ]);
});

test("contact form guards duplicate pending submissions and preserves failed input", async () => {
  const source = await readFile(
    new URL("../app/components/ContactForm.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /if \(submissionPendingRef\.current\) return/);
  assert.match(source, /disabled=\{submitting\}/);
  assert.match(source, /const generatedId = useId\(\)/);
  assert.match(source, /id=\{messageId\}/);
  assert.doesNotMatch(source, /<textarea[\s\S]*?onKeyDown/);
  assert.match(source, /form\.reset\(\)[\s\S]*status: "success"/);
  assert.equal(source.match(/form\.reset\(\)/g)?.length, 1);
});
