/* 
 @Role : define app routes to be affected by auth guard,
         modify for only new routes or route renaming
*/


const AdminRoutes = [
  "/admin/restaurants",
  "/admin/managers"
];

const ManagerRoutes = [
  "/manager/waiters",
  "/manager/clerks",
  "/manager/chefs"
]

const Routes = {
  AdminRoutes,
  ManagerRoutes
};

Object.freeze(Routes);

export { Routes };
