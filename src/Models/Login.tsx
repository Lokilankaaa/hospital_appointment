import { ClassNameMap, Styles, WithStylesOptions } from '@material-ui/styles/withStyles';
interface LoginProps {
    classes: ClassNameMap;
    identity: string;
}

interface SignUpProps {
    classes: ClassNameMap;
}

export type { LoginProps, SignUpProps }