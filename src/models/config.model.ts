/**
 * UI config
 * 
 */
export interface ConfigModel {
    /**
     * domain this app is running
     * 
     * @minLength 5
     * @maxLength 10
     */
    
    domain: string;

    /**
     * @isInt
     * @minimum2 1
     * @maximum 100
     */
    facebook_app_id?: number;
    /**
     * @isFloat Invalid float error message.
     */
    facebook_app_id2?: number;
    /**
     * @maxItems 5
     * @uniqueItems
     */
    facebook_scope?: string[]

    sub?: ConfigModel
}