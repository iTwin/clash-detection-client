/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Dictionary } from "../base/interfaces/UtilityTypes";
import type { ParamsToGetTemplateListUrl } from "./template/TemplateOperationParams";
import type { ParamsToGetTestListUrl } from "./test/TestOperationParams";
import type { ParamsToGetSuppressionRuleListUrl } from "./suppressionRule/SuppressionRuleOperationParams";
import type { ParamsToGetRunListUrl } from "./run/RunOperationParams";

type UrlParameterValue = string | number;

export class ClashDetectionApiUrlFormatter {

  constructor(protected readonly baseUrl: string) {
  }

  public getSingleRuleUrl(params: { ruleId: string } ): string {
    return `${this.baseUrl}/rules/${params.ruleId}`;
  }

  public getRuleListUrl(params: { urlParams?: ParamsToGetSuppressionRuleListUrl }): string {
    return `${this.baseUrl}/rules${this.formQueryString({ ...params.urlParams })}`;
  }

  public createRuleUrl(): string {
    return `${this.baseUrl}/rules`;
  }

  public updateRuleUrl(params: { ruleId: string }): string {
    return `${this.baseUrl}/rules/${params.ruleId}`;
  }

  public deleteRuleUrl(params: { ruleId: string }): string {
    return `${this.baseUrl}/rules/${params.ruleId}`;
  }

  public getTemplateListUrl(params: { urlParams?: ParamsToGetTemplateListUrl }): string {
    return `${this.baseUrl}/ruleTemplates${this.formQueryString({ ...params.urlParams })}`;
  }

  public getSingleTestUrl(params: { testId: string } ): string {
    return `${this.baseUrl}/tests/${params.testId}`;
  }

  public getTestListUrl(params: { urlParams?: ParamsToGetTestListUrl }): string {
    return `${this.baseUrl}/tests${this.formQueryString({ ...params.urlParams })}`;
  }

  public createTestUrl(): string {
    return `${this.baseUrl}/tests`;
  }

  public updateTestUrl(params: { testId: string }): string {
    return `${this.baseUrl}/tests/${params.testId}`;
  }

  public deleteTestUrl(params: { testId: string }): string {
    return `${this.baseUrl}/tests/${params.testId}`;
  }

  public getSingleRunUrl(params: { runId: string } ): string {
    return `${this.baseUrl}/runs/${params.runId}`;
  }

  public getRunListUrl(params: { urlParams?: ParamsToGetRunListUrl }): string {
    return `${this.baseUrl}/runs${this.formQueryString({ ...params.urlParams })}`;
  }

  public runTestUrl(): string {
    return `${this.baseUrl}/runs`;
  }

  public deleteRunUrl(params: { runId: string }): string {
    return `${this.baseUrl}/runs/${params.runId}`;
  }

  public getResultUrl(params: { resultId: string } ): string {
    return `${this.baseUrl}/results/${params.resultId}`;
  }

  protected formQueryString(urlParameters: Dictionary<UrlParameterValue> | undefined): string {
    let queryString = "";
    for (const urlParameterKey in urlParameters) {
      if (!Object.prototype.hasOwnProperty.call(urlParameters, urlParameterKey))
        continue;

      const urlParameterValue = urlParameters[urlParameterKey];
      if (!this.shouldAppendToUrl(urlParameterValue))
        continue;

      queryString = this.appendToQueryString(queryString, urlParameterKey, urlParameterValue);
    }

    return queryString;
  }

  private shouldAppendToUrl(urlParameterValue: UrlParameterValue): boolean {
    if (urlParameterValue === null || urlParameterValue === undefined)
      return false;

    if (typeof urlParameterValue === "string" && !urlParameterValue.trim())
      return false;

    return true;
  }

  private appendToQueryString(existingQueryString: string, parameterKey: string, parameterValue: UrlParameterValue): string {
    const separator = existingQueryString.length === 0 ? "?" : "&";
    return `${existingQueryString}${separator}${parameterKey}=${this.stringify(parameterValue)}`;
  }

  private stringify(urlParameterValue: UrlParameterValue): string {

    return urlParameterValue.toString();
  }
}
