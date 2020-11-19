import {inject, injectable} from "power-di";
import {App as AppOrigin} from "../classesTs/App";
import {IDate, IStorage} from "../classesBase/interfaces";

@injectable()
export class App extends AppOrigin{

	@inject({ type: 'oneStorage' } )
	protected oneStorage: () => IStorage;

	@inject({ type: 'newDate' } )
	protected newDate: () => IDate;
}