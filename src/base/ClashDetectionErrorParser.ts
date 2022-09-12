/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { ClashDetectionError, ClashDetectionErrorDetail } from "./interfaces/ClashDetectionErrorInterfaces";
import { ClashDetectionErrorCode } from "./interfaces/ClashDetectionErrorInterfaces";

interface ClashDetectionApiErrorWrapper {
  error: ClashDetectionApiError;
}

interface ClashDetectionApiError {
  code: string;
  message?: string;
  details?: ClashDetectionApiErrorDetail[];
}

interface ClashDetectionApiErrorDetail {
  code: string;
  message: string;
  target: string;
}

export function isClashDetectionApiError(error: unknown): error is ClashDetectionError {
  const errorCode: unknown = (error as ClashDetectionError)?.code;
  return errorCode !== undefined && typeof errorCode === "string";
}

export class ClashDetectionErrorImpl extends Error implements ClashDetectionError {
  public code: ClashDetectionErrorCode;
  public details?: ClashDetectionErrorDetail[];

  constructor(params: { code: ClashDetectionErrorCode, message: string, details?: ClashDetectionErrorDetail[] }) {
    super();
    this.name = this.code = params.code;
    this.message = params.message;
    this.details = params.details;
  }
}

export class ClashDetectionErrorParser {
  private static readonly _defaultErrorMessage = "Unknown error occurred";

  public static parse(response: { statusCode?: number, body?: unknown }): Error {
    if (!response.statusCode) {
      return new ClashDetectionErrorImpl({ code: ClashDetectionErrorCode.Unknown, message: ClashDetectionErrorParser._defaultErrorMessage });
    }
    // TODO: remove the special handling when APIM team fixes incorrect error body
    if (response.statusCode === 401) {
      return new ClashDetectionErrorImpl({ code: ClashDetectionErrorCode.Unauthorized, message: "The user is unauthorized. Please provide valid authentication credentials." });
    }
    const errorFromApi: ClashDetectionApiErrorWrapper | undefined = response.body as ClashDetectionApiErrorWrapper;
    const errorCode: ClashDetectionErrorCode = ClashDetectionErrorParser.parseCode(errorFromApi?.error?.code);
    const errorDetails: ClashDetectionErrorDetail[] | undefined = ClashDetectionErrorParser.parseDetails(errorFromApi.error?.details);
    const errorMessage: string = ClashDetectionErrorParser.parseAndFormatMessage(errorFromApi?.error?.message, errorDetails);

    return new ClashDetectionErrorImpl({
      code: errorCode,
      message: errorMessage,
      details: errorDetails,
    });
  }

  private static parseCode(errorCode: string | undefined): ClashDetectionErrorCode {
    if (!errorCode) {
      return ClashDetectionErrorCode.Unrecognized;
    }
    let parsedCode: ClashDetectionErrorCode | undefined = ClashDetectionErrorCode[errorCode as keyof typeof ClashDetectionErrorCode];
    if (!parsedCode) {
      parsedCode = ClashDetectionErrorCode.Unrecognized;
    }
    return parsedCode;
  }

  private static parseDetails(details: ClashDetectionApiErrorDetail[] | undefined): ClashDetectionErrorDetail[] | undefined {
    if (!details) {
      return undefined;
    }
    return details.map((unparsedDetail) => {
      return { ...unparsedDetail, code: this.parseCode(unparsedDetail.code) };
    });
  }

  private static parseAndFormatMessage(message: string | undefined, errorDetails: ClashDetectionErrorDetail[] | undefined): string {
    let result = message ?? ClashDetectionErrorParser._defaultErrorMessage;
    if (!errorDetails || errorDetails.length === 0) {
      return result;
    }
    result += " Details:\n";
    for (let i = 0; i < errorDetails.length; i++) {
      result += `${i + 1}. ${errorDetails[i].code}: ${errorDetails[i].message}`;
      if (errorDetails[i].target) {
        result += ` Target: ${errorDetails[i].target}.`;
      }
      result += "\n";
    }

    return result;
  }
}
