import {IocContext, inject, classInfo, injectable} from 'power-di';

import {
	ICase, IConfig, IDate, IDateInit, IStorage,
} from "../classesBase/interfaces";

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";

import {Date} from "../classesTs/Date";
import {DateCustom} from "../classesTs/DateCustom";

import {Storage} from "../classesTs/Storage";
import {StorageCustom} from "../classesTs/StorageCustom";

import {App} from "./App";

import {fnCases} from "../cases.js";
import {Container, interfaces} from "inversify";

const fnConfigDi = () => {
	const oContext = new IocContext();

	oContext.register(
		( iDate: number ) => {
			const Date = oContext.get( 'Date' );
			const oConfig = oContext.get( 'oConfig' );
			const oDate = new Date( iDate );
			oDate.sLocale = oConfig.sDateLocale;
			oDate.oOptions = oConfig.oDateOptions;
			return oDate;
		},
		'newDate',
		{ autoNew: false }
	);
	oContext.register(
		() => {
			// конечно костыли, но что-то совсем не очевидно как сделать правильно
			if( !oContext.has( 'oStorage' ) ) {
				const Storage = oContext.get( 'Storage' );
				const oConfig = oContext.get( 'oConfig' );
				const oStorage = new Storage( oConfig.sStorageConnect );
				oContext.register(
					oStorage,
					'oStorage',
					{ autoNew: false }
				);
			}
			return oContext.get( 'oStorage' );
		},
		'oneStorage',
		{ autoNew: false, singleton: true }
	);
	return oContext;
}


const fnBuildApp = ( { oConfig, App, Date, Storage }: ICase ) => {

	const oContext = fnConfigDi();

	oContext.register(
		App,
		'App'
	);
	oContext.register(
		oConfig,
		'oConfig',
		{ autoNew: false }
	);
	oContext.register(
		Date,
		'Date',
		{ autoNew: false }
	);

	oContext.register(
		Storage,
		'Storage',
		{ autoNew: false }
	);

	return oContext.get( 'App' );
}

fnCases( fnBuildApp, { oConfig, oConfigCustom, Date, DateCustom, Storage, StorageCustom, App } );