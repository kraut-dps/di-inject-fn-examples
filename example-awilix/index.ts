import {createContainer, InjectionMode, asFunction} from "awilix";
import "reflect-metadata";

import {IApp, ICase} from '../classesBase/interfaces';

import {fnCases} from "../cases.js";

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "../classesTs/Date";
import {DateCustom} from "../classesTs/DateCustom";
import {Storage} from "../classesTs/Storage";
import {StorageCustom} from "../classesTs/StorageCustom";
import {App} from "../classesTs/App";

const fnBuildApp = ( { oConfig, Date, Storage, App }: ICase ) => {

    const oContainer = createContainer({
        injectionMode: InjectionMode.PROXY
    } );
    oContainer.register({
        newApp: asFunction( ( { oneStorage, newDate } ) => {
            return new App( oneStorage, newDate );
        } ),
        newDate: asFunction( ( iDate: number ) => {
            const oDate = new Date( iDate );
            oDate.sLocale = oConfig.sDateLocale;
            oDate.oOptions = oConfig.oDateOptions;
            return oDate;
        } ),
        oneStorage: asFunction( () => {
            return new Storage( oConfig.sStorageConnect );
        } ).singleton()
    } );

    const fnNewApp: () => IApp = oContainer.resolve( 'newApp' );
    return fnNewApp();
}


fnCases( fnBuildApp, { oConfig, oConfigCustom, Date, DateCustom, Storage, StorageCustom, App } );