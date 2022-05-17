/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as chai from "chai";
import { take } from "../../base/iterators/IteratorUtilFunctions";
import type { EntityListIterator } from "../../base/iterators/EntityListIterator";
import type { ClashDetectionClientOptions } from "../../ClashDetectionClient";
import { ClashDetectionClient } from "../../ClashDetectionClient";
import { TestConfig } from "../TestConfig";
import type { MinimalRun, MinimalSuppressionRule, ResponseFromGetResult, Run, RunDetails, SuppressionRule, SuppressionRuleDetails, SuppressionRuleTemplate, Test, TestDetails, TestItem } from "../../base";
import type { ParamsToCreateSuppressionRule, ParamsToCreateTest, ParamsToDeleteRun, ParamsToDeleteSuppressionRule, ParamsToDeleteTest, ParamsToGetResult, ParamsToGetRun, ParamsToGetRunList, ParamsToGetSuppressionRule, ParamsToGetSuppressionRuleList, ParamsToGetTemplateList, ParamsToGetTest, ParamsToGetTestList, ParamsToRunTest, ParamsToUpdateSuppressionRule, ParamsToUpdateTest } from "../../operations";

chai.should();
describe("ClashDetectionClient", async () => {
  const options: ClashDetectionClientOptions = {};
  const accessTokenCallback = TestConfig.getAccessTokenCallback();
  const clashDetectionClient: ClashDetectionClient = new ClashDetectionClient(options, accessTokenCallback);

  const projectId: string = process.env.IMJS_TEST_PROJECT_ID ?? "";
  const iModelId: string = process.env.IMJS_TEST_IMODEL_ID ?? "";
  chai.assert.isNotEmpty(projectId);
  chai.assert.isNotEmpty(iModelId);

  it("should get a list of suppression rule templates", async () => {
    const params: ParamsToGetTemplateList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const templatesIterator: EntityListIterator<SuppressionRuleTemplate> = clashDetectionClient.templates.getList(params);
    const templates: SuppressionRuleTemplate[] = await take(templatesIterator, 1);

    // At least one suppression rule template
    chai.expect(templates).to.not.be.empty;

    // Save id of first template
    clashDetectionClient.templateId = templates[0].id;
  });

  it("should create a suppression rule", async () => {
    const params: ParamsToCreateSuppressionRule = {
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
    };
    const rule: SuppressionRule = await clashDetectionClient.rules.create(params);

    // Expect suppression rule to be found
    chai.expect(rule).to.not.be.undefined;

    // Save id of created rule
    clashDetectionClient.ruleId = rule.id;
  });

  it("should update a suppression rule", async () => {
    const params: ParamsToUpdateSuppressionRule = {
      ruleId: clashDetectionClient.ruleId,
      displayName: "TestSuppressionRule1 - updated",
      reason: "Test suppression rule 1",
    };
    const rule: SuppressionRule = await clashDetectionClient.rules.update(params);

    // Expect suppression rule to be found
    chai.expect(rule).to.not.be.undefined;
  });

  it("should get a list of suppression rules (minimal)", async () => {
    const params: ParamsToGetSuppressionRuleList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const rulesIterator: EntityListIterator<MinimalSuppressionRule> = clashDetectionClient.rules.getMinimalList(params);
    const rules: MinimalSuppressionRule[] = await take(rulesIterator, 1);

    // At least one suppression rule
    chai.expect(rules).to.not.be.empty;
  });

  it("should get a list of suppression rules (representation", async () => {
    const params: ParamsToGetSuppressionRuleList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const rulesIterator: EntityListIterator<SuppressionRuleDetails> = clashDetectionClient.rules.getRepresentationList(params);
    const rules: SuppressionRuleDetails[] = await take(rulesIterator, 1);

    // At least one suppression rule
    chai.expect(rules).to.not.be.empty;
  });

  it("should get a suppression rule by id", async () => {
    const params: ParamsToGetSuppressionRule = {
      ruleId: clashDetectionClient.ruleId,
    };
    const rule: SuppressionRuleDetails = await clashDetectionClient.rules.getSingle(params);

    // Expect suppression rule to be found
    chai.expect(rule).to.not.be.undefined;
  });

  it("should create a test", async () => {
    const suppressionRules: string[] = [clashDetectionClient.ruleId];
    const params: ParamsToCreateTest = {
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

    // Expect test to be created
    chai.expect(test).to.not.be.undefined;

    // Save id of created test
    clashDetectionClient.testId = test.id;
  });

  it("should update a test", async () => {
    const suppressionRules: string[] = [clashDetectionClient.ruleId];
    const params: ParamsToUpdateTest = {
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

    // Expect test to be updated
    chai.expect(test).to.not.be.undefined;
  });

  it("should get a test by id", async () => {
    const params: ParamsToGetTest = {
      testId: clashDetectionClient.testId,
    };
    const test: TestDetails = await clashDetectionClient.tests.getSingle(params);

    // Expect test to be found
    chai.expect(test).to.not.be.undefined;
  });

  it("should get a list of tests", async () => {
    const params: ParamsToGetTestList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const testsIterator: EntityListIterator<TestItem> = clashDetectionClient.tests.getList(params);
    const tests: TestItem[] = await take(testsIterator, 1);

    // At least one test
    chai.expect(tests).to.not.be.empty;
  });

  it("should run a test with no named version id", async () => {
    const params: ParamsToRunTest = {
      testId: clashDetectionClient.testId,
      iModelId,
    };
    const run: Run | undefined = await clashDetectionClient.tests.runTest(params);

    // Expect test to be run
    chai.expect(run).to.not.be.undefined;

    // Save id of test run
    clashDetectionClient.runId = run!.id;
  });

  it("should get a list of runs (minimal)", async () => {
    const params: ParamsToGetRunList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const runs: MinimalRun[] = await clashDetectionClient.runs.getMinimalList(params);

    // At least one run
    chai.expect(runs).to.not.be.empty;
  });

  it("should get a list of runs (representation)", async () => {
    const params: ParamsToGetRunList = {
      urlParams: {
        projectId,
        $top: 5,
      },
    };
    const runs: RunDetails[] = await clashDetectionClient.runs.getRepresentationList(params);

    // At least one run
    chai.expect(runs).to.not.be.empty;

    runs.forEach((run) => {
      // Save id of result for the first completed run
      if (run.status === "completed") {
        clashDetectionClient.resultId = run.resultId;
        return;
      }
    });
  });

  it("should get a run by id", async () => {
    const params: ParamsToGetRun = {
      runId: clashDetectionClient.runId,
    };
    const run: RunDetails = await clashDetectionClient.runs.getSingle(params);

    // Expect run to be found
    chai.expect(run).to.not.be.undefined;
  });

  it("should get a result by id", async () => {
    if (clashDetectionClient.resultId === "") {
      return;
    }
    const params: ParamsToGetResult = {
      resultId: clashDetectionClient.resultId,
    };
    const response: ResponseFromGetResult = await clashDetectionClient.results.get(params);

    // Expect result to be found
    chai.expect(response).to.not.be.undefined;
  });

  it("should delete a suppression rule by id", async () => {
    const params: ParamsToDeleteSuppressionRule = {
      ruleId: clashDetectionClient.ruleId,
    };
    await clashDetectionClient.rules.delete(params);
  });

  it("should delete a test by id", async () => {
    const params: ParamsToDeleteTest = {
      testId: clashDetectionClient.testId,
    };
    await clashDetectionClient.tests.delete(params);
  });

  it("should delete a run by id", async () => {
    const params: ParamsToDeleteRun = {
      runId: clashDetectionClient.runId,
    };
    await clashDetectionClient.runs.delete(params);
  });
});
