import FabButton from "@/modules/daybook/components/FabButton.vue";
import { shallowMount } from "@vue/test-utils";

describe("Pruebas en el FabButton components", () => {
  test("debe de mostrar el ícono por defecto", () => {
    const wrapper = shallowMount(FabButton);
    const iTag = wrapper.find("i");

    expect(iTag.classes("fa-plus")).toBeTruthy();
  });

  test("debe de mostrar el ícono por argumento: fa-circle", () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        icon: "fa-circle",
      },
    });

    const iTag = wrapper.find("i");

    expect(iTag.classes("fa-circle")).toBeTruthy();
  });

  test("debe de emitir el evento on:click cuando se hace click", () => {});
const wrapper = shallowMount(FabButton)

wrapper.find('button').trigger('click')

expect(wrapper.emitted('on:click')).toHaveLength(1 )
  
});
