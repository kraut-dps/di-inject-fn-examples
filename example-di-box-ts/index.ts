import {Box} from "di-box";

import {IAppConstructor, IDateConstructor, IStorageConstructor, IConfig, ICase} from "../classesBase/interfaces";

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";

import {Date} from "../classesTs/Date";
import {DateCustom} from "../classesTs/DateCustom";

import {Storage} from "../classesTs/Storage";
import {StorageCustom} from "../classesTs/StorageCustom";

import {App} from "../classesTs/App";

import {fnCases} from "../cases.js";

const fnConfigDi = () => {

	class AppBox extends Box {
		constructor(
			public App: IAppConstructor,
			public Date: IDateConstructor,
			public Storage: IStorageConstructor,
			public oConfig: IConfig
		) {
			super();
		}

		newApp() {
			return new this.App(
				this.oneStorage,
				this.newDate
			);
		}

		newStorage() {
			return new this.Storage(
				this.oConfig.sStorageConnect
			);
		}

		oneStorage() {
			return this.one( this.newStorage );
		}

		newDate( iDate: number ) {
			const oDate = new this.Date( iDate );
			oDate.sLocale = this.oConfig.sDateLocale;
			oDate.oOptions = this.oConfig.oDateOptions;
			return oDate;
		}
	}

	return AppBox;
}

const AppBox = fnConfigDi();

const fnBuildApp = ( { oConfig, Date, Storage, App }: ICase ) => {

	const oBox = new AppBox(
		App, Date, Storage, oConfig
	);
	return oBox.newApp();
}

fnCases( fnBuildApp, { oConfig, oConfigCustom, Date, DateCustom, Storage, StorageCustom, App } );