/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { OperationsBase } from "../../base/OperationsBase";
import { EntityListIteratorImpl } from "../../base/iterators/EntityListIteratorImpl";
import type { ResponseFromGetTemplates, SuppressionRuleTemplate } from "../../base/interfaces/apiEntities/TemplateInterfaces";
import type { EntityListIterator } from "../../base/iterators/EntityListIterator";
import type { OperationOptions } from "../OperationOptions";
import type { ParamsToGetTemplateList } from "./TemplateOperationParams";

export class TemplateOperations<TOptions extends OperationOptions> extends OperationsBase<TOptions> {
  constructor(
    options: TOptions,
  ) {
    super(options);
  }

  /**
   * Gets Suppression Rule Templates for a specific project. This method returns Suppression Rule Templates in their full representation. The returned
   * iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/clash-detection/operations/get-suppression-rule-templates/ Get Suppression Rule Template}
   * operation from Clash Detection API.
   * @param {ParamsToGetTemplateList} params parameters for this operation. See {@link ParamsToGetTemplateList}.
   * @returns {EntityListIterator<SuppressionRuleTemplate>} iterator for Template list. See {@link EntityListIterator},
   * {@link SuppressionRuleTemplate}.
   */
  public getList(params: ParamsToGetTemplateList): EntityListIterator<SuppressionRuleTemplate> {
    const entityCollectionAccessor = (response: unknown) => {
      const templates = (response as ResponseFromGetTemplates).suppressionRuleTemplates;
      return templates;
    };
    if (!params.accessToken && !this._options.accessTokenCallback) {
      throw new Error(`Access token or callback is required`);
    }
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage<SuppressionRuleTemplate>({
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      accessToken: params.accessToken ?? await this._options.accessTokenCallback!(),
      url: this._options.urlFormatter.getTemplateListUrl({ urlParams: params.urlParams }),
      entityCollectionAccessor,
      userMetadata: false,
    }));
  }
}
