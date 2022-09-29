/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Constants } from "../Constants";
import type { AccessTokenCallback, AuthorizationParam, CollectionResponse, PreferReturn } from "./interfaces/CommonInterfaces";
import type { Dictionary, EntityCollectionPage } from "./interfaces/UtilityTypes";
import type { RestClient } from "./rest/RestClient";

type SendGetRequestParams = AuthorizationParam & { url: string, preferReturn?: PreferReturn, userMetadata?: boolean };
type SendPostRequestParams = AuthorizationParam & { url: string, body: unknown };
type SendPutRequestParams = AuthorizationParam & { url: string, body: unknown };
type SendDeleteRequestParams = AuthorizationParam & { url: string };

export interface OperationsBaseOptions {
  accessTokenCallback?: AccessTokenCallback;
  restClient: RestClient;
  api: { version: string };
}

export class OperationsBase<TOptions extends OperationsBaseOptions> {
  constructor(protected _options: TOptions) {
  }

  protected async sendGetRequest<TResponse>(params: SendGetRequestParams): Promise<TResponse> {
    return this._options.restClient.sendGetRequest<TResponse>({
      url: params.url,
      headers: await this.formHeaders(params),
    });
  }

  protected async sendPostRequest<TResponse>(params: SendPostRequestParams): Promise<TResponse> {
    return this._options.restClient.sendPostRequest<TResponse>({
      url: params.url,
      body: params.body,
      headers: await this.formHeaders({ ...params, containsBody: true }),
    });
  }

  protected async sendPutRequest<TResponse>(params: SendPutRequestParams): Promise<TResponse> {
    return this._options.restClient.sendPutRequest<TResponse>({
      url: params.url,
      body: params.body,
      headers: await this.formHeaders({ ...params, containsBody: true }),
    });
  }

  protected async sendDeleteRequest<TResponse>(params: SendDeleteRequestParams): Promise<TResponse> {
    return this._options.restClient.sendDeleteRequest<TResponse>({
      url: params.url,
      headers: await this.formHeaders(params),
    });
  }

  protected async getEntityCollectionPage<TEntity>(params: AuthorizationParam & {
    url: string;
    preferReturn?: PreferReturn;
    entityCollectionAccessor: (response: unknown) => TEntity[];
    userMetadata: boolean;
  }): Promise<EntityCollectionPage<TEntity>> {
    const response = await this.sendGetRequest<CollectionResponse>(params);
    return {
      entities: params.entityCollectionAccessor(response),
      next: response._links.next
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        ? async () => this.getEntityCollectionPage({ ...params, url: response._links.next!.href })
        : undefined,
    };
  }

  private async formHeaders(params: AuthorizationParam & { preferReturn?: PreferReturn, containsBody?: boolean, userMetadata?: boolean }): Promise<Dictionary<string>> {
    const headers: Dictionary<string> = {};
    if (params.accessToken) {
      headers[Constants.headers.authorization] = params.accessToken;
    } else if (this._options.accessTokenCallback) {
      headers[Constants.headers.authorization] = await this._options.accessTokenCallback();
    }
    headers[Constants.headers.accept] = `application/vnd.bentley.${this._options.api.version}+json`;

    if (params.preferReturn) {
      headers[Constants.headers.prefer] = `return=${params.preferReturn}`;
    }
    if (params.containsBody) {
      headers[Constants.headers.contentType] = Constants.headers.values.contentType;
    }
    if (params.userMetadata) {
      headers[Constants.headers.userMetadata] = "true";
    }
    return headers;
  }
}
