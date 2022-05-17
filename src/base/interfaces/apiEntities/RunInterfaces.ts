/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Link } from "../CommonInterfaces";

/** Links that belong to Run entity returned from Clash Detection API. */
export interface RunDetailLink {
  /** Link to get result associated with this Run. */
  result: Link;
  /** Link to get test associated with this Run. */
  test: Link;
}

/** Minimal representation of a Run. */
export interface MinimalRun {
  /** Run id. */
  id: string;
  /** Run display name. */
  displayName: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: RunDetailLink;
}

/** Full representation of a Run. */
export interface RunDetails {
  /** Run id. */
  id: string;
  /** Run display name. */
  displayName: string;
  /** Run date. */
  executedDateTime: string;
  /** Number of issues found during test run. */
  count: string;
  /** The name of the user that started the run. */
  userName: string;
  /** The status of the clash detection run. One of 'queued', 'started', 'completed', 'failed', 'downloadingIModel', 'storingResults', 'inProgress', 'completedToLimit', 'cancelled'. */
  status: string;
  /** Result id. */
  resultId: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: RunDetailLink;
}

/** Single Run API response. */
export interface ResponseFromGetRun {
  run: RunDetails;
}

/** Minimal Run list API response. */
export interface ResponseFromGetRunListMinimal {
  runs: MinimalRun[];
}

/** Representation Run list API response. */
export interface ResponseFromGetRunList {
  runs: RunDetails[];
}
