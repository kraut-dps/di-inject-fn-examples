import "reflect-metadata";
import {container} from 'tsyringe';
import {
	IConfig,
	ICase,
	IDateConstructor,
	IStorageConstructor,
	IApp,
	IDate,
	IStorage
} from '../classesBase/interfaces';

import {fnCases} from "../cases.js";

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "../classesTs/Date";
import {DateCustom} from "../classesTs/DateCustom";
import {Storage} from "../classesTs/Storage";
import {StorageCustom} from "../classesTs/StorageCustom";
import {App} from "./App";

const fnConfig = () => {
	container.register<( iDate: number ) => IDate>( "newDate", {
		useValue: ( iDate: number ) => {
			const oConfig = container.resolve<IConfig>( 'oConfig' );
			const Date = container.resolve<IDateConstructor>( 'Date' );
			const oDate = new Date( iDate );
			oDate.sLocale = oConfig.sDateLocale;
			oDate.oOptions = oConfig.oDateOptions;
			return oDate;
		}
	} );
	container.register<() => IStorage>( "oneStorage", {
		useValue: () => {
			const oConfig = container.resolve<IConfig>( 'oConfig' );
			const Storage = container.resolve<IStorageConstructor>( 'Storage' );
			return new Storage( oConfig.sStorageConnect );
		}
	} );
	return container;
};

const fnBuildApp = ( { oConfig, Date, Storage, App }: ICase ) => {

	const oContainer = fnConfig();

	oContainer.register<IConfig>( "oConfig", {useValue: oConfig} );
	oContainer.register<IDateConstructor>( "Date", {useValue: Date} );
	oContainer.register<IStorageConstructor>( "Storage", {useValue: Storage} );
	oContainer.register<IApp>( "App", {useClass: App} );

	return container.resolve<IApp>( "App" );
}

fnCases( fnBuildApp, {oConfig, oConfigCustom, Date, DateCustom, Storage, StorageCustom, App } );

