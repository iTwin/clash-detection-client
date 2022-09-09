/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** Clash Detection API endpoint options. */
export interface ApiOptions {
  /** Clash Detection API base url. Default value is `https://api.bentley.com/clash-detection`. */
  baseUrl?: string;
  /** Clash Detection API version. Default value is `itwin-platform.v1`. */
  version?: string;
}

export type AccessTokenCallback = () => Promise<string>;

/** Authorization data parameter. This interface is extended by all other specific operation parameter interfaces. */
export interface AuthorizationParam {
  /** Authorization token. eg: 'Bearer ey...'*/
  accessToken?: string;
}

/** Common url parameters that are supported for all entity list requests. */
export interface CollectionRequestParams {
  /**
   * Specifies how many entities should be returned in an entity page. The value must not exceed 1000.
   * If not specified 100 entities per page will be returned.
   */
  $top?: number;
}

/** Link to some other entity or entity list that is related to the main entity in the API response. */
export interface Link {
  /** Url to access the related entity. */
  href: string;
}

/**
 * Links that are included in all entity list page responses. They simplify pagination implementation because users
 * can send requests using these urls that already include pagination url parameters without having to
 * manually keep track of queried entity count.
 */
export interface CollectionLinks {
  /** Link to the current page. */
  self: Link;
  /** Link to the next page. If `null` it means that the next page is empty. */
  next: Link | null;
}

/** Common properties of all entity list page responses. */
export interface CollectionResponse {
  /** Common entity list page response links. See {@link CollectionLinks}. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: CollectionLinks;
}

/**
 * Values for return preference used in `Prefer` header. The header value is formed by joining
 * `return=` and the enum value.
 */
export enum PreferReturn {
  /** Instructs the server to return minimal entity representation. */
  Minimal = "minimal",
  /** Instructs the server to return full entity representation. */
  Representation = "representation"
}

export interface AllUserMetadata {
  createdBy: UserMetadata;
  modifiedBy: UserMetadata;
}

export interface UserMetadata {
  email: string;
  name: string;
}

/** Suppression Rule function parameters - vary depending on the selected suppression rule template */
export interface SuppressionRuleParameters {
  /** Property key. */
  propertyKey?: PropertyKey;
  /** Expression operator. */
  operator?: ValueObject;
  /** Relationship path. */
  relationshipPath?: ValueObject;
  /** EC Sql expression. */
  ecSql?: ValueObject;
  /** Like expression #1. */
  likeExpression1?: ValueObject;
  /** Like expression #2. */
  likeExpression2?: ValueObject;
  /** Like expression. */
  likeExpression?: ValueObject;
  /** Property expression #1. */
  propertyExpression1?: PropertyExpression;
  /** Property expression #2. */
  propertyExpression2?: PropertyExpression;
  /** Property expression. */
  propertyExpression?: PropertyExpression;
  /** Class key #1. */
  classKey1?: ClassKey;
  /** Class key #2. */
  classKey2?: ClassKey;
  /** Class key. */
  classKey?: ClassKey;
  /** Property name. */
  propertyName?: string;
  /** Regex pattern. */
  pattern?: string;
  /** Upper bound of property value. */
  upperBound?: string;
  /** Lower bound of property value. */
  lowerBound?: string;
}

/** Value object. */
export interface ValueObject {
  value: string;
}

/** Property key. */
export interface PropertyExpression {
  /** Relationship path. */
  relationshipPath: string;
  /** Property name. */
  propertyName: string;
  /** Expression operator. */
  operator: string;
  /** Property value. */
  propertyValue: string;
}

/** Class key. */
export interface ClassKey {
  /** Schema name. */
  schemaName: string;
  /** Class  name. */
  className: string;
}

/** Property key. */
export interface PropertyKey {
  /** Relationship path. */
  relationshipPath: string;
  /** Property name. */
  propertyName: string;
}

/** Element set criteria. */
export interface ElementSetCriteria {
  modelIds: string[];
  categoryIds: string[];
  query?: string;
  queryName?: string;
  selfCheck: boolean;
  clearance: number;
}

export interface AdvancedSettings {
  /** Flag to enable long clash job processing (no processing time limit enforced - just result limit). */
  longClash: boolean;
  /** Flag to calculate and report clash overlaps (minimum orthogonal overlap distance). */
  calculateOverlap: boolean;
  /** Flag to enable tolerance overlap validation. If 'suppressTouching' and 'calculateOverlap' are set, */
  /** clashes are suppressed for overlaps less than touching tolerance. */
  toleranceOverlapValidation: boolean;
}
