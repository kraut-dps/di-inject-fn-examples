import 'reflect-metadata';
import { ReflectiveInjector } from 'injection-js';

import {
	IConfig,
	ICase,
	IDateConstructor,
	IStorageConstructor,
} from '../classesBase/interfaces';

import {fnCases} from "../cases.js";

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "../classesTs/Date";
import {DateCustom} from "../classesTs/DateCustom";
import {Storage} from "../classesTs/Storage";
import {StorageCustom} from "../classesTs/StorageCustom";
import {App} from "./App";

const fnConfigDi = () => {
	return [
		{
			provide: 'newDate',
			useFactory: ( Date: IDateConstructor, oConfig: IConfig ) => {

				// как тут передать в Date аргумент не понятно
				const oDate = new Date( 0 );
				oDate.sLocale = oConfig.sDateLocale;
				oDate.oOptions = oConfig.oDateOptions;
				return oDate;
			},
			deps: [ 'Date', 'oConfig']
		},
		{
			provide: 'oneStorage',
			useFactory: ( Storage: IStorageConstructor, oConfig: IConfig ) => {
				return new Storage( oConfig.sStorageConnect );
			},
			deps: [ 'Storage', 'oConfig' ]
		},
	];
}

const aProviders = fnConfigDi();

const fnBuildApp = ( { oConfig, Date, Storage, App }: ICase ) => {

	const oChildInjector = ReflectiveInjector.resolveAndCreate(
		[
			...aProviders,
			...[
				{ provide: 'oConfig', useValue: oConfig },
				{ provide: 'Date', useValue: Date },
				{ provide: 'Storage', useValue: Storage },
				{ provide: 'App', useClass: App },
			]
		]
	);
	return oChildInjector.get( 'App' );
}

fnCases( fnBuildApp, { oConfig, oConfigCustom, Date, DateCustom, Storage, StorageCustom, App } );