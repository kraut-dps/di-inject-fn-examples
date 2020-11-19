import {interfaces, Container} from "inversify";
import "reflect-metadata";

import {fnCases} from "../cases.js";

import {IDate, IStorage, IApp, ICase, IConfig, IDateInit} from '../classesBase/interfaces';

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";
import {Date} from "./Date";
import {DateCustom} from "./DateCustom";
import {Storage} from "./Storage";
import {StorageCustom} from "./StorageCustom";
import {App} from "./App";

const fnConfigDi = () => {

	const oContainer = new Container();
	oContainer.bind<interfaces.Factory<IDate>>( "newDate" )
		.toFactory<IDate>( ( context: interfaces.Context ) => {
			return ( iDate ) => {
				const Date = context.container.get<interfaces.Newable<IDateInit>>( "Newable<IDateInit>" );
				const oDate = new Date( iDate );
				const oConfig = context.container.get<IConfig>( "oConfig" );
				oDate.sLocale = oConfig.sDateLocale;
				oDate.oOptions = oConfig.oDateOptions;
				return oDate;
			};
		} );

	oContainer.bind<interfaces.Factory<IStorage>>( "oneStorage" )
		.toFactory<IStorage>( ( oContext: interfaces.Context ) => {
			return () => {
				return oContext.container.get<IStorage>( "Storage" );
			};
		} );

	oContainer.bind<IStorage>( "Storage" )
		.toDynamicValue( ( context: interfaces.Context ) => {
			const oConfig = context.container.get<IConfig>( "oConfig" );
			const Storage = context.container.get<interfaces.Newable<IStorage>>( "Newable<IStorage>" );
			return new Storage( oConfig.sStorageConnect );
		} );

	return oContainer;
}


const fnBuildApp = ( { oConfig, Date, Storage, App }: ICase ) => {

	const oContainer = fnConfigDi();

	oContainer.bind<IConfig>( "oConfig" )
		.toConstantValue( oConfig );

	oContainer.bind<interfaces.Newable<IDateInit>>( "Newable<IDateInit>" )
		.toConstructor<IDateInit>( Date );

	oContainer.bind<interfaces.Newable<IStorage>>( "Newable<IStorage>" )
		.toConstructor<IStorage>( Storage );

	oContainer.bind<IApp>( "App" ).to( App );

	return oContainer.get<IApp>( "App" );
}

fnCases( fnBuildApp, {oConfig, oConfigCustom, Date, DateCustom, Storage, StorageCustom, App} );