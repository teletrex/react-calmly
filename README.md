# react-calmly

> TeleTrex Component React Library

[![NPM](https://img.shields.io/npm/v/react-calmly.svg)](https://www.npmjs.com/package/react-calmly) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @react-calmly/components
```
or
```bash
yarn add @react-calmly/components
```

## Usage

```jsx
import React, { Component } from 'react'

import {magictable} from '@react-calmly/components'


class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

In your styles.scss, include this line
```css
import '~@react-calmly/components/lib/styles.css';
```

## Components

There is a storybook with documentation of some of the components at [https://louisroehrs.com/react-calmly

Look here first for components and if you don't find what you need, then check out the Carbon Design System https://carbondesignssystem.com.

The magictable is a wonderful commercial table system for React.
MultiSelectComboBox and CheckboxTree are other favorites.

(Not all components are listed yet and we are working on documentation for the rest of the components.)

## License

Copyright 2022 Louis F. Roehrs. All Rights Reserved. © [louisroehrs](https://github.com/louisroehrs)

## Library Developers

We have storybook support for the library.

To get started, in one tab, run:
$ cd react-calmly && yarn start


Do include PropType and defaults with each component.
Then include a <YourComponent>.story.jsx to show off your component.
