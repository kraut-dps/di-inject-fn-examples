import {Injectable, Injector} from "injection-js";
import {App as AppOrigin} from "../classesTs/App";

@Injectable()
export class App extends AppOrigin {
  public constructor( oInjector: Injector ) {
    const oneStorage = () => oInjector.get( 'oneStorage' );
    const newDate = () => oInjector.get( 'newDate' );
    super( oneStorage, newDate );
  }
}