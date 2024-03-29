/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationUtils } from "../OperationUtils";
import { OperationsBase } from "../../base/OperationsBase";
import { PreferReturn } from "../../base/interfaces/CommonInterfaces";
import { EntityListIteratorImpl } from "../../base/iterators/EntityListIteratorImpl";
import type { MinimalSuppressionRule, ResponseFromCreateSuppressionRule, ResponseFromGetSuppressionRule, ResponseFromGetSuppressionRuleList, ResponseFromGetSuppressionRuleListMinimal, ResponseFromUpdateSuppressionRule, SuppressionRuleCreate, SuppressionRuleDetails, SuppressionRuleUpdate } from "../../base/interfaces/apiEntities/SuppressionRuleInterfaces";
import type { EntityListIterator } from "../../base/iterators/EntityListIterator";
import type { OperationOptions } from "../OperationOptions";
import type { ParamsToCreateSuppressionRule, ParamsToDeleteSuppressionRule, ParamsToGetSuppressionRule, ParamsToGetSuppressionRuleList, ParamsToUpdateSuppressionRule } from "./SuppressionRuleOperationParams";

export class SuppressionRuleOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Gets Suppression Rules for a specific project. This method returns Suppression Rules in their minimal representation. The
   * returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/clash-detection/operations/get-clashdetection-rules/ Get Suppression Rules}
   * operation from Clash Detection API.
   * @param {ParamsToGetSuppressionRuleList} params parameters for this operation. See {@link ParamsToGetSuppressionRuleList}.
   * @returns {EntityListIterator<MinimalSuppressionRule>} iterator for Suppression Rule list. See {@link EntityListIterator},
   * {@link MinimalSuppressionRule}.
   */
  public getMinimalList(params: ParamsToGetSuppressionRuleList): EntityListIterator<MinimalSuppressionRule> {
    const entityCollectionAccessor = (response: unknown) => {
      const rules = (response as ResponseFromGetSuppressionRuleListMinimal).suppressionRules;
      return rules;
    };
    OperationUtils.ensureAccessTokenProvided(params.accessToken, this._options.accessTokenCallback);
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage<MinimalSuppressionRule>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: params.accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getRuleListUrl({urlParams: params.urlParams }),
      preferReturn: PreferReturn.Minimal,
      entityCollectionAccessor,
      userMetadata: false,
    }));
  }

  /**
   * Gets Suppression Rules for a specific project. This method returns Suppression Rules in their full representation. The returned
   * iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/clash-detection/operations/get-clashdetection-rules/ Get Suppression Rules}
   * operation from Clash Detection API.
   * @param {ParamsToGetSuppressionRuleList} params parameters for this operation. See {@link ParamsToGetSuppressionRuleList}.
   * @returns {EntityListIterator<SuppressionRuleDetails>} iterator for Suppression Rule list. See {@link EntityListIterator},
   * {@link SuppressionRuleDetails}.
   */
  public getRepresentationList(params: ParamsToGetSuppressionRuleList): EntityListIterator<SuppressionRuleDetails> {
    const entityCollectionAccessor = (response: unknown) => {
      const rules = (response as ResponseFromGetSuppressionRuleList).suppressionRules;
      return rules;
    };
    OperationUtils.ensureAccessTokenProvided(params.accessToken, this._options.accessTokenCallback);
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage<SuppressionRuleDetails>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: params.accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getRuleListUrl({urlParams: params.urlParams }),
      preferReturn: PreferReturn.Representation,
      entityCollectionAccessor,
      userMetadata: params.userMetadata ?? false,
    }));
  }

  /**
   * Gets a single Suppression Rule identified by id. This method returns a Suppression Rule in its full representation.
   * Wraps the {@link https://developer.bentley.com/apis/clash-detection/operations/get-clashdetection-rule/
   * Get Suppression Rule} operation from Clash Detection API.
   * @param {ParamsToGetSuppressionRule} params parameters for this operation. See {@link ParamsToGetSuppressionRule}.
   * @returns {Promise<SuppressionRuleDetails>} a Suppression Rule with specified id. See {@link SuppressionRuleDetails}.
   */
  public async getSingle(params: ParamsToGetSuppressionRule): Promise<SuppressionRuleDetails> {
    const { accessToken, ruleId, userMetadata } = params;
    OperationUtils.ensureAccessTokenProvided(accessToken, this._options.accessTokenCallback);
    const response = await this.sendGetRequest<ResponseFromGetSuppressionRule>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getSingleRuleUrl({ ruleId }),
      userMetadata: userMetadata ?? false,
    });
    return response.suppressionRule;
  }

  /**
   * Deletes a single Suppression Rule identified by id.
   * Wraps the {@link https://developer.bentley.com/apis/clash-detection/operations/delete-clashdetection-rule/
   * Delete Suppression Rule} operation from Clash Detection API.
   * @param {ParamsToDeleteSuppressionRule} params parameters for this operation. See {@link ParamsToDeleteSuppressionRule}.
   * @returns {Promise<void>}.
   */
  public async delete(params: ParamsToDeleteSuppressionRule): Promise<void> {
    const { accessToken, ruleId } = params;
    OperationUtils.ensureAccessTokenProvided(accessToken, this._options.accessTokenCallback);
    await this.sendDeleteRequest<void>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.deleteRuleUrl({ ruleId }),
    });
  }

  /**
   * Creates a Suppression Rule. Wraps the {@link https://developer.bentley.com/apis/clash-detection/operations/create-clashdetection-rule/
   * Create Suppression Rule} operation from Clash Detection API.
   * @param {ParamsToCreateSuppressionRule} params parameters for this operation. See {@link ParamsToCreateSuppressionRule}.
   * @returns {Promise<SuppressionRule>} newly created Suppression Rule. See {@link SuppressionRule}.
   */
  public async create(params: ParamsToCreateSuppressionRule): Promise<SuppressionRuleCreate> {
    const body = {
      templateId: params.templateId,
      displayName: params.displayName,
      description: params.reason,
      parameters: params.parameters,
    };
    OperationUtils.ensureAccessTokenProvided(params.accessToken, this._options.accessTokenCallback);
    const response = await this.sendPostRequest<ResponseFromCreateSuppressionRule>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: params.accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.createRuleUrl(),
      body,
    });

    return response.suppressionRule;
  }

  /**
   * Updates a Suppression Rule. Wraps the {@link https://developer.bentley.com/apis/clash-detection/operations/update-clashdetection-rule/
   * Update Suppression Rule} operation from Clash Detection API.
   * @param {ParamsToUpdateSuppressionRule} params parameters for this operation. See {@link ParamsToUpdateSuppressionRule}.
   * @returns {Promise<SuppressionRule>} newly updated Suppression Rule. See {@link SuppressionRule}.
   */
  public async update(params: ParamsToUpdateSuppressionRule): Promise<SuppressionRuleUpdate> {
    const body = {
      displayName: params.displayName,
      description: params.reason,
    };
    OperationUtils.ensureAccessTokenProvided(params.accessToken, this._options.accessTokenCallback);
    const response = await this.sendPutRequest<ResponseFromUpdateSuppressionRule>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: params.accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.updateRuleUrl(params),
      body,
    });

    return response.suppressionRule;
  }
}
