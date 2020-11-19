import {Service, Inject} from "typedi";
import {App as AppOrigin} from "../classesTs/App";
import {IDate, IStorage} from "../classesBase/interfaces";

//неудачный вариант
@Service( 'App' )
export class App extends AppOrigin{
	constructor( @Inject( 'oneStorage' ) oneStorage: () => IStorage, @Inject( 'newDate' ) newDate: ( iDate: number ) => IDate ) {
		super( oneStorage, newDate );
	}
}

/*const App = Service(
	[oDeps],
	(oAppDeps) => {
		return new App( oAppDeps.oneStorage, oAppDeps.newDate );
	}
);*/