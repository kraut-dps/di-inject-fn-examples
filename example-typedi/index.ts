import {Container, Inject, Service} from "typedi";
import "reflect-metadata";
import {IDate, IStorage, IApp, IConfig, ICase} from '../classesBase/interfaces';

import {fnCases} from "../cases.js";

import {App} from "./App";
import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "../classesTs/Date";
import {DateCustom} from "../classesTs/DateCustom";
import {Storage} from "../classesTs/Storage";
import {StorageCustom} from "../classesTs/StorageCustom";


const fnBuildApp = ( { oConfig, Date, Storage, App }: ICase ) => {

    /*const newDate = Service(
        'newDate',
        () => {
            return new Date();
        }
    );

    const oneStorage = Service(
        'oneStorage'
        () => {
            return new Storage();
        }
    );


    const AppService = Service(
        [oneStorage, newDate],
        ( oneStorage, newDate) => {
            return new App( oneStorage, newDate );
        }
    );*/


    /*Container.set( [
        {
            id: 'oneStorage',
            value: () => {
                return new Storage();
            }
        },
        {
            id: 'newDate',
            value: () => {
                return new Date();
            }
        }
    ] );*/

    //return Container.get<IApp>(AppService);

    return new App();
}


fnCases( fnBuildApp, { oConfig, oConfigCustom, App, Date, DateCustom, Storage, StorageCustom } );

