/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { AccessTokenCallback } from "../base/interfaces/CommonInterfaces";

export class OperationUtils {

  public static ensureAccessTokenProvided(
    accessToken: string | undefined,
    accessTokenCallback: AccessTokenCallback | undefined
  ): void {
    if (!accessToken && !accessTokenCallback) {
      throw new Error(`Access token or callback is required`);
    }
  }
}
