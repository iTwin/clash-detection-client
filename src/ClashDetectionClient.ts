/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { AccessTokenCallback, ApiOptions } from "./base/interfaces/CommonInterfaces";
import type { RecursiveRequired } from "./base/interfaces/UtilityTypes";
import { AxiosRestClient } from "./base/rest/AxiosRestClient";
import type { RestClient } from "./base/rest/RestClient";
import { Constants } from "./Constants";
import { IModelOperations } from "./operations/imodel/IModelOperations";
import { SuppressionRuleOperations } from "./operations/suppressionRule/SuppressionRuleOperations";
import { RunOperations } from "./operations/run/RunOperations";
import { ResultOperations } from "./operations/result/ResultOperations";
import { TestOperations } from "./operations/test/TestOperations";
import { TemplateOperations } from "./operations/template/TemplateOperations";
import { ClashDetectionApiUrlFormatter } from "./operations/ClashDetectionApiUrlFormatter";
import type { OperationOptions } from "./operations/OperationOptions";
import type { AuthorizationCallback } from "@itwin/imodels-client-management";

/** User-configurable Clash Detection client options. */
export interface ClashDetectionClientOptions {
  /**
   * Rest client that is used for making HTTP requests. If `undefined` the default client is used which is implemented
   * using `axios` library. See {@link AxiosRestClient}.
   */
  restClient?: RestClient;
  /** Clash Detection API options. See {@link ApiOptions}. */
  api?: ApiOptions;
}

/**
 * Clash Detection API client for clash detection workflows. For more information on the API visit the
 * {@link https://developer.bentley.com/apis/clash-detection/ Clash Detection API documentation page}.
 */
export class ClashDetectionClient {
  protected _operationsOptions: OperationOptions;
  public templateId: string;
  public ruleId: string;
  public testId: string;
  public runId: string;
  public resultId: string;

  /**
   * Class constructor.
   * @param {ClashDetectionClientOptions} options client options. If `options` are `undefined` or if some of the properties
   * are `undefined` the client uses defaults. See {@link ClashDetectionClientOptions}.
   */
  constructor(options?: ClashDetectionClientOptions, accessTokenCallback?: AccessTokenCallback) {
    const filledClashDetectionClientOptions = ClashDetectionClient.fillConfiguration(options);
    this._operationsOptions = {
      ...filledClashDetectionClientOptions,
      urlFormatter: new ClashDetectionApiUrlFormatter(filledClashDetectionClientOptions.api.baseUrl),
      accessTokenCallback,
    };
    this.templateId = "";
    this.ruleId = "";
    this.testId = "";
    this.runId = "";
    this.resultId = "";
  }

  /** Template operations. See {@link TemplateOperations}. */
  public get templates(): TemplateOperations<OperationOptions> {
    return new TemplateOperations(this._operationsOptions);
  }

  /** Suppression Rule operations. See {@link SuppressionRuleOperations}. */
  public get rules(): SuppressionRuleOperations<OperationOptions> {
    return new SuppressionRuleOperations(this._operationsOptions);
  }

  /** Test operations. See {@link TestOperations}. */
  public get tests(): TestOperations<OperationOptions> {
    return new TestOperations(this._operationsOptions);
  }

  /** Run operations. See {@link RunOperations}. */
  public get runs(): RunOperations<OperationOptions> {
    return new RunOperations(this._operationsOptions);
  }

  /** Result operations. See {@link ResultOperations}. */
  public get results(): ResultOperations<OperationOptions> {
    return new ResultOperations(this._operationsOptions);
  }

  /** IModel operations. See {@link IModelOperations}. */
  public get imodel(): IModelOperations<OperationOptions> {
    return new IModelOperations(this._operationsOptions);
  }

  /**
   * Creates a required configuration instance from user provided options and applying default ones for not specified
   * options. See {@link ClashDetectionClientOptions}.
   * @param {ClashDetectionClientOptions} options user-passed client options.
   * @returns {RecursiveRequired<ClashDetectionClientOptions>} required Clash Detection client configuration options.
   */
  public static fillConfiguration(options?: ClashDetectionClientOptions): RecursiveRequired<ClashDetectionClientOptions> {
    return {
      api: {
        baseUrl: options?.api?.baseUrl ?? Constants.api.baseUrl,
        version: options?.api?.version ?? Constants.api.version,
      },
      restClient: options?.restClient ?? new AxiosRestClient(),
    };
  }

  public static toAuthorizationCallback(accessToken: string): AuthorizationCallback {
    const splitAccessToken = accessToken.split(" ");
    const authorization = {
      scheme: splitAccessToken[0],
      token: splitAccessToken[1],
    };
    return async () => authorization;
  }
}
