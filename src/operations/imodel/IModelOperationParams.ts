/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AuthorizationParam } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in models and categories query. */
export interface ParamsToGetModelsAndCategoriesUrl {
  /** Gets models and categories for a specific project. */
  projectId: string;
}

/** Parameters for get models and categories operation. */
export interface ParamsToGetModelsAndCategories extends AuthorizationParam {
  /** iModel id. */
  iModelId: string;
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: ParamsToGetModelsAndCategoriesUrl;
}

/** Parameters for extract models and categories operation. */
export interface ParamsToExtractModelsAndCategories extends AuthorizationParam {
  /** iModel id. */
  iModelId: string;
  /** Project id. */
  projectId: string;
}

/** Url parameters supported in schema info query. */
export interface ParamsToGetSchemaInfoUrl {
  /** Gets schema info for a specific project. */
  projectId: string;
}

/** Parameters for get schema info operation. */
export interface ParamsToGetSchemaInfo extends AuthorizationParam {
  /** iModel id. */
  iModelId: string;
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: ParamsToGetSchemaInfoUrl;
}

/** Parameters for extract schema info operation. */
export interface ParamsToExtractSchemaInfo extends AuthorizationParam {
  /** iModel id. */
  iModelId: string;
  /** Project id. */
  projectId: string;
}

