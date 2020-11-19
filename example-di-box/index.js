import {Box} from "di-box";

import {AppBase} from "../classesBase/AppBase.js";

import {DateBase} from "../classesBase/DateBase.js";
import {DateCustomBase} from "../classesBase/DateCustomBase.js";

import {StorageBase} from "../classesBase/StorageBase.js";
import {StorageCustomBase} from "../classesBase/StorageCustomBase.js";

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";

import {fnCases} from "../cases.js";


const fnConfigDi = () => {
	class AppBox extends Box {
		App;
		Date;
		Storage;
		oConfig;

		newApp() {
			const oApp = new this.App();
			oApp.newDate = this.newDate;
			oApp.oneStorage = this.oneStorage;
			return oApp;
		}

		newStorage() {
			return new this.Storage(
				this.oConfig.sStorageConnect
			);
		}

		oneStorage() {
			return this.one( this.newStorage );
		}

		newDate( iDate ) {
			const oDate = new this.Date( iDate );
			oDate.sLocale = this.oConfig.sDateLocale;
			oDate.oOptions = this.oConfig.oDateOptions;
			return oDate;
		}
	}
	return new AppBox();
};

const oBox = fnConfigDi();

const fnBuildApp = ( { oConfig, App, Date, Storage } ) => {
	oBox.oConfig = oConfig;
	oBox.Date = Date;
	oBox.Storage = Storage;
	oBox.App = App;
	return oBox.newApp();
}

fnCases( fnBuildApp, { oConfig, oConfigCustom, Date: DateBase, DateCustom: DateCustomBase, Storage: StorageBase, StorageCustom: StorageCustomBase, App: AppBase } );