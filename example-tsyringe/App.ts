import {inject, injectable} from "tsyringe";
import {IDate, IStorage} from "../classesBase/interfaces";
import {App as AppOrigin} from "../classesTs/App";

@injectable()
export class App extends AppOrigin{
	constructor(
		@inject("oneStorage") public oneStorage: () => IStorage,
		@inject("newDate") public newDate: ( iDate: number ) => IDate
	) {
		super( oneStorage, newDate );
	}
}