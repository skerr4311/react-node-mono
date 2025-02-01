/* tslint:disable */
/* eslint-disable */
/**
 * Patient Management API
 * API for managing patient profiles
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PatientContactInfo
 */
export interface PatientContactInfo {
    /**
     * 
     * @type {string}
     * @memberof PatientContactInfo
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof PatientContactInfo
     */
    phone: string;
}

export function PatientContactInfoFromJSON(json: any): PatientContactInfo {
    return PatientContactInfoFromJSONTyped(json, false);
}

export function PatientContactInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatientContactInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'phone': json['phone'],
    };
}

export function PatientContactInfoToJSON(value?: PatientContactInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'phone': value.phone,
    };
}

