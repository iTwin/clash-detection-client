/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { CollectionResponse, SuppressionRuleParameters } from "../CommonInterfaces";

/** Template item. */
export interface SuppressionRuleTemplate {
  /** Template id. */
  id: string;
  /** Template display name. */
  displayName: string;
  /** Template description. */
  description: string;
  /** Template prompt string. */
  prompt: string;
  /** Template function parameters. */
  templateExpression: SuppressionRuleParameters;
}

/** Suppression Rule Template list API response. */
export interface ResponseFromGetTemplates extends CollectionResponse {
  suppressionRuleTemplates: SuppressionRuleTemplate[];
}

