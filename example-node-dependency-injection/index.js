import {ContainerBuilder, Definition} from 'node-dependency-injection';

import oConfig from "../classesBase/configBase.js";
import oConfigCustom from "../classesBase/configCustom.js";

import {Date} from "../classesJs/Date.js";
import {DateCustom} from "../classesJs/DateCustom.js";

import {Storage} from "../classesJs/Storage.js";
import {StorageCustom} from "../classesJs/StorageCustom.js";

import {App} from "./App.js";

import {fnCases} from "../cases.js";

const fnBuildApp = ( { oConfig, App, Date, Storage } ) => {
	const oContainer = new ContainerBuilder();

	oContainer.setParameter( 'oConfig', oConfig);

	// тут происходит ошибка
	oContainer.setParameter( 'Date', Date);

	const oStorageDefinition = new Definition( Storage );
	oStorageDefinition.addArgument( oConfig.sStorageConnect );
	oContainer.register('Storage', oStorageDefinition );

	const oAppDefinition = new Definition( App )
	oAppDefinition.addArgument( oContainer );
	oContainer.setDefinition('App', oAppDefinition);

	return oContainer.get( 'App' );
}

fnCases( fnBuildApp, { oConfig, oConfigCustom, Date, DateCustom, Storage, StorageCustom, App } );