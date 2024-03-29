/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AllUserMetadata, CollectionResponse, Link, SuppressionRuleParameters } from "../CommonInterfaces";

/** Links that belong to Suppression Rule entity returned from Clash Detection API. */
export interface SuppressionRuleDetailLink {
  /** Link to get complete suppression rule details. */
  rule: Link;
}

export interface SuppressionRuleUserInfoLinks {
  /** Link to get user info of creator. */
  createdBy: Link;
  /** Link to get user info of last modifier. */
  lastModifiedBy: Link;
}

export interface SuppressionRuleSelfLink extends SuppressionRuleUserInfoLinks {
  /** Link to get created/updated suppression rule. */
  self: Link;
}

/** Minimal representation of a suppression rule. */
export interface MinimalSuppressionRule {
  /** Suppression rule id. */
  id: string;
  /** Suppression rule display name. */
  displayName: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: SuppressionRuleDetailLink;
}

/** Full representation of a suppression rule. */
export interface SuppressionRuleDetails {
  /** Suppression rule id. */
  id: string;
  /** Suppression rule display name. */
  displayName: string;
  /** Suppression rule description. */
  reason: string;
  /** Suppression rule creation date/time. */
  creationDateTime: string;
  /** Suppression rule modification date/time. */
  modificationDateTime: string;
  /** Suppression rule template id. */
  templateId: string;
  /** Suppression rule parameters. */
  parameters: SuppressionRuleParameters;
  /** User metadata. */
  userMetadata: AllUserMetadata;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: SuppressionRuleUserInfoLinks;
}

/** Get Suppression Rule API response. */
export interface ResponseFromGetSuppressionRule {
  suppressionRule: SuppressionRuleDetails;
}

/** Minimal Suppression Rule list API response. */
export interface ResponseFromGetSuppressionRuleListMinimal extends CollectionResponse {
  suppressionRules: MinimalSuppressionRule[];
}

/** Representation Suppression Rule list API response. */
export interface ResponseFromGetSuppressionRuleList extends CollectionResponse {
  suppressionRules: SuppressionRuleDetails[];
}

/** Create Suppression Rule API Response. */
export interface ResponseFromCreateSuppressionRule {
  suppressionRule: SuppressionRuleCreate;
}

/** Update Suppression Rule API Response. */
export interface ResponseFromUpdateSuppressionRule {
  suppressionRule: SuppressionRuleUpdate;
}

/** Create Suppression Rule Response object. */
export interface SuppressionRuleCreate {
  /** Suppression rule id. */
  id: string;
  /** Suppression rule template id. */
  templateId: string;
  /** Suppression rule display name. */
  displayName: string;
  /** Suppression rule description. */
  reason: string;
  /** Suppression rule parameters. */
  parameters: SuppressionRuleParameters;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: SuppressionRuleSelfLink;
}

/** Update Suppression Rule Response object. */
export interface SuppressionRuleUpdate extends SuppressionRuleCreate {
  /** Suppression rule creation date/time. */
  creationDateTime: string;
  /** Suppression rule modification date/time. */
  modificationDateTime: string;
}
