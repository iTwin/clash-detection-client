/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { CollectionResponse, Link } from "../CommonInterfaces";

/** Links that belong to Test entity returned from Clash Detection API. */
export interface TestDetailLinks {
  /** Link to get user info of creator. */
  createdBy: Link;
  /** Link to get user info of last modifier. */
  lastModifiedBy: Link;
  /** Link to get Test details. */
  test: Link;
}

export interface TestLinks {
  /** Link to get user info of creator. */
  createdBy: Link;
  /** Link to get user info of last modifier. */
  lastModifiedBy: Link;
}

/** Test item. */
export interface TestItem {
  /** Test id. */
  id: string;
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Test creation date. */
  creationDateTime: string;
  /** Test modification date. */
  modificationDateTime: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: TestLinks;
}

/** Test details. */
export interface TestDetails {
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Test creation date. */
  creationDateTime: string;
  /** Test modification date. */
  modificationDateTime: string;
  /** Test rule ids. */
  rules: string[];
  /** Stop execution on failure flag. */
  stopExecutionOnFailure: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: TestLinks;
}

/** Get Test API response. */
export interface ResponseFromGetTest {
  test: TestDetails;
}

/** Test list API response. */
export interface ResponseFromGetTestList extends CollectionResponse {
  tests: TestItem[];
}

export interface TestSelfLink {
  /** Link to get created test. */
  self: Link;
}

/** Test details. */
export interface Test {
  /** Test id. */
  id: string;
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Test rule ids. */
  rules: string[];
  /** Stop execution on failure flag. */
  stopExecutionOnFailure: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: TestSelfLink;
}

/** Create Test API Response. */
export interface ResponseFromCreateTest {
  test: Test;
}

/** Create Test API Response. */
export type ResponseFromUpdateTest = ResponseFromCreateTest;

export interface RunLink {
  /** Link to get Run. */
  run: Link;
}

/** Minimal representation of a Run. */
export interface Run {
  /** Run id. */
  id: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: RunLink;
}

/** Run test API Response. */
export interface ResponseFromRunTest {
  run: Run;
}
