/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AuthorizationParam, CollectionRequestParams } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in Template list query. */
export interface ParamsToGetTemplateListUrl extends CollectionRequestParams {
  /** Filters Templates for a specific project. */
  projectId: string;
}

/** Parameters for get Template list operation. */
export interface ParamsToGetTemplateList extends AuthorizationParam {
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: ParamsToGetTemplateListUrl;
}
