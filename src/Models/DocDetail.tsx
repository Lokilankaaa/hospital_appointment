import {ClassNameMap} from "@material-ui/styles/withStyles";
import {timesForm} from "./ResponseForm";

export interface detailProps {
    classes: ClassNameMap,
    tid: number,
    did: string,
    docName: string,
    docTitle: string,
    fee: number,
    docImg: string,
    gender: boolean,
    isam: boolean,
    capacity: number,
    rest: number
}

export interface detailPageProps {
    classes: ClassNameMap,
    cardClasses: ClassNameMap,
    headerClasses: ClassNameMap
}
