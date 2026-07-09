export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiEndpoint {
  id: string;
  title: string;
  method: HttpMethod;
  href: string;
  path: string;
  description: string;
  longDescription?: string;
  headers?: { key: string; value: string; required: boolean }[];
  requestBody?: { field: string; type: string; required: boolean; description: string }[];
  responseBody?: { field: string; type: string; description: string }[];
  exampleRequest?: string;
  exampleResponse?: string;
}

export interface ApiGroup {
  id: string;
  title: string;
  endpoints: ApiEndpoint[];
}

export const apiGroups: ApiGroup[] = [
  {
    id: "auth",
    title: "Auth",
    endpoints: [
      {
        id: "register-user",
        title: "Register a user",
        method: "POST",
        href: "/api/register-user",
        path: "/api/auth/register",
        description: "Create a new email/password account and start a session.",
        longDescription: "Creates a brand-new email-backed user, hashes the password with bcrypt, mints a session token, sets it as an httpOnly cookie, and returns the new user alongside the raw token for clients that prefer bearer auth.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "email", type: "string", required: true, description: "User's email address." },
          { field: "password", type: "string", required: true, description: "Minimum 8 characters." },
          { field: "name", type: "string", required: false, description: "Display name. Defaults to the email's local part." },
          { field: "username", type: "string", required: false, description: "Login handle, 3-64 characters." },
        ],
        responseBody: [
          { field: "user", type: "object", description: "user_id, username, email, name, picture." },
          { field: "session_token", type: "string", description: "Opaque session token (also set as an httpOnly cookie)." },
          { field: "expires_at", type: "string", description: "ISO 8601 session expiry, 7 days from creation." },
        ],
        exampleRequest: `{
  "email": "ada@emtsun.dev",
  "password": "correcthorsebattery",
  "name": "Ada Lovelace",
  "username": "ada"
}`,
        exampleResponse: `{
  "user": {
    "user_id": "user_8f21ac0b19de",
    "username": "ada",
    "email": "ada@emtsun.dev",
    "name": "Ada Lovelace",
    "picture": null
  },
  "session_token": "9c3f...redacted",
  "expires_at": "2026-07-16T18:03:22.000Z"
}`,
      },
      {
        id: "login",
        title: "Login",
        method: "POST",
        href: "/api/login",
        path: "/api/auth/login",
        description: "Sign in with a username or email plus password.",
        longDescription: "Accepts either username or email alongside a password, verifies the bcrypt hash, and drops a fresh 7-day session cookie. Used by both the Studio login screen and the demo-user quick login.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "username", type: "string", required: false, description: "Login handle. Provide this or email." },
          { field: "email", type: "string", required: false, description: "Account email. Provide this or username." },
          { field: "password", type: "string", required: true, description: "Account password." },
        ],
        responseBody: [
          { field: "user", type: "object", description: "user_id, username, email, name, picture, role." },
          { field: "session_token", type: "string", description: "Opaque session token." },
          { field: "expires_at", type: "string", description: "ISO 8601 session expiry." },
        ],
        exampleRequest: `{
  "username": "johndoe",
  "password": "password123"
}`,
        exampleResponse: `{
  "user": {
    "user_id": "user_johndoe",
    "username": "johndoe",
    "email": "john.doe@dbsherpa.local",
    "name": "John Doe",
    "picture": null,
    "role": "admin"
  },
  "session_token": "9c3f...redacted",
  "expires_at": "2026-07-16T18:03:22.000Z"
}`,
      },
      {
        id: "get-current-user",
        title: "Get current user",
        method: "GET",
        href: "/api/get-current-user",
        path: "/api/auth/me",
        description: "Return the authenticated user for the current session.",
        longDescription: "Resolves the session from the session_token cookie first, falling back to an Authorization: Bearer header. Returns 401 if the session is missing, invalid, or expired.",
        headers: [
          { key: "Authorization", value: "Bearer {session_token}", required: false },
        ],
        responseBody: [
          { field: "user_id", type: "string", description: "Stable internal user id." },
          { field: "username", type: "string", description: "Login handle." },
          { field: "email", type: "string", description: "Account email." },
          { field: "name", type: "string", description: "Display name." },
          { field: "picture", type: "string", description: "Avatar URL, or null." },
          { field: "role", type: "string", description: "\"user\" or \"admin\"." },
        ],
        exampleResponse: `{
  "user_id": "user_johndoe",
  "username": "johndoe",
  "email": "john.doe@dbsherpa.local",
  "name": "John Doe",
  "picture": null,
  "role": "admin"
}`,
      },
      {
        id: "logout",
        title: "Logout",
        method: "POST",
        href: "/api/logout",
        path: "/api/auth/logout",
        description: "Delete the current session and clear the session cookie.",
        longDescription: "Removes the session_token row from the database and clears the cookie on the response. Safe to call even if the client is already logged out.",
        responseBody: [
          { field: "ok", type: "boolean", description: "Always true." },
        ],
        exampleResponse: `{
  "ok": true
}`,
      },
    ],
  },
  {
    id: "workflows",
    title: "Workflows",
    endpoints: [
      {
        id: "list-workflows",
        title: "List saved workflows",
        method: "GET",
        href: "/api/list-workflows",
        path: "/api/workflows",
        description: "List every workflow saved to the current user's library.",
        longDescription: "Returns one summary row per saved workflow, sorted by most recently modified. Use GET /api/workflows/{filename} to fetch the full DAG for a specific entry.",
        responseBody: [
          { field: "workflows", type: "array", description: "filename, workflow_id, name, description, node_count, modified_ms, upvote_count, downvote_count." },
        ],
        exampleResponse: `{
  "workflows": [
    {
      "filename": "leads_pipeline.json",
      "workflow_id": "wf_leads_pipeline",
      "name": "Lead scoring pipeline",
      "description": "Score inbound leads and post hot leads to Slack.",
      "node_count": 8,
      "modified_ms": 1752099600000,
      "upvote_count": 3,
      "downvote_count": 0
    }
  ]
}`,
      },
      {
        id: "get-workflow",
        title: "Get a workflow",
        method: "GET",
        href: "/api/get-workflow",
        path: "/api/workflows/{filename}",
        description: "Fetch the full DAG JSON for one saved workflow.",
        longDescription: "Returns the workflow document exactly as it was saved — name, nodes, and edges — scoped to the requesting user. Returns 404 if the filename doesn't exist in that user's library.",
        responseBody: [
          { field: "name", type: "string", description: "Display name of the workflow." },
          { field: "nodes", type: "array", description: "Node objects: id, type, label, config." },
          { field: "edges", type: "array", description: "Edge objects using from/to keys." },
        ],
        exampleResponse: `{
  "name": "Lead scoring pipeline",
  "nodes": [
    { "id": "n01", "type": "csv_extract", "label": "Load Leads", "config": { "source": "leads.csv" } },
    { "id": "n02", "type": "filter", "label": "Hot Leads", "config": { "expression": "row.score >= 80" } },
    { "id": "n03", "type": "slack", "label": "Notify", "config": { "channel": "#leads" } }
  ],
  "edges": [
    { "from": "n01", "to": "n02" },
    { "from": "n02", "to": "n03" }
  ]
}`,
      },
      {
        id: "save-workflow",
        title: "Save a workflow",
        method: "POST",
        href: "/api/save-workflow",
        path: "/api/workflows/{filename}",
        description: "Save or overwrite a workflow in the user's library.",
        longDescription: "The request body is the raw workflow DAG (not wrapped in an envelope). If another saved workflow already shares the same display name, this returns 409 unless the replace=true query parameter is set, in which case the conflicting entries are deleted first.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "name", type: "string", required: false, description: "Display name shown in the workflow drawer." },
          { field: "nodes", type: "array", required: true, description: "Node objects: id, type, label, config." },
          { field: "edges", type: "array", required: true, description: "Edge objects using from/to keys." },
        ],
        responseBody: [
          { field: "saved", type: "string", description: "The filename that was written." },
          { field: "location", type: "string", description: "Always \"workflows\" for this endpoint." },
        ],
        exampleRequest: `{
  "name": "Lead scoring pipeline",
  "nodes": [
    { "id": "n01", "type": "csv_extract", "label": "Load Leads", "config": { "source": "leads.csv" } },
    { "id": "n02", "type": "filter", "label": "Hot Leads", "config": { "expression": "row.score >= 80" } }
  ],
  "edges": [{ "from": "n01", "to": "n02" }]
}`,
        exampleResponse: `{
  "saved": "leads_pipeline.json",
  "location": "workflows"
}`,
      },
      {
        id: "delete-workflow",
        title: "Delete a workflow",
        method: "DELETE",
        href: "/api/delete-workflow",
        path: "/api/workflows/{filename}",
        description: "Permanently remove a saved workflow.",
        longDescription: "Deletes the row from the workflows table for the requesting user. Returns 404 if the filename isn't in that user's library. Does not touch the shared good_examples/ demo set.",
        responseBody: [
          { field: "deleted", type: "string", description: "The filename that was removed." },
          { field: "location", type: "string", description: "Always \"workflows\" for this endpoint." },
        ],
        exampleResponse: `{
  "deleted": "leads_pipeline.json",
  "location": "workflows"
}`,
      },
    ],
  },
  {
    id: "runs",
    title: "Runs",
    endpoints: [
      {
        id: "run-workflow",
        title: "Run a workflow",
        method: "POST",
        href: "/api/run-workflow",
        path: "/api/run",
        description: "Execute a workflow DAG synchronously and return the run summary.",
        longDescription: "Runs the deterministic validator first — an invalid DAG short-circuits with HTTP 422 and the same payload shape /validate returns. On success, every node executes in topological order and the response carries the aggregated run result plus a download link for any generated report.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "dag", type: "object", required: true, description: "Workflow DAG JSON with nodes and edges." },
          { field: "alert_payload", type: "object", required: true, description: "Opaque event payload bound into RunContext values for downstream nodes." },
        ],
        responseBody: [
          { field: "run_id", type: "string", description: "Unique id for this execution." },
          { field: "disposition", type: "string", description: "Workflow-level outcome, e.g. COMPLETED." },
          { field: "flag_count", type: "number", description: "Count of flagged rows, when applicable." },
          { field: "report_path", type: "string", description: "Server-side path of a generated report file, if any." },
          { field: "download_url", type: "string", description: "Browser-downloadable URL for the generated report." },
          { field: "warnings", type: "array", description: "Non-fatal validation warnings, if any." },
        ],
        exampleRequest: `{
  "dag": {
    "name": "Lead scoring pipeline",
    "nodes": [
      { "id": "n01", "type": "csv_extract", "config": { "source": "leads.csv" } },
      { "id": "n02", "type": "filter", "config": { "expression": "row.score >= 80" } }
    ],
    "edges": [{ "from": "n01", "to": "n02" }]
  },
  "alert_payload": {}
}`,
        exampleResponse: `{
  "run_id": "r_1752099600123",
  "disposition": "COMPLETED",
  "flag_count": 0,
  "report_path": null,
  "download_url": null
}`,
      },
      {
        id: "run-workflow-stream",
        title: "Run a workflow (stream)",
        method: "POST",
        href: "/api/run-workflow-stream",
        path: "/api/run/stream",
        description: "Execute a workflow and stream per-node events as Server-Sent Events.",
        longDescription: "Same request shape and validation behavior as POST /run, but the response is text/event-stream. Each node emits node_start, then node_complete or node_error; the stream ends with workflow_complete. If the DAG fails validation, a single workflow_error frame is emitted instead of an HTTP error, so the frontend's SSE parser handles both success and failure uniformly.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "dag", type: "object", required: true, description: "Workflow DAG JSON with nodes and edges." },
          { field: "alert_payload", type: "object", required: true, description: "Opaque event payload for the run." },
        ],
        responseBody: [
          { field: "type", type: "string", description: "node_start | node_complete | node_error | workflow_complete | workflow_error." },
          { field: "node_id", type: "string", description: "The node this event refers to (node_* events only)." },
          { field: "result", type: "object", description: "Aggregated run result (workflow_complete only)." },
        ],
        exampleRequest: `{
  "dag": { "name": "Lead scoring pipeline", "nodes": [], "edges": [] },
  "alert_payload": {}
}`,
        exampleResponse: `data: {"type":"node_start","node_id":"n01","node_type":"csv_extract"}

data: {"type":"node_complete","node_id":"n01","duration_ms":42}

data: {"type":"workflow_complete","result":{"run_id":"r_1752099600123","disposition":"COMPLETED"}}`,
      },
      {
        id: "run-demo",
        title: "Run the bundled demo",
        method: "POST",
        href: "/api/run-demo",
        path: "/api/run/demo",
        description: "One-click demo run against the bundled CSV fixtures.",
        longDescription: "The fastest way to smoke-test a deployment: no workflow authoring, no alert payload, no external data source required. By default the response is the generated .xlsx report as a browser download; pass return_json=true to get the JSON run summary with a download_url instead.",
        headers: [
          { key: "Content-Type", value: "application/json", required: false },
        ],
        requestBody: [
          { field: "workflow_filename", type: "string", required: false, description: "Workflow file under backend/workflows/ to execute. Defaults to the bundled demo workflow." },
          { field: "alert_payload", type: "object", required: false, description: "Override the canned demo alert payload." },
          { field: "return_json", type: "boolean", required: false, description: "Return JSON with a download_url instead of streaming the file. Default false." },
        ],
        responseBody: [
          { field: "run_id", type: "string", description: "Unique id for this execution." },
          { field: "disposition", type: "string", description: "Workflow-level outcome." },
          { field: "flag_count", type: "number", description: "Count of flagged rows." },
          { field: "report_path", type: "string", description: "Server-side path to the generated report." },
          { field: "download_url", type: "string", description: "GET /report/{filename} link for the generated file." },
          { field: "datasets", type: "array", description: "Names of datasets produced during the run." },
        ],
        exampleRequest: `{
  "return_json": true
}`,
        exampleResponse: `{
  "run_id": "r_1752099600123",
  "disposition": "COMPLETED",
  "flag_count": 2,
  "output_branch": "flagged",
  "report_path": "/tmp/dbsherpa/output/fx_fro_v2_report.xlsx",
  "download_url": "/report/fx_fro_v2_report.xlsx",
  "datasets": ["trades", "alerts"]
}`,
      },
    ],
  },
  {
    id: "validate",
    title: "Validate",
    endpoints: [
      {
        id: "validate-workflow",
        title: "Validate a workflow",
        method: "POST",
        href: "/api/validate-workflow",
        path: "/api/validate",
        description: "Run structural, contract, wiring, and hard-rule checks without executing any node.",
        longDescription: "Always returns HTTP 200, even when the workflow is invalid — the caller decides whether valid=false should block a run. This makes the endpoint safe for Sherpa's generation harness to call repeatedly during its self-correction loop.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "dag", type: "object", required: true, description: "Workflow DAG JSON to validate." },
        ],
        responseBody: [
          { field: "valid", type: "boolean", description: "True when the DAG has no blocking errors." },
          { field: "errors", type: "array", description: "Blocking issues: node_id, message, code." },
          { field: "warnings", type: "array", description: "Non-blocking issues surfaced in the UI." },
        ],
        exampleRequest: `{
  "dag": {
    "name": "Lead scoring pipeline",
    "nodes": [{ "id": "n01", "type": "csv_extract", "config": { "source": "leads.csv" } }],
    "edges": []
  }
}`,
        exampleResponse: `{
  "valid": true,
  "errors": [],
  "warnings": []
}`,
      },
    ],
  },
  {
    id: "copilot",
    title: "Copilot / Sherpa",
    endpoints: [
      {
        id: "copilot-route",
        title: "Route a message",
        method: "POST",
        href: "/api/copilot-route",
        path: "/api/copilot/route",
        description: "Classify a Sherpa chat message into an intent and decide whether to ask a clarifying question.",
        longDescription: "Runs slash-command parsing, the LLM router, deterministic follow-up overrides, the build-plan gate, and the clarification check in a single call. The frontend calls this before dispatching to any streaming handler (chat, generate, load, automate, or explain-run).",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "message", type: "string", required: true, description: "User message to classify." },
          { field: "has_workflow", type: "boolean", required: false, description: "True when a workflow is loaded on the canvas." },
          { field: "has_run_log", type: "boolean", required: false, description: "True when a completed run is in the output panel." },
          { field: "workflow_name", type: "string", required: false, description: "Display name of the canvas workflow." },
          { field: "run_id", type: "string", required: false, description: "Run id available for explain/analysis." },
        ],
        responseBody: [
          { field: "intent", type: "string", description: "build | ask | automate | load | explain_run | explain_error | query_run_data." },
          { field: "reason", type: "string", description: "Short explanation of the routing decision." },
          { field: "source", type: "string", description: "\"llm\" or \"heuristic\"." },
          { field: "enhanced_question", type: "string", description: "Normalized question passed to downstream handlers." },
          { field: "metadata", type: "object", description: "Route metadata: edit_existing_workflow, wants_sample_run, propose_build_plan, and more." },
          { field: "clarification", type: "object", description: "Present with needed:true when the UI must collect an answer first." },
          { field: "disposition", type: "object", description: "kind (plan | answer | clarify), thinking, confidence." },
        ],
        exampleRequest: `{
  "message": "Monitor orders.csv for spend spikes and post to Slack",
  "has_workflow": false,
  "has_run_log": false
}`,
        exampleResponse: `{
  "intent": "build",
  "reason": "New workflow request with a data source and an action.",
  "source": "llm",
  "enhanced_question": "Monitor orders.csv for spend spikes and post to Slack",
  "metadata": { "propose_build_plan": true, "edit_existing_workflow": false },
  "clarification": null,
  "disposition": { "kind": "plan", "thinking": "Drafting a build plan before touching the canvas.", "confidence": 0.86 }
}`,
      },
      {
        id: "copilot-chat",
        title: "Chat with Sherpa",
        method: "POST",
        href: "/api/copilot-chat",
        path: "/api/copilot/chat",
        description: "Blocking, ask-mode chat with the Sherpa copilot.",
        longDescription: "Multi-turn history is scoped by session_id; requests without a session_id are deliberately stateless. Used for platform Q&A, plan-only responses, and run-review follow-ups that don't touch the canvas.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "message", type: "string", required: true, description: "Free-form user message." },
          { field: "reset_history", type: "boolean", required: false, description: "Clear this session's server-side history first. Default false." },
          { field: "session_id", type: "string", required: false, description: "Session id for multi-turn continuity." },
          { field: "current_workflow", type: "object", required: false, description: "Canvas workflow for contextual Q&A about the loaded DAG." },
        ],
        responseBody: [
          { field: "reply", type: "string", description: "Sherpa's response text." },
        ],
        exampleRequest: `{
  "message": "Which nodes can post to Confluence?",
  "session_id": "sess_7a21"
}`,
        exampleResponse: `{
  "reply": "Use the Confluence MCP node with the confluence_publish_report tool — it's demo-safe out of the box and switches to a live publish once ATLASSIAN_* credentials are set."
}`,
      },
      {
        id: "copilot-generate-stream",
        title: "Generate a workflow (stream)",
        method: "POST",
        href: "/api/copilot-generate-stream",
        path: "/api/copilot/generate/stream",
        description: "Build or edit a workflow with the Sherpa generation harness, streamed over SSE.",
        longDescription: "Invokes the AgentRunner control loop: intent classification, retrieval of similar few-shot examples, Gemini planning, canonicalization, validation, deterministic auto-fixing, and an LLM repair loop, finishing with a runtime smoke test. Pass current_workflow to edit an existing canvas DAG in place instead of generating a new one.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "prompt", type: "string", required: true, description: "Scenario or edit instruction for the harness." },
          { field: "critic_iterations", type: "number", required: false, description: "Max LLM repair attempts after validation failures. Default 2." },
          { field: "current_workflow", type: "object", required: false, description: "Canvas DAG to edit in place, when editing rather than building new." },
          { field: "session_id", type: "string", required: false, description: "Session id for thread continuity." },
        ],
        responseBody: [
          { field: "type", type: "string", description: "agent_stage | thinking | text_chunk | workflow_created | agent_final_summary | error | done." },
          { field: "workflow", type: "object", description: "The generated or edited DAG (workflow_created only)." },
          { field: "summary", type: "string", description: "Bullet summary of what was built (agent_final_summary only)." },
        ],
        exampleRequest: `{
  "prompt": "Load leads.csv, keep rows with score over 80, and post a summary to Slack",
  "critic_iterations": 2
}`,
        exampleResponse: `data: {"type":"agent_stage","stage":"planning"}

data: {"type":"workflow_created","workflow":{"name":"Hot leads to Slack","nodes":[],"edges":[]}}

data: {"type":"agent_final_summary","summary":"Built a 3-node workflow: CSV Extract, Filter, Slack."}`,
      },
      {
        id: "copilot-clarify-resolve",
        title: "Resolve a clarification",
        method: "POST",
        href: "/api/copilot-clarify-resolve",
        path: "/api/copilot/clarify/resolve",
        description: "Apply the user's answer to a Sherpa clarifying question and return the next executable route.",
        longDescription: "Called after the Questions panel collects an answer to a clarification raised by POST /copilot/route. The response is a route object with clarification skipped, ready to be dispatched by the same handler-selection logic as a normal /route response.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "message", type: "string", required: true, description: "Original user message that triggered routing." },
          { field: "selection_id", type: "string", required: false, description: "Legacy single-select id: yes, no, other, a, b, …" },
          { field: "other_text", type: "string", required: false, description: "Free text when selection_id is \"other\"." },
          { field: "clarification_kind", type: "string", required: false, description: "\"confirm\" or \"choice\" from the prior clarification. Default \"confirm\"." },
          { field: "clarification_question", type: "string", required: false, description: "The question text shown in the Questions panel." },
        ],
        responseBody: [
          { field: "intent", type: "string", description: "Resolved intent, ready for dispatch." },
          { field: "metadata", type: "object", description: "Route metadata with clarification_resolved: true." },
          { field: "clarification", type: "object", description: "Null once resolved." },
        ],
        exampleRequest: `{
  "message": "Load the orders workflow",
  "selection_id": "yes",
  "clarification_kind": "confirm",
  "clarification_question": "Load \\"Orders anomaly monitor\\" onto the canvas?"
}`,
        exampleResponse: `{
  "intent": "load",
  "metadata": { "workflow_name": "Orders anomaly monitor", "clarification_resolved": true },
  "clarification": null
}`,
      },
    ],
  },
  {
    id: "automations",
    title: "Automations",
    endpoints: [
      {
        id: "list-automations",
        title: "List automations",
        method: "GET",
        href: "/api/list-automations",
        path: "/api/automations",
        description: "List every scheduled automation for the current user.",
        responseBody: [
          { field: "automations", type: "array", description: "id, name, workflow_filename, schedule_type, cron_expression, active." },
        ],
        exampleResponse: `{
  "automations": [
    {
      "id": "auto_5e9c1a2b3d4f",
      "name": "Nightly sync",
      "workflow_filename": "daily_sync.json",
      "schedule_type": "cron",
      "cron_expression": "0 2 * * *",
      "active": true
    }
  ]
}`,
      },
      {
        id: "create-automation",
        title: "Create an automation",
        method: "POST",
        href: "/api/create-automation",
        path: "/api/automations",
        description: "Schedule a saved workflow to run on a cron or interval schedule.",
        longDescription: "The scheduler (backend/app/scheduler.py) polls every 10 seconds for due automations. Cron automations fire once per matching minute; interval automations fire on an elapsed-time check within duration_mins of created_at.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "name", type: "string", required: true, description: "Automation name." },
          { field: "workflow_filename", type: "string", required: true, description: "Saved workflow file to run." },
          { field: "schedule_type", type: "string", required: false, description: "\"cron\" or \"interval\". Default \"cron\"." },
          { field: "cron_expression", type: "string", required: false, description: "5-field cron string. Default \"0 11 * * *\"." },
          { field: "interval_mins", type: "number", required: false, description: "Interval in minutes, when schedule_type is \"interval\". Default 2." },
          { field: "duration_mins", type: "number", required: false, description: "Active duration window in minutes, for interval schedules. Default 30." },
          { field: "active", type: "boolean", required: false, description: "Whether the scheduler should pick this up. Default true." },
        ],
        responseBody: [
          { field: "ok", type: "boolean", description: "True on success." },
          { field: "id", type: "string", description: "Newly created automation id." },
        ],
        exampleRequest: `{
  "name": "Nightly sync",
  "workflow_filename": "daily_sync.json",
  "schedule_type": "cron",
  "cron_expression": "0 2 * * *"
}`,
        exampleResponse: `{
  "ok": true,
  "id": "auto_5e9c1a2b3d4f"
}`,
      },
      {
        id: "trigger-automation",
        title: "Trigger an automation manually",
        method: "POST",
        href: "/api/trigger-automation",
        path: "/api/automations/{automation_id}/run",
        description: "Run an automation immediately, outside its schedule.",
        longDescription: "Queues the workflow execution as a FastAPI background task and returns right away — the run itself is recorded asynchronously in run_logs and automation_runs.",
        responseBody: [
          { field: "ok", type: "boolean", description: "True once the background task is queued." },
          { field: "message", type: "string", description: "Confirmation message." },
        ],
        exampleResponse: `{
  "ok": true,
  "message": "Manual trigger started in the background."
}`,
      },
      {
        id: "automation-run-history",
        title: "Get automation run history",
        method: "GET",
        href: "/api/automation-run-history",
        path: "/api/automations/{automation_id}/runs",
        description: "List past executions of one automation.",
        headers: [],
        responseBody: [
          { field: "runs", type: "array", description: "run_id, started_at, status, download_url, per execution." },
        ],
        exampleResponse: `{
  "runs": [
    { "run_id": "r_1752013200000", "started_at": "2026-07-08T02:00:00Z", "status": "success", "download_url": "/report/daily_sync_20260708.csv" }
  ]
}`,
      },
    ],
  },
  {
    id: "library",
    title: "Library",
    endpoints: [
      {
        id: "list-skills",
        title: "List skills",
        method: "GET",
        href: "/api/list-skills",
        path: "/api/skills",
        description: "List domain skill documents that inform Sherpa's prompts.",
        longDescription: "Reads and lightly parses every markdown file under backend/skills/ that the current user has been granted access to, extracting a title, short overview, and referenced data sources for display in the Skills drawer.",
        responseBody: [
          { field: "skills", type: "array", description: "id, title, overview, regulatory, sections, sources, raw_path, bytes." },
        ],
        exampleResponse: `{
  "skills": [
    {
      "id": "skills-lead-scoring",
      "title": "Lead Scoring",
      "overview": "Rank inbound leads by fit and intent signals.",
      "regulatory": [],
      "sections": ["Overview", "Data Extraction"],
      "sources": ["oracle"],
      "raw_path": "skills/skills-lead-scoring.md",
      "bytes": 4820
    }
  ]
}`,
      },
      {
        id: "list-data-sources",
        title: "List data sources",
        method: "GET",
        href: "/api/list-data-sources",
        path: "/api/data-sources",
        description: "List every registered dataset's schema.",
        longDescription: "Reads every YAML in backend/connectors/metadata/ that the user has access to and returns its columns, source paths, and backing connector — the same schema payload the generation harness embeds into Sherpa's prompt context.",
        responseBody: [
          { field: "data_sources", type: "array", description: "id, description, sources, backends, column_count, columns." },
        ],
        exampleResponse: `{
  "data_sources": [
    {
      "id": "orders.csv",
      "description": "Order records with quantities, dates, and regions.",
      "sources": ["oracle:DEMO.ORDERS"],
      "backends": ["oracle"],
      "backend_labels": ["Oracle"],
      "column_count": 6,
      "columns": [{ "name": "order_id", "type": "string" }]
    }
  ]
}`,
      },
      {
        id: "list-run-logs",
        title: "List run logs",
        method: "GET",
        href: "/api/list-run-logs",
        path: "/api/run-logs",
        description: "List recent workflow run history, newest first.",
        longDescription: "Supports filtering by workflow name, status, disposition, and a since/until time range. Falls back to a local JSONL log file if the database is temporarily unavailable.",
        requestBody: [
          { field: "limit", type: "number", required: false, description: "Max rows to return. Default 200." },
          { field: "workflow", type: "string", required: false, description: "Filter by workflow display name (substring match)." },
          { field: "status", type: "string", required: false, description: "Filter by success | error | warning | running." },
        ],
        responseBody: [
          { field: "logs", type: "array", description: "run_id, workflow, status, started_at, finished_at, disposition." },
          { field: "total", type: "number", description: "Total matching rows." },
        ],
        exampleResponse: `{
  "logs": [
    { "run_id": "r_1752099600123", "workflow": "Lead scoring pipeline", "status": "success", "started_at": "2026-07-09T14:00:00Z", "disposition": "COMPLETED" }
  ],
  "total": 1
}`,
      },
      {
        id: "get-run-log",
        title: "Get a run log",
        method: "GET",
        href: "/api/get-run-log",
        path: "/api/run-logs/{run_id}",
        description: "Fetch the full detail for one workflow run.",
        longDescription: "Returns the per-node event log alongside the aggregated run result, suitable for driving the Output panel's stage cards or for Sherpa's explain-run analysis.",
        responseBody: [
          { field: "run_id", type: "string", description: "Unique execution id." },
          { field: "status", type: "string", description: "success | error | warning | running." },
          { field: "run_log", type: "array", description: "Per-node event frames." },
          { field: "run_result", type: "object", description: "Aggregated workflow result." },
          { field: "artifacts", type: "array", description: "Generated files for this run." },
        ],
        exampleResponse: `{
  "run_id": "r_1752099600123",
  "workflow": "Lead scoring pipeline",
  "status": "success",
  "run_log": [{ "node_id": "n01", "node_type": "csv_extract", "status": "ok", "duration_ms": 42 }],
  "run_result": { "disposition": "COMPLETED", "flag_count": 0 },
  "artifacts": []
}`,
      },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    endpoints: [
      {
        id: "download-report",
        title: "Download a report",
        method: "GET",
        href: "/api/download-report",
        path: "/api/report/{filename}",
        description: "Download a generated CSV or Excel export by filename.",
        longDescription: "Serves a file previously written by a csv_output or excel_output node during a run. Only bare filenames are accepted — path traversal attempts return 400, and a missing file returns 404.",
        responseBody: [
          { field: "(binary)", type: "file", description: "The report file, streamed with a Content-Disposition attachment header." },
        ],
        exampleResponse: `HTTP/1.1 200 OK
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="hot_leads.xlsx"`,
      },
    ],
  },
  {
    id: "workspace",
    title: "Workspace",
    endpoints: [
      {
        id: "clear-workspace",
        title: "Clear workspace data",
        method: "DELETE",
        href: "/api/clear-workspace",
        path: "/api/workspace",
        description: "Wipe all workload data for the current user.",
        longDescription: "Deletes chats, saved workflows, drafts, run history, and automations for the requesting user, plus local log files. User accounts, sessions, and the shared good_examples/ demo set are always preserved.",
        responseBody: [
          { field: "ok", type: "boolean", description: "True on success." },
          { field: "deleted", type: "object", description: "Row counts removed, keyed by table." },
          { field: "preserved", type: "array", description: "Tables intentionally left untouched." },
        ],
        exampleResponse: `{
  "ok": true,
  "deleted": { "workflows": 6, "drafts": 2, "run_logs": 48, "automations": 3 },
  "preserved": ["users", "user_sessions", "good_examples"]
}`,
      },
    ],
  },
  {
    id: "user",
    title: "User",
    endpoints: [
      {
        id: "list-users",
        title: "List users",
        method: "GET",
        href: "/api/list-users",
        path: "/api/user/users",
        description: "List every account on the instance. Admin only.",
        responseBody: [
          { field: "users", type: "array", description: "user_id, username, email, name, role, created_at." },
        ],
        exampleResponse: `{
  "users": [
    { "user_id": "user_johndoe", "username": "johndoe", "email": "john.doe@dbsherpa.local", "role": "admin" }
  ]
}`,
      },
      {
        id: "update-user-role",
        title: "Update a user's role",
        method: "PUT",
        href: "/api/update-user-role",
        path: "/api/user/users/{user_id}/role",
        description: "Promote or demote a user between \"user\" and \"admin\". Admin only.",
        longDescription: "Refuses to demote the last remaining admin account, to guarantee at least one admin can always manage the instance.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "role", type: "string", required: true, description: "\"admin\" or \"user\"." },
        ],
        responseBody: [
          { field: "user", type: "object", description: "The updated user record." },
        ],
        exampleRequest: `{
  "role": "admin"
}`,
        exampleResponse: `{
  "user": { "user_id": "user_8f21ac0b19de", "username": "ada", "role": "admin" }
}`,
      },
      {
        id: "get-data-source-access",
        title: "Get data source access",
        method: "GET",
        href: "/api/get-data-source-access",
        path: "/api/user/data-source-access",
        description: "List which datasets the current user can see.",
        responseBody: [
          { field: "sources", type: "array", description: "source_id, has_access, per registered dataset." },
        ],
        exampleResponse: `{
  "sources": [
    { "source_id": "orders.csv", "has_access": true },
    { "source_id": "hs_alerts", "has_access": false }
  ]
}`,
      },
      {
        id: "update-data-source-access",
        title: "Update data source access",
        method: "PUT",
        href: "/api/update-data-source-access",
        path: "/api/user/data-source-access/{source_id}",
        description: "Grant or revoke a user's access to one dataset.",
        headers: [
          { key: "Content-Type", value: "application/json", required: true },
        ],
        requestBody: [
          { field: "has_access", type: "boolean", required: true, description: "True to grant, false to revoke." },
        ],
        responseBody: [
          { field: "source_id", type: "string", description: "The dataset id that was updated." },
          { field: "has_access", type: "boolean", description: "The new access value." },
        ],
        exampleRequest: `{
  "has_access": true
}`,
        exampleResponse: `{
  "source_id": "hs_alerts",
  "has_access": true
}`,
      },
    ],
  },
  {
    id: "code-graph",
    title: "Code Graph",
    endpoints: [
      {
        id: "get-code-graph",
        title: "Get the code graph",
        method: "GET",
        href: "/api/get-code-graph",
        path: "/api/code-graph",
        description: "Return a structural graph of the codebase for the Understand-Anything viewer.",
        longDescription: "Backs the in-app codebase map: files, functions, classes, components, and API endpoints as nodes, with imports/calls/exposes/contains edges between them.",
        responseBody: [
          { field: "nodes", type: "array", description: "id, name, type, filePath, summary, complexity." },
          { field: "edges", type: "array", description: "source, target, type (imports | calls | exposes | contains)." },
        ],
        exampleResponse: `{
  "nodes": [{ "id": "n_run_router", "name": "run.py", "type": "file", "filePath": "backend/app/routers/run.py" }],
  "edges": [{ "source": "n_run_router", "target": "n_dag_runner", "type": "calls" }]
}`,
      },
      {
        id: "get-understand-anything-bundle",
        title: "Get the Understand-Anything bundle",
        method: "GET",
        href: "/api/get-understand-anything-bundle",
        path: "/api/code-graph/understand-anything",
        description: "Return the full structural graph, domain flowchart, and guided tour artifacts.",
        longDescription: "A superset of GET /api/code-graph that additionally includes a domain-level flow graph and a guided tour, used by the interactive Understand-Anything dashboard embedded in Studio.",
        responseBody: [
          { field: "available", type: "boolean", description: "False if artifacts haven't been generated yet." },
          { field: "knowledgeGraph", type: "object", description: "nodes / edges, same shape as GET /code-graph." },
          { field: "domainGraph", type: "object", description: "Higher-level domain and flow nodes." },
          { field: "artifactDir", type: "string", description: "Where the generated artifacts are stored on disk." },
        ],
        exampleResponse: `{
  "available": true,
  "knowledgeGraph": { "nodes": [], "edges": [] },
  "domainGraph": { "nodes": [], "edges": [] },
  "artifactDir": ".understand/artifacts"
}`,
      },
    ],
  },
  {
    id: "docs",
    title: "Docs",
    endpoints: [
      {
        id: "get-docs",
        title: "Get documentation guides",
        method: "GET",
        href: "/api/get-docs",
        path: "/api/docs",
        description: "Return every markdown guide from the docs/ folder, ready to render in the Studio Docs page.",
        longDescription: "Reads each configured guide file, strips the leading H1 title and any leading blockquote description (since the UI renders its own header), and returns the remaining markdown body alongside a short overview description.",
        responseBody: [
          { field: "sections", type: "array", description: "id, title, icon, items — each item has id, title, content, description." },
        ],
        exampleResponse: `{
  "sections": [
    {
      "id": "guides",
      "title": "Guides & Reference",
      "icon": "book-open",
      "items": [
        { "id": "architecture", "title": "Architecture", "content": "## Backend restructure...", "description": "Frontend ↔ FastAPI ↔ DAG runner ↔ generation harness ↔ MCP." }
      ]
    }
  ]
}`,
      },
    ],
  },
];

export function getEndpointBySlug(slug: string): ApiEndpoint | undefined {
  for (const group of apiGroups) {
    const endpoint = group.endpoints.find((e) => e.id === slug);
    if (endpoint) return endpoint;
  }
  return undefined;
}

export function getGroupForEndpoint(endpointId: string): ApiGroup | undefined {
  return apiGroups.find((group) =>
    group.endpoints.some((e) => e.id === endpointId)
  );
}

export function generateApiTableOfContents(endpointId: string) {
  const endpoint = getEndpointBySlug(endpointId);
  if (!endpoint) return [];

  const items: { id: string; title: string; level: "h2" | "h3" }[] = [
    { id: "endpoint", title: "Endpoint", level: "h2" },
  ];

  if (endpoint.headers && endpoint.headers.length > 0) {
    items.push({ id: "headers", title: "Headers", level: "h2" });
  }

  if (endpoint.requestBody && endpoint.requestBody.length > 0) {
    items.push({ id: "request-body", title: "Request Body", level: "h2" });
  }

  items.push({ id: "response", title: "Response", level: "h2" });

  if (endpoint.exampleRequest || endpoint.exampleResponse) {
    items.push({ id: "example-usage", title: "Example Usage", level: "h2" });
  }

  return items;
}
