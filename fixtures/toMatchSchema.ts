//fixture
import { expect as baseExpect, mergeExpects } from '@playwright/test'
export { test } from '@playwright/test'

/**
 * @typedef {import('@playwright/test').Expect<void>} Expect
 */

/**
 * @typedef {Expect & {
 *   toMatchSchema(schema: object): Promise<{message: () => string, pass: boolean}>;
 * }} CustomExpect
 */
const toMatchSchema = {
  /**
   * Custom matcher to check if a JSON object matches a given schema.
   *
   * @param {object} json - The JSON object to validate against the schema.
   * @param {object} schema - The schema to validate the JSON object against. This should be a Zod schema.
   * @returns {Promise<{message: () => string, pass: boolean}>} - The result of the validation. If the validation passes, `pass` is true. Otherwise, `pass` is false and an error message is provided.
   *
   * @example
   * const schema = z.object({
   *   name: z.string(),
   *   age: z.number(),
   * });
   * await expect(json).toMatchSchema(schema);
   */
  async toMatchSchema(json, schema) {
    const result = await schema.safeParseAsync(json)
    if (result.success) {
      return {
        message: () => 'success',
        pass: true
      }
    } else {
      return {
        message: () => 'Result not matching schema ' + result.error.issues.map(e => e.message).join('\n') + '\n' + 'Details: ' + JSON.stringify(result.error, null, 2),
        pass: false
      }
    }
  }
}
// eslint-disable-next-line playwright/require-soft-assertions
export const expect = mergeExpects(baseExpect.extend(toMatchSchema))
