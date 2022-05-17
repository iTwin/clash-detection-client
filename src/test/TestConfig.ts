/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { getAccessTokenFromBackend, TestUsers } from "@itwin/oidc-signin-tool/lib/cjs/frontend";
import type { AccessTokenCallback } from "../base/interfaces/CommonInterfaces";
import type { AccessToken } from "@itwin/core-bentley";

/** Basic configuration used by all tests
 */
export class TestConfig {

  /** Login the specified user and return the AuthorizationToken */
  public static async getAccessToken(): Promise<AccessToken> {
    return getAccessTokenFromBackend(TestUsers.regular);
  }

  public static getAccessTokenCallback(): AccessTokenCallback {
    return async () => TestConfig.getAccessToken();
  }
}
