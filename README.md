# Redefined Header Layout

This React Component allows you handle your components within a layout with a toolbar and a content.

This component makes use of [Material UI Components](https://github.com/mui-org/material-ui).

## Installation

To install this Component, run `yarn add @reactjspain/headerLayout` or `npm install @reactjspain/headerLayout`.

## Usage

To use the component, In your react Application just do

```javascript
import React from 'react'
import HeaderLayout from '@reactjspain/headerLayout'

const MyComponent = props => {

  return (
    <HeaderLayout title="Hello World!">
      {'Hello World!'}
    </HeaderLayout>
  )

}

export default MyComponent
```

You can also provide additional configuration like:

```javascript
    <HeaderLayout
      title="Hello World!"
      loading
      operations={[
        {id:'menu', icon:MenuIcon, onClick:() => window.alert('Hello World!')},
        {id:'account', image:'http://reactjspain.com/favicon.ico', right: true, small:true, to:'/account'},
        {id:'check', description:'Save', icon:Check, right:true}
      ]}
    >
      {'Hello World!'}
    </HeaderLayout>
```