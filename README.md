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
- [ResponseFromGetResult](./src/base/interfaces/apiEntities/ResultInterfaces.ts#L47)
- [Run](./src/base/interfaces/apiEntities/TestInterfaces.ts#L102)
- [RunDetails](./src/base/interfaces/apiEntities/RunInterfaces.ts#L25)
- [SuppressionRule](./src/base/interfaces/apiEntities/SuppressionRuleInterfaces.ts#L76)
- [SuppressionRuleDetails](./src/base/interfaces/apiEntities/SuppressionRuleInterfaces.ts#L35)
- [SuppressionRuleTemplate](./src/base/interfaces/apiEntities/TemplateInterfaces.ts#L7)
- [Test](./src/base/interfaces/apiEntities/TestInterfaces.ts#L73)
- [TestDetails](./src/base/interfaces/apiEntities/TestInterfaces.ts#L40)
- [TestItem](./src/base/interfaces/apiEntities/TestInterfaces.ts#L24)

## Key methods
- [`client.templates.getList(params: ParamsToGetTemplateList): EntityListIterator<RuleTemplate>`](#get-all-clash-detection-suppression-rule-templates)
- [`client.rules.create(params: ParamsToCreateRule): Promise<SuppressionRule>`](#create-clash-detection-suppression-rule)
- [`client.rules.update(params: ParamsToUpdateRule): Promise<SuppressionRule>`](#update-clash-detection-suppression-rule)
- [`client.rules.getMinimalList(params: ParamsToGetSuppressionRuleList): EntityListIterator<MinimalSuppressionRule>`](#get-all-clash-detection-suppression-rules--minimal)
- [`client.rules.getRepresentationList(params: ParamsToGetSuppressionRuleList): EntityListIterator<RuleDetails>`](#get-all-clash-detection-suppression-rules--detailed)
- [`client.rules.getSingle(params: ParamsToGetSuppressionRule): Promise<RuleDetails>`](#get-clash-detection-suppression-rule)
- [`client.tests.create(params: ParamsToCreateTest): Promise<Test>`](#create-clash-detection-test)
- [`client.tests.update(params: ParamsToUpdateTest): Promise<Test>`](#update-clash-detection-test)
- [`client.tests.getSingle(params: ParamsToGetTest): Promise<TestDetails>`](#get-clash-detection-test)
- [`client.tests.getList(params: ParamsToGetTestList): EntityListIterator<TestItem>`](#get-all-clash-detection-tests)
- [`client.tests.runTest(params: ParamsToRunTest): Promise<Run | undefined>`](#run-clash-detection-test)
- [`client.runs.getMinimalList(params: ParamsToGetRunList): Promise<MinimalRun[]>`](#get-all-clash-detection-runs--minimal)
- [`client.runs.getRepresentationList(params: ParamsToGetRunList): Promise<RunDetails[]>`](#get-all-clash-detection-runs--detailed)
- [`client.runs.getSingle(params: ParamsToGetRun): Promise<RunDetails>`](#get-clash-detection-run)
- [`client.results.get(params: ParamsToGetResult): Promise<ResponseFromGetResult>`](#get-clash-detection-result)
- [`client.rules.delete(params: ParamsToDeleteSuppressionRule): Promise<void>`](#delete-clash-detection-suppression-rule)
- [`client.tests.delete(params: ParamsToDeleteTest): Promise<void>`](#delete-clash-detection-test)
- [`client.runs.delete(params: ParamsToDeleteRun): Promise<void>`](#delete-clash-detection-run)

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
      projectId
    }
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
      projectId
    }
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
      projectId
    }
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
    ruleId
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
    ruleId
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
  };
  const test: Test = await clashDetectionClient.tests.create(params);

  console.log(test.id);
}
```

### Update clash detection test
```typescript
import { ClashDetectionClient, ParamsToUpdateTest, Test } from "@itwin/clash-detection-client";

/** Function that updates a new clash detection test and prints its id to the console. */
async function updateClashDetectionTest(accessToken: string, testId: string, rules: string[]): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const suppressionRules: string[] = [clashDetectionClient.ruleId];
  const params: ParamsToUpdateTest = {
    accessToken,
    testId: clashDetectionClient.testId,
    displayName: "Test1 - updated",
    description: "Test 1",
    setA: {
      modelIds: [ "0x21","0x66","0x68","0x6a" ],
      categoryIds: [],
      query: "SELECT BisCore.Element.ECInstanceId FROM BisCore.Element WHERE BisCore.Element.Model.id=0x6c",
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
      projectId
    }
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
    testId
  };
  const test: TestDetails = await clashDetectionClient.tests.getSingle(params);

  console.log(test.displayName);
}
```

### Run clash detection test
```typescript
import { ClashDetectionClient, ParamsToRunTest, Run } from "@itwin/clash-detection-client";

/** Function that runs a clash detection test and prints its run id. */
async function runClashDetectionTest(accessToken: string, testId: string, iModelId: string, namedVersionId?: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToRunTest = {
    accessToken,
    testId,
    iModelId,
    namedVersionId,   // Optional - defaults to latest
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
    testId
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
      projectId
    }
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
      projectId
    }
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
    runId
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
    runId
  };
  await clashDetectionClient.runs.delete(params);
}
```

### Get clash detection result
```typescript
import { ClashDetectionClient, GetResultResponse, ParamsToGetResult } from "@itwin/clash-detection-client";

/** Function that gets a clash detection result and prints the count of clashes. */
async function getClashDetectionResult(accessToken: string, resultId: string): Promise<void> {
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient();
  const params: ParamsToGetResult = {
    accessToken,
    resultId
  };
  const response: GetResultResponse = await clashDetectionClient.results.get(params);

  console.log('Results count: ${response.result.length.toString()}');
}
```
