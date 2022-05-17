/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AuthorizationParam, CollectionRequestParams } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in Run list query. */
export interface ParamsToGetRunListUrl extends CollectionRequestParams {
  /** Filters Runs for a specific project. */
  projectId: string;
}

/** Parameters for get Run list operation. */
export interface ParamsToGetRunList extends AuthorizationParam {
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: ParamsToGetRunListUrl;
}

/** Parameters for get single Run operation. */
export interface ParamsToGetRun extends AuthorizationParam {
  /** Run id. */
  runId: string;
}

/** Parameters for get single Run operation. */
export type ParamsToDeleteRun = ParamsToGetRun;
