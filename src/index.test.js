import React from 'react'
import ReactDOM from 'react-dom'
import checkPropTypes from 'check-prop-types'
import HeaderLayout from '.'
import Toolbar from 'material-ui/Divider'
import Enzyme from 'enzyme'
import { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<HeaderLayout title={'Hello World'} />, div)
})

it('when required props are not present, it shows an error', () => {
  const wrapper = shallow(<HeaderLayout classes={{}} />)
  expect(wrapper.prop('classes')).toBeDefined()
})

it('should render with Toolbar component', () => {
  const wrapper = shallow(<HeaderLayout />);
  expect(render(wrapper).find(<Toolbar />)).toBeTruthy()
})