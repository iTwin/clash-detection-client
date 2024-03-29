# Clash Detection Client Library

Copyright © Bentley Systems, Incorporated. All rights reserved. See [LICENSE.md](./LICENSE.md) for license terms and full copyright notice.

[iTwin.js](http://www.itwinjs.org) is an open source platform for creating, querying, modifying, and displaying Infrastructure Digital Twins. To learn more about the iTwin Platform and its APIs, visit the [iTwin developer portal](https://developer.bentley.com/).

If you have questions, or wish to contribute to iTwin.js, see our [Contributing guide](./CONTRIBUTING.md).

## About this Repository

The __@itwin/clash-detection-client__ package consists of thin wrapper functions for sending requests to the iTwin Clash Detection API. There are CRUD functions for the four components of clash detection: suppression rules, tests, runs and results. Define clash suppression criteria in suppression rules, define clash criteria in tests and add suppression rules, run the tests for versions of iModels, and retrieve the clash results. Visit the [Clash Detection API](https://developer.bentley.com/apis/clash-detection/) for more details.

## Key response types
- [ClashDetectionClient](./src/ClashDetectionClient.ts#L30)
- [EntityListIterator](./src/base/iterators/EntityListIterator.ts#L6)
- [MinimalSuppressionRule](./src/base/interfaces/apiEntities/SuppressionRuleInterfaces.ts#L25)
- [MinimalRun](./src/base/interfaces/apiEntities/RunInterfaces.ts#L15)
- [ResponseFromGetModelsAndCategories](./src/base/interfaces/apiEntities/IModelInterfaces.ts#L78)
- [ResponseFromGetResult](./src/base/interfaces/apiEntities/ResultInterfaces.ts#L47)
- [ResponseFromGetSchemaInfo](./src/base/interfaces/apiEntities/IModelInterfaces.ts#L54)
- [Run](./src/base/interfaces/apiEntities/TestInterfaces.ts#L102)
- [RunDetails](./src/base/interfaces/apiEntities/RunInterfaces.ts#L25)
- [SuppressionRule](./src/base/interfaces/apiEntities/SuppressionRuleInterfaces.ts#L76)
- [SuppressionRuleDetails](./src/base/interfaces/apiEntities/SuppressionRuleInterfaces.ts#L35)
- [SuppressionRuleTemplate](./src/base/interfaces/apiEntities/TemplateInterfaces.ts#L7)
- [Test](./src/base/interfaces/apiEntities/TestInterfaces.ts#L73)
- [TestDetails](./src/base/interfaces/apiEntities/TestInterfaces.ts#L40)
- [TestItem](./src/base/interfaces/apiEntities/TestInterfaces.ts#L24)

## Key methods
- [Clash Detection Client Library](#clash-detection-client-library)
  - [About this Repository](#about-this-repository)
  - [Key response types](#key-response-types)
  - [Key methods](#key-methods)
  - [Authorization options](#authorization-options)
  - [Usage examples](#usage-examples)
    - [Get all clash detection suppression rule templates](#get-all-clash-detection-suppression-rule-templates)
    - [Create clash detection suppression rule](#create-clash-detection-suppression-rule)
    - [Update clash detection suppression rule](#update-clash-detection-suppression-rule)
    - [Get all clash detection suppression rules -minimal](#get-all-clash-detection-suppression-rules--minimal)
    - [Get all clash detection suppression rules -detailed](#get-all-clash-detection-suppression-rules--detailed)
    - [Get clash detection suppression rule](#get-clash-detection-suppression-rule)
    - [Delete clash detection suppression rule](#delete-clash-detection-suppression-rule)
    - [Create clash detection test](#create-clash-detection-test)
    - [Update clash detection test](#update-clash-detection-test)
    - [Get all clash detection tests](#get-all-clash-detection-tests)
    - [Get clash detection test](#get-clash-detection-test)
    - [Run clash detection test](#run-clash-detection-test)
    - [Delete clash detection test](#delete-clash-detection-test)
    - [Get all clash detection runs -minimal](#get-all-clash-detection-runs--minimal)
    - [Get all clash detection runs -detailed](#get-all-clash-detection-runs--detailed)
    - [Get clash detection run](#get-clash-detection-run)
    - [Delete clash detection run](#delete-clash-detection-run)
    - [Get clash detection result](#get-clash-detection-result)
    - [Extract models and categories - Deprecated](#extract-models-and-categories---deprecated)
    - [Get models and categories - Deprecated](#get-models-and-categories---deprecated)
    - [Extract schema information - Deprecated](#extract-schema-information---deprecated)
    - [Get schema information - Deprecated](#get-schema-information---deprecated)

## Authorization options

There are two ways to provide the authorization token for the wrapper functions:

1. Set accessToken in parameters object every time a wrapper function is called (as shown in usage examples below).

2. Provide a callback function to the ClashDetectionClient constructor. This callback will be called by the wrapper function if the accessToken parameter in Option 1 is not provided.

```typescript
    import { ClashDetectionClient, ClashDetectionClientOptions } from "@itwin/clash-detection-client";

    public static initWrapperClient(accessToken: string, projectId: string): ClashDetectionClient {
      const options: ClashDetectionClientOptions = {};
      const accessTokenCallback = async () => this.getAccessToken();
      const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient(options, accessTokenCallback);
    }

    public static async getAccessToken(): Promise<string> {
      return "Bearer ey..."
    }
```

## Usage examples

### Get all clash detection suppression rule templates
```typescript
import { ClashDetectionClient, EntityListIterator, ParamsToGetTemplateList, SuppressionRuleTemplate } from "@itwin/clash-detection-client";

/** Function that queries all suppression rule templates for a particular project and prints their ids to the console. */
async function printSuppressionRuleTemplateIds(accessToken: string, projectId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetTemplateList = {
    accessToken,
    urlParams: {
      projectId,
    },
  };
  const templatesIterator: EntityListIterator<SuppressionRuleTemplate> = clashDetectionClient.templates.getList(params);
  for await (const template of templatesIterator)
    console.log(template.id);
}
```

### Create clash detection suppression rule
```typescript
import { ClashDetectionClient, ParamsToCreateSuppressionRule, SuppressionRule } from "@itwin/clash-detection-client";

/** Function that creates a new clash detection suppression rule and prints its id to the console. */
async function createClashDetectionSuppressionRule(accessToken: string, templateId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
    const params: ParamsToCreateSuppressionRule = {
      accessToken,
      templateId: clashDetectionClient.templateId,
      displayName: "TestSuppressionRule1",
      reason: "Test suppression rule 1",
      parameters: {
        propertyKey: {
          relationshipPath: "ArchitecturalPhysical:Door",
          propertyName: "Roll",
        },
        operator: {
          value: "=",
        },
      },
    },
  };
  const rule: SuppressionRule = await clashDetectionClient.rules.create(params);

  console.log(rule.id);
}
```

### Update clash detection suppression rule
```typescript
import { ClashDetectionClient, ParamsToUpdateSuppressionRule, SuppressionRule } from "@itwin/clash-detection-client";

/** Function that updates a new clash detection suppression rule and prints its id to the console. */
async function updateClashDetectionSuppressionRule(accessToken: string, ruleId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToUpdateSuppressionRule = {
    accessToken,
    ruleId: clashDetectionClient.ruleId,
    displayName: "TestSuppressionRule1 - updated",
    reason: "Test suppression rule 1",
  };
  const rule: SuppressionRule = await clashDetectionClient.rules.update(params);

  console.log(rule.id);
}
```

### Get all clash detection suppression rules -minimal
```typescript
import { ClashDetectionClient, EntityListIterator, MinimalSuppressionRule, ParamsToGetSuppressionRuleList } from "@itwin/clash-detection-client";

/** Function that queries all suppression rules for a particular project and prints their ids to the console. */
async function printRuleIds(accessToken: string, projectId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetSuppressionRuleList = {
    accessToken,
    urlParams: {
      projectId,
    },
  };
  const rulesIterator: EntityListIterator<MinimalSuppressionRule> = clashDetectionClient.rules.getMinimalList(params);
  for await (const rule of rulesIterator)
    console.log(rule.id);
}
```

### Get all clash detection suppression rules -detailed
```typescript
import { ClashDetectionClient, EntityListIterator, ParamsToGetSuppressionRuleList, SuppressionRuleDetails } from "@itwin/clash-detection-client";

/** Function that queries all suppression rules for a particular project and prints their ids to the console. */
async function printRuleIds(accessToken: string, projectId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetSuppressionRuleList = {
    accessToken,
    urlParams: {
      projectId,
    },
    userMetadata: true,
  };
  const rulesIterator: EntityListIterator<SuppressionRuleDetails> = clashDetectionClient.rules.getRepresentationList(params);
  for await (const rule of rulesIterator)
    console.log(rule.id);
}
```

### Get clash detection suppression rule
```typescript
import { ClashDetectionClient, ParamsToGetSuppressionRule, SuppressionRuleDetails } from "@itwin/clash-detection-client";

/** Function that gets a clash detection suppression rule and prints its name. */
async function getClashDetectionRule(accessToken: string, ruleId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetSuppressionRule = {
    accessToken,
    ruleId,
    userMetadata: true,
  };
  const rule: SuppressionRuleDetails = await clashDetectionClient.rules.getSingle(params);

  console.log(rule.displayName);
}
```

### Delete clash detection suppression rule
```typescript
import { ClashDetectionClient, ParamsToDeleteSuppressionRule } from "@itwin/clash-detection-client";

/** Function that deletes a clash detection rule. */
async function deleteClashDetectionSuppressionRule(accessToken: string, ruleId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToDeleteSuppressionRule = {
    accessToken,
    ruleId,
  };
  await clashDetectionClient.rules.delete(params);
}
```

### Create clash detection test
```typescript
import { ClashDetectionClient, ParamsToCreateTest, Test } from "@itwin/clash-detection-client";

/** Function that creates a new clash detection test and prints its id to the console. */
async function createClashDetectionTest(accessToken: string, projectId: string, rules: string[]): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const suppressionRules: string[] = [clashDetectionClient.ruleId];
  const params: ParamsToCreateTest = {
    accessToken,
    projectId,
    displayName: "Test1",
    description: "Test 1",
    setA: {
      modelIds: [ "0x21","0x66","0x68","0x6a" ],
      categoryIds: [],
      query: "SELECT BisCore.Element.ECInstanceId FROM BisCore.Element WHERE BisCore.Element.Model.id=0x6c",
      queryName: "Test1",
      selfCheck: true,
      clearance: 0.001,
    },
    setB: {
      modelIds: [],
      categoryIds: [],
      selfCheck: false,
      clearance: 0,
    },
    suppressTouching: false,
    touchingTolerance: 0,
    includeSubModels: false,
    suppressionRules,
    advancedSettings: {
      longClash: true,
      calculateOverlap: true,
      toleranceOverlapValidation, true,
    },
  };
  const test: Test = await clashDetectionClient.tests.create(params);

  console.log(test.id);
}
```

### Update clash detection test
```typescript
import { ClashDetectionClient, ParamsToUpdateTest, Test } from "@itwin/clash-detection-client";

/** Function that updates a new clash detection test and prints its id to the console.
 *
 * It is mandatory to provide either of modelIds/categoryIds/both or query along with queryName or queries for a specific set.
 * Cross combination is allowed i.e. setA can have modelId/categoryId and setB can have queries.
 * queryName supports max of 1024 characters.
*/
async function updateClashDetectionTest(accessToken: string, testId: string, rules: string[]): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const suppressionRules: string[] = [clashDetectionClient.ruleId];
  const params: ParamsToUpdateTest = {
    accessToken,
    testId: clashDetectionClient.testId,
    displayName: "Test1 - updated",
    description: "Test 1",
    setA: {
      modelIds: [],
      categoryIds: [],
      query: "SELECT BisCore.Element.ECInstanceId FROM BisCore.Element WHERE BisCore.Element.Model.id=0x6c",
      queryName: "Test1",
      selfCheck: true,
      clearance: 0.001,
    },
    setB: {
      modelIds: [ "0x21","0x66","0x68","0x6a" ],
      categoryIds: [],
      selfCheck: false,
      clearance: 0,
    },
    suppressTouching: false,
    touchingTolerance: 0,
    includeSubModels: false,
    suppressionRules,
    advancedSettings: {
      longClash: true,
      calculateOverlap: true,
      toleranceOverlapValidation, true,
    },
  };
  const test: Test = await clashDetectionClient.tests.update(params);

  console.log(test.id);
}
```

### Get all clash detection tests
```typescript
import { ClashDetectionClient, EntityListIterator, ParamsToGetTestList, TestItem } from "@itwin/clash-detection-client";
/** Function that queries all tests for a particular project and prints their ids to the console. */
async function printTestIds(accessToken: string, projectId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetTestList = {
    accessToken,
    urlParams: {
      projectId,
    },
    userMetadata: true,
  };
  const testsIterator: EntityListIterator<TestItem> = clashDetectionClient.tests.getList(params);
  for await (const test of testsIterator)
    console.log(test.id);
}
```

### Get clash detection test
```typescript
import { ClashDetectionClient, ParamsToGetTest, TestDetails } from "@itwin/clash-detection-client";

/** Function that gets a clash detection test and prints its name. */
async function getClashDetectionTest(accessToken: string, testId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetTest = {
    accessToken,
    testId,
    userMetadata: true,
  };
  const test: TestDetails = await clashDetectionClient.tests.getSingle(params);

  console.log(test.displayName);
}
```

### Run clash detection test
```typescript
import { ClashDetectionClient, ParamsToRunTest, Run, TestSettings } from "@itwin/clash-detection-client";

/** Function that runs a clash detection test and prints its run id. */
async function runClashDetectionTest(accessToken: string, testId: string, iModelId: string, namedVersionId?: string, testSettings?: TestSettings): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToRunTest = {
    accessToken,
    testId,
    iModelId,
    namedVersionId,   // Optional - defaults to latest version
    testSettings,     // Optional
  };
  const run: Run = await clashDetectionClient.tests.runTest(params);

  console.log(run.id);
}
```

### Delete clash detection test
```typescript
import { ClashDetectionClient, ParamsToDeleteTest } from "@itwin/clash-detection-client";

/** Function that deletes a clash detection test. */
async function deleteClashDetectionTest(accessToken: string, testId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToDeleteTest = {
    accessToken,
    testId,
  };
  await clashDetectionClient.tests.delete(params);
}
```

### Get all clash detection runs -minimal
```typescript
import { ClashDetectionClient, MinimalRun, ParamsToGetRunList } from "@itwin/clash-detection-client";
/** Function that queries all runs for a particular project and prints their ids to the console. */
async function printRunIds(accessToken: string, projectId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetRunList = {
    accessToken,
    urlParams: {
      projectId,
    },
  };
  const runs: MinimalRun[] = await clashDetectionClient.runs.getMinimalList(params);
  runs.forEach((run) => {
    console.log(run.id);
  });
}
```

### Get all clash detection runs -detailed
```typescript
import { ClashDetectionClient, ParamsToGetRunList, RunDetails } from "@itwin/clash-detection-client";
/** Function that queries all runs for a particular project and prints their ids to the console. */
async function printRunIds(accessToken: string, projectId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetRunList = {
    accessToken,
    urlParams: {
      projectId,
    },
  };
  const runs: RunDetails[] = await clashDetectionClient.runs.getRepresentationList(params);
  runs.forEach((run) => {
    console.log(run.id);
  });
}
```

### Get clash detection run
```typescript
import { ClashDetectionClient, ParamsToGetRun, RunDetails } from "@itwin/clash-detection-client";

/** Function that gets a clash detection run and prints its name and status. */
async function getClashDetectionRun(accessToken: string, runId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetRun = {
    accessToken,
    runId,
  };
  const run: RunDetails = await clashDetectionClient.runs.getSingle(params);

  console.log('${run.displayName}: ${run.status}');
}
```

### Delete clash detection run
```typescript
import { ClashDetectionClient, ParamsToDeleteRun } from "@itwin/clash-detection-client";

/** Function that deletes a clash detection run. */
async function deleteClashDetectionRun(accessToken: string, runId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToDeleteRun = {
    accessToken,
    runId,
  };
  await clashDetectionClient.runs.delete(params);
}
```

### Get clash detection result
```typescript
import { ClashDetectionClient, ParamsToGetResult, ResponseFromGetResult } from "@itwin/clash-detection-client";

/** Function that gets a clash detection result and prints the count of clashes. */
async function getClashDetectionResult(accessToken: string, resultId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetResult = {
    accessToken,
    resultId,
  };
  const response: ResponseFromGetResult   = await clashDetectionClient.results.get(params);

  console.log('Results count: ${response.result.length.toString()}');
}
```

### Extract models and categories - Deprecated
```typescript
import { ClashDetectionClient, ParamsToExtractModelsAndCategories } from "@itwin/clash-detection-client";
/** Function that extracts models and categories. */
async function extractModelsAndCategories(accessToken: string, projectId: string, iModelId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToExtractModelsAndCategories = {
    accessToken,
    iModelId,
    urlParams: {
      projectId
    }
  };
  await clashDetectionClient.imodel.extractModelsAndCategories(params);
}
```

### Get models and categories - Deprecated
```typescript
import { ClashDetectionClient, ParamsToGetModelsAndCategories, ResponseFromGetModelsAndCategories } from "@itwin/clash-detection-client";
/** Function that gets the list of models and categories in an iModel and prints the extraction status and count of models and categories. */
async function getModelsAndCategories(accessToken: string, projectId: string, iModelId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetModelsAndCategories = {
    iModelId,
    urlParams: {
      projectId,
    },
  };
  const modelsAndCategories: ResponseFromGetModelsAndCategories = await clashDetectionClient.imodel.getModelsAndCategories(params);
  console.log('Status: ${modelsAndCategories.status}, model count: ${modelsAndCategories.models.length}, category count: ${modelsAndCategories.categories.length}');
}
```

### Extract schema information - Deprecated
```typescript
import { ClashDetectionClient, ParamsToExtractSchemaInfo } from "@itwin/clash-detection-client";
/** Function that extracts schema info. */
async function extractSchemaInfo(accessToken: string, projectId: string, iModelId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToExtractSchemaInfo = {
    accessToken,
    iModelId,
    urlParams: {
      projectId
    }
  };
  await clashDetectionClient.imodel.extractSchemaInfo(params);
}
```
### Get schema information - Deprecated
```typescript
import { ClashDetectionClient, ParamsToGetSchemaInfo, ResponseFromGetSchemaInfo } from "@itwin/clash-detection-client";
/** Function that gets the iModel schema information and prints the extraction status and count of schemas. */
async function getSchemaInfo(accessToken: string, projectId: string, iModelId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetSchemaInfo = {
    iModelId,
    urlParams: {
      projectId,
    },
  };
  const schemaInfo: ResponseFromGetSchemaInfo = await clashDetectionClient.imodel.getSchemaInfo(params);
  console.log('Status: ${schemaInfo.status}, schema count: ${schemaInfo.schema.length}');
}
```