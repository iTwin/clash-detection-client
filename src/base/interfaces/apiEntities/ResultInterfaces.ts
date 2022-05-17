/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**  The details for a clash between two elements */
export interface ClashDetails {
  /** The type of clash detected - possible values: Collision, Clearance, Touching, Not Initialized. */
  clashType: string;
  /** When the clash type is Clearance, the value is returned in meters. Otherwise -1 is returned. */
  clearance: number;
  /** The unique id of element A. */
  elementAId: string;
  /** The display label of element A. */
  elementALabel: string;
  /** The zero-based index used to lookup the element A category in the categoryList. */
  elementACategoryIndex: number;
  /** The zero-based index used to lookup the element A model in the modelList. */
  elementAModelIndex: number;
  /** The unique id of element B. */
  elementBId: string;
  /** The display label of element B. */
  elementBLabel: string;
  /** The zero-based index used to lookup the element B category in the categoryList. */
  elementBCategoryIndex: number;
  /** The zero-based index used to lookup the element B model in the modelList. */
  elementBModelIndex: number;
  /** The clash center point. */
  center: ClashDetectionResultCenter;
  /** The array of zero-based indices used to lookup the suppressing rules. */
  suppressingRuleIndexArray: number[];
}

export interface ClashDetectionResultCenter {
  x: number;
  y: number;
  z: number;
}

export interface ReferenceIdList {
  /** Reference id. */
  id: string;
  /** Reference display name. */
  displayName: string;
}

/** Get Result API response. */
export interface ResponseFromGetResult {
  /* Results of clash detection test run */
  result: ClashDetails[];
  /* List of models referenced in ClashDetails by modelIndex */
  modelList: ReferenceIdList[];
  /* List of categories referenced in ClashDetails by categoryIndex */
  categoryList: ReferenceIdList[];
  /* List of suppression rules referenced in ClashDetails by suppressionRuleIndexArray */
  suppressionRuleList: ReferenceIdList[];
}
