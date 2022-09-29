/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AdvancedSettings, AuthorizationParam, CollectionRequestParams, ElementSetCriteria } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in Test list query. */
export interface ParamsToGetTestListUrl extends CollectionRequestParams {
  /** Filters Tests for a specific project. */
  projectId: string;
}

/** Parameters for get Test list operation. */
export interface ParamsToGetTestList extends AuthorizationParam {
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: ParamsToGetTestListUrl;
  /** Flag to get user metadata. */
  userMetadata?: boolean;
}

/** Parameters for get single Test operation. */
export interface ParamsToGetTest extends AuthorizationParam {
  /** Test id. */
  testId: string;
  /** Flag to get user metadata. */
  userMetadata?: boolean;
}

/** Parameters for delete Test operation. */
export type ParamsToDeleteTest = ParamsToGetTest;

/** Parameters for create Test operation. */
export interface ParamsToCreateTest extends AuthorizationParam {
  /** Project id to associate with test. */
  projectId: string;
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Element set A criteria. */
  setA: ElementSetCriteria;
  /** Element set B criteria. */
  setB: ElementSetCriteria;
  /** Suppression touching. */
  suppressTouching: boolean;
  /** Touching tolerance. */
  touchingTolerance: number;
  /** Include sub-models. */
  includeSubModels: boolean;
  /** Array of suppression rule ids to associate with test. */
  suppressionRules: string[];
  /** Advanced settings for test. */
  advancedSettings?: AdvancedSettings;
}

/** Parameters for update Test operation. */
export interface ParamsToUpdateTest extends ParamsToGetTest {
  /** Test display name. */
  displayName: string;
  /** Test description. */
  description: string;
  /** Element set A criteria. */
  setA: ElementSetCriteria;
  /** Element set B criteria. */
  setB: ElementSetCriteria;
  /** Suppression touching. */
  suppressTouching: boolean;
  /** Touching tolerance. */
  touchingTolerance: number;
  /** Include sub-models. */
  includeSubModels: boolean;
  /** Array of suppression rule ids to associate with test. */
  suppressionRules: string[];
  /** Advanced settings for test. */
  advancedSettings?: AdvancedSettings;
}

/** Parameters for Run Test operation. */
export interface ParamsToRunTest extends AuthorizationParam {
  /** Test id. */
  testId: string;
  /** iModel id. */
  iModelId: string;
  /** Named version id. */
  namedVersionId?: string;
  /** Test settings. */
  testSettings?: TestSettings;
}

export interface TestSettings {
  /** Results limit. */
  resultsLimit: string;
}
