import { CustoMenuItem } from "src/app/models/CustomMenuItem";

export const menuItems: CustoMenuItem[] = [
  {
    label: 'Inicio',
    icon: 'pi pi-fw pi-home',
    routerLink: '/'
  },
  {
    label: 'Usuarios',
    icon: 'pi pi-fw pi-users',
    routerLink: '/admin/users',
    roles: ['SUPERADMIN', 'USER_ADMIN']
  },
  {
    label: 'Productos',
    icon: 'pi pi-fw pi-shopping-bag',
    routerLink: '/admin/products',
    roles: ['SUPERADMIN', 'STORE_MANAGER']
  },
  {
    label: 'Órdenes',
    icon: 'pi pi-fw pi-shopping-bag',
    routerLink: '/admin/orders',
    roles: ['SUPERADMIN', 'STORE_MANAGER']
  },
  {
    label: 'Carrito',
    icon: 'pi pi-fw pi-shopping-cart',
    routerLink: '/cart'
  }
];