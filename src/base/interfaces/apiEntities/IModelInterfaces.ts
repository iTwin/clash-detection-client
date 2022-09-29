/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** Property. */
export interface Property {
  /** The name of the property. */
  name: string;
  /** The label of the property. */
  label: string;
}

/** Aspect. */
export interface Aspect {
  /** The name of the aspect. */
  name: string;
  /** The label of the aspect. */
  label: string;
}

/** Type definition. */
export interface TypeDefinition {
  /** The name of the type definition. */
  name: string;
  /** The label of the type definition. */
  label: string;
}

/** Entity class. */
export interface EntityClass {
  /** The name of the entity class. */
  name: string;
  /** The label of the entity class. */
  label: string;
  /* Array of properties in the entity class */
  properties: Property[];
  /* Array of aspects in the entity class */
  aspects: Aspect[];
  /* Array of type definitions in the entity class */
  typeDefinitions: TypeDefinition[];
}

/** Schema. */
export interface Schema {
  /** The name of the schema. */
  name: string;
  /** The label of the schema. */
  label: string;
  /* Array of entity classes in schema */
  entityClass: EntityClass[];
}

/** Extracted schema info. */
export interface SchemaInfo {
  /** The status of the schema info extraction. One of 'available', 'unavailable'. */
  status: string;
  /* Array of schemas in iModel */
  schema: Schema[];
}

/** Get Schema Info API response. */
export interface ResponseFromGetSchemaInfo {
  schemaInfo: SchemaInfo;
}

/** Model. */
export interface Model {
  /** The id of the model. */
  id: string;
  /** The name of the model. */
  displayName: string;
}

/** Category. */
export interface Category {
  /** The id of the category. */
  id: string;
  /** The name of the category. */
  displayName: string;
}

/** Extracted models and categories. */
export interface ModelsAndCategories {
  /** The status of the models and categories extraction. One of 'available', 'unavailable'. */
  status: string;
  /* Array of models in iModel */
  models: Model[];
  /* Array of categories in iModel */
  categories: Category[];
}

/** Get Models and Categories API response. */
export interface ResponseFromGetModelsAndCategories {
  modelsAndCategories: ModelsAndCategories;
}
