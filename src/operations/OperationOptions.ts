/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { OperationsBaseOptions } from "../base/OperationsBase";
import type { ClashDetectionApiUrlFormatter } from "./ClashDetectionApiUrlFormatter";

export interface OperationOptions extends OperationsBaseOptions {
  urlFormatter: ClashDetectionApiUrlFormatter;
}
