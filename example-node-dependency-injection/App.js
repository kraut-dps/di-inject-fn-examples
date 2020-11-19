import { App as AppOrigin } from '../classesJs/App.js';

export class App extends AppOrigin {
	constructor ( oContainer ) {
		super(
			() => {
				return oContainer.get( 'Storage' )
			},
			( iDate ) => {
				const Date = oContainer.getParameter( 'Date' );
				const oConfig = oContainer.getParameter( 'oConfig' );
				const oDate = new Date( iDate );
				oDate.sLocale = oConfig.sDateLocale;
				oDate.oOptions = oConfig.oDateOptions;
				return oDate;
			}
		);
	}
}