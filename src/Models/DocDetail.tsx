import {ClassNameMap} from "@material-ui/styles/withStyles";

export interface detailProps {
    classes: ClassNameMap
    docName: string,
    docTitle: string,
    remaining: number,
    fee: number,
    docImg: string
}

export interface detailPageProps {
    classes: ClassNameMap,
    cardClasses: ClassNameMap
}
