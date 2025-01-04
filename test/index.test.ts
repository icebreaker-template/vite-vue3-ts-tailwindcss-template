import HelloWorld from '@/components/HelloWorld.vue'
import { mount } from '@vue/test-utils'

describe('helloWorld', () => {
  it('displays message', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: '你我皆是牛马',
      },
    })

    expect(wrapper.text()).toContain('你我皆是牛马')
  })

  it('modelValue should be updated', async () => {
    const initialText = 'initialText'
    const wrapper = mount(HelloWorld, {
      props: {
        'modelValue': initialText,
        'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
      },
    })
    expect(wrapper.find('input').element.value).toBe(initialText)
    await wrapper.find('input').setValue('test')
    expect(wrapper.props('modelValue')).toBe('test')
  })
})
