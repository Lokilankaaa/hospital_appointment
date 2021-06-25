import {ClassNameMap} from "@material-ui/styles/withStyles";
import {timesForm} from "./ResponseForm";

export interface detailProps {
    classes: ClassNameMap,
    did: string,
    docName: string,
    docTitle: string,
    fee: number,
    docImg: string,
    times: Array<timesForm>,
    gender: boolean,
}

export interface detailPageProps {
    classes: ClassNameMap,
    cardClasses: ClassNameMap,
    headerClasses: ClassNameMap
}
