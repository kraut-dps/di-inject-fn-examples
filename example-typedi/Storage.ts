import {Service} from "typedi";
import {Storage as StorageOrigin} from "../classesTs/Storage";

@Service()
export class Storage extends StorageOrigin{
}