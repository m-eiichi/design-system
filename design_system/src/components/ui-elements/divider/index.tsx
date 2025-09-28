import { CoreComponent } from "../core-component";
import styles from "./styles.module.css";

import { DividerProps } from './types';



export const Divider = ({ className, ...props }: DividerProps) => {
  return (
    <CoreComponent className={className} {...props}>
      Dividerコンポーネント
    </CoreComponent>
  );
};

