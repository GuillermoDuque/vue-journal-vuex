import daybookRouter from "@/modules/daybook/router";

describe("Pruebas en el router module del Daybook", () => {
  test("el router debe de tener esta configuración", async() => {
    expect(daybookRouter).toMatchObject({
      name: "daybook",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function)
        }
      ]
    });


    const promiseRoutes = []
    daybookRouter.children.forEach( child => promiseRoutes.push( child.component() ))

    const routes = (await Promise.all(promiseRoutes)).map(r => r.default.name)

    expect(routes).toContain('NoEntrySelected')
    expect(routes).toContain('EntryView')
  });
});
