/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** Possible error codes. */
export enum ClashDetectionErrorCode {
  Unrecognized = "Unrecognized",

  Unknown = "Unknown",
  Unauthorized = "Unauthorized",
  InsufficientPermissions = "InsufficientPermissions",
  RateLimitExceeded = "RateLimitExceeded",
  TooManyRequests = "TooManyRequests",
  InvalidClashDetectionRequest = "InvalidClashDetectionRequest",
  RequestTooLarge = "RequestTooLarge",
  ResourceQuotaExceeded = "ResourceQuotaExceeded",
  MutuallyExclusivePropertiesProvided = "MutuallyExclusivePropertiesProvided",
  MissingRequiredProperty = "MissingRequiredProperty",
  MissingRequiredParameter = "MissingRequiredParameter",
  MissingRequiredHeader = "MissingRequiredHeader",
  InvalidValue = "InvalidValue",
  InvalidHeaderValue = "InvalidHeaderValue",
  InvalidRequestBody = "InvalidRequestBody",
  MissingRequestBody = "MissingRequestBody",
  ProjectNotFound = "ProjectNotFound",
  IModelNotFound = "iModelNotFound",
  NamedVersionNotFound = "NamedVersionNotFound",
  ClashDetectionResultNotFound = "ClashDetectionResultNotFound",
  ClashDetectionSuppressionRuleNotFound = "ClashDetectionSuppressionRuleNotFound",
  SuppressionRuleTemplateNotFound = "SuppressionRuleTemplateNotFound",
  ClashDetectionRunNotFound = "ClashDetectionRunNotFound",
  ClashDetectionTestNotFound = "ClashDetectionTestNotFound"
}

/** Error detail information. */
export interface ClashDetectionErrorDetail {
  /** Error detail code. See {@link ClashDetectionErrorCode}. */
  code: ClashDetectionErrorCode;
  /** Message that describes the error detail. */
  message: string;
  /** Name of the property or parameter which is related to the issue. */
  target?: string;
}

/** Interface for the errors thrown by this library. */
export interface ClashDetectionError extends Error {
  /** Error code. See {@link ClashDetectionErrorCode}. */
  code: ClashDetectionErrorCode;
  /** Data that describes the error in more detail. See {@link ClashDetectionErrorDetail}. */
  details?: ClashDetectionErrorDetail[];
}
