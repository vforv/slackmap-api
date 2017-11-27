/**
 * UI config
 *
 */
export interface ConfigModel {
  /**
   * domain this app is running
   */

  domain: string;

  /**
   * facebook SlackMap id
   */
  facebook_app_id?: string;

  /**
   * @uniqueItems
   */
  facebook_scope?: string[];
}
