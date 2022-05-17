/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AuthorizationParam } from "../../base/interfaces/CommonInterfaces";

/** Parameters for get Result operation. */
export interface ParamsToGetResult extends AuthorizationParam {
  /** Result id. */
  resultId: string;
}
