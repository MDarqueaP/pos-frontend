import { MenuItem } from "primeng/api";

export interface CustoMenuItem extends MenuItem {
  roles?: string[];
}