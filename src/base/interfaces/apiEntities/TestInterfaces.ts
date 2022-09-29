/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AdvancedSettings, AllUserMetadata, CollectionResponse, ElementSetCriteria, Link } from "../CommonInterfaces";

/** Links that belong to Test entity returned from Clash Detection API. */
export interface TestDetailLinks {
  /** Link to get user info of creator. */
  createdBy: Link;
  /** Link to get user info of last modifier. */
  lastModifiedBy: Link;
}

export interface TestLinks {
  /** Link to get user info of creator. */
  createdBy: Link;
  /** Link to get user info of last modifier. */
  lastModifiedBy: Link;
  /** Link to get Test details. */
  test: Link;
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
  /** User metadata. */
  userMetadata: AllUserMetadata;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: TestLinks;
}

/** Test details. */
export interface TestDetails {
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
  /** Flag to suppress touching. */
  suppressTouching: boolean;
  /** Flag to include sub-models. */
  includeSubModels: boolean;
  /** The touching tolerance to be applied. */
  touchingTolerance: number;
  /** First set of elements to include in clash test. */
  setA: ElementSetCriteria;
  /** Second set of elements to include in clash test. */
  setB: ElementSetCriteria;
  /** The ids of the suppression rules. */
  suppressionRules: string[];
  /** User metadata. */
  userMetadata: AllUserMetadata;
  /** Advanced settings for clash test. */
  advancedSettings: AdvancedSettings;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: TestDetailLinks;
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
  /** Flag to suppress touching. */
  suppressTouching: boolean;
  /** Flag to include sub-models. */
  includeSubModels: boolean;
  /** The touching tolerance to be applied. */
  touchingTolerance: number;
  /** First set of elements to include in clash test. */
  setA: ElementSetCriteria;
  /** Second set of elements to include in clash test. */
  setB: ElementSetCriteria;
  /** The ids of the suppression rules. */
  suppressionRules: string[];
  /** Advanced settings for clash test. */
  advancedSettings: AdvancedSettings;
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
