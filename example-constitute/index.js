import { Value, Container, Method } from 'constitute';

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";

import {Date} from "../classesJs/Date.js";
import {DateCustom} from "../classesJs/DateCustom.js";

import {Storage} from "../classesJs/Storage.js";
import {StorageCustom} from "../classesJs/StorageCustom.js";

import {App} from "../classesJs/App.js";

import {fnCases} from "../cases.js";


const fnBuildApp = ( { oConfig, App, Date, Storage } ) => {


	const fnNewDate = new Value( ( iDate ) => {
		const oDate = new Date( iDate );
		oDate.sLocale = oConfig.sDateLocale;
		oDate.oOptions = oConfig.oDateOptions;
		return oDate;
	} );

	const fnNewStorage = new Value( () => {
		return new Storage( oConfig.sStorageConnect );
	} );

	class AppConstitute extends App {
		static constitute () { return [ fnNewStorage, fnNewDate ] }
	}

	const oContainer = new Container()
	return oContainer.constitute( AppConstitute );
}

fnCases( fnBuildApp, { oConfig, oConfigCustom, Date, DateCustom, Storage, StorageCustom, App } );