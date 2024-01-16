/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationUtils } from "../OperationUtils";
import { OperationsBase } from "../../base/OperationsBase";
import type { ResponseFromGetModelsAndCategories, ResponseFromGetSchemaInfo } from "../../base/interfaces/apiEntities/IModelInterfaces";
import type { OperationOptions } from "../OperationOptions";
import type { ParamsToExtractModelsAndCategories, ParamsToExtractSchemaInfo, ParamsToGetModelsAndCategories, ParamsToGetSchemaInfo } from "./IModelOperationParams";

export class IModelOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Gets schema info identified by project and iModel id.
   * Wraps the {@link https://developer.bentley.com/apis/clash-detection/operations/get-schema-info/
   * Get schema info} operation from Clash Detection API.
   * @param {ParamsToGetSchemaInfo} params parameters for this operation. See {@link ParamsToGetSchemaInfo}.
   * @returns {Promise<ResponseFromGetSchemaInfo>} schema info for specified iModel and project id. See {@link ResponseFromGetSchemaInfo}.
   * @deprecated The method should not be used
   */
  public async getSchemaInfo(params: ParamsToGetSchemaInfo): Promise<ResponseFromGetSchemaInfo> {
    const { accessToken, iModelId } = params;
    OperationUtils.ensureAccessTokenProvided(accessToken, this._options.accessTokenCallback);
    const response = await this.sendGetRequest<ResponseFromGetSchemaInfo>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getSchemaInfoUrl({ iModelId, urlParams: params.urlParams }),
    });
    return response;
  }

  /**
   * Extracts schema info. Required once per iModel before calling getSchemaInfo(). Extraction is only performed if needed.
   * Wraps the {@link https://developer.bentley.com/apis/clash-detection/operations/extract-schema-info/
   * Extract schema info} operation from Clash Detection API.
   * @param {ParamsToExtractSchemaInfo} params parameters for this operation. See {@link ParamsToExtractSchemaInfo}.
   * @returns {Promise<void>}.
   * @deprecated The method should not be used
   */
  public async extractSchemaInfo(params: ParamsToExtractSchemaInfo): Promise<void> {
    const { accessToken, iModelId, projectId } = params;
    const body = {
      projectId,
    };
    OperationUtils.ensureAccessTokenProvided(accessToken, this._options.accessTokenCallback);
    await this.sendPostRequest<void>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.extractSchemaInfoUrl({ iModelId }),
      body,
    });
  }

  /**
   * Gets models and categories identified by project and iModel id.
   * Wraps the {@link https://developer.bentley.com/apis/clash-detection/operations/get-models-and-categories/
   * Get models and categories} operation from Clash Detection API.
   * @param {ParamsToGetModelsAndCategories} params parameters for this operation. See {@link ParamsToGetModelsAndCategories}.
   * @returns {Promise<ModelsAndCategories>} models and categories for specified iModel and project id. See {@link ModelsAndCategories}.
   * @deprecated The method should not be used
   */
  public async getModelsAndCategories(params: ParamsToGetModelsAndCategories): Promise<ResponseFromGetModelsAndCategories> {
    const { accessToken, iModelId } = params;
    OperationUtils.ensureAccessTokenProvided(accessToken, this._options.accessTokenCallback);
    const response = await this.sendGetRequest<ResponseFromGetModelsAndCategories>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getModelsAndCategoriesUrl({ iModelId, urlParams: params.urlParams }),
    });
    return response;
  }

  /**
   * Extracts models and categories. Wraps the {@link https://developer.bentley.com/apis/clash-detection/operations/extract-models-and-categories/
   * Extract models and categories} operation from Clash Detection API.
   * @param {ParamsToExtractModelsAndCategories} params parameters for this operation. See {@link ParamsToExtractModelsAndCategories}.
   * @returns {Promise<void>}.
   * @deprecated The method should not be used
   */
  public async extractModelsAndCategories(params: ParamsToExtractModelsAndCategories): Promise<void> {
    const { accessToken, iModelId, projectId } = params;
    const body = {
      projectId,
    };
    OperationUtils.ensureAccessTokenProvided(accessToken, this._options.accessTokenCallback);
    await this.sendPostRequest<void>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.extractModelsAndCategoriesUrl({ iModelId }),
      body,
    });
  }
}
