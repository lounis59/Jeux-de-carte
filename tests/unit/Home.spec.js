import HomeView from "@/views/HomeView.vue";
import { mount } from "@vue/test-utils";


describe('Home.view', () => {
  it('Should display button to play', async () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('form')).exists().toBe('false')
    await wrapper.find('.btn').trigger('click')
    expect(wrapper.find('form')).exists().toBe('true')
    expect(wrapper.find('.btn')).exists().toBe('false')

    // const input = wrapper.find('input')
    // await input.setValue('filippe')
    // await wrapper.find('button').trigger('click')
    // const form = wrapper.find('form')

    // expect(form.get()).toBe('filippe')



  })
})