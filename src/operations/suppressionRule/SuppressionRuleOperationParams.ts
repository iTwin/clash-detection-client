/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AuthorizationParam, CollectionRequestParams, SuppressionRuleParameters } from "../../base/interfaces/CommonInterfaces";

/** Url parameters supported in Suppression Rule list query. */
export interface ParamsToGetSuppressionRuleListUrl extends CollectionRequestParams {
  /** Filters Suppression Rules for a specific project. */
  projectId: string;
}

/** Parameters for get Suppression Rule list operation. */
export interface ParamsToGetSuppressionRuleList extends AuthorizationParam {
  /** Parameters that will be appended to the entity list request url that will narrow down the results. */
  urlParams?: ParamsToGetSuppressionRuleListUrl;
}

/** Parameters for get single Suppression Rule operation. */
export interface ParamsToGetSuppressionRule extends AuthorizationParam {
  /** Suppression Rule id. */
  ruleId: string;
}

/** Parameters for delete single Suppression Rule operation. */
export type ParamsToDeleteSuppressionRule = ParamsToGetSuppressionRule;

/** Parameters for create Suppression Rule operation. */
export interface ParamsToCreateSuppressionRule extends AuthorizationParam {
  /** Suppression rule template id. */
  templateId: string;
  /** Suppression rule display name. */
  displayName: string;
  /** Suppression rule description. */
  reason: string;
  /** Suppression rule function parameters. */
  parameters: SuppressionRuleParameters;
}

/** Parameters for update Suppression Rule operation. */
export interface ParamsToUpdateSuppressionRule extends ParamsToGetSuppressionRule {
  /** Suppression rule display name. */
  displayName: string;
  /** Suppression rule description. */
  reason: string;
}
