/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */

const utils = require('./utils');

const emptyLine = {
  type: 'ExpressionStatement',
  expression: {
    type: 'Identifier',
    name: '\n',
  },
};

const headComment = `${utils.generatedWarningComment}\n`;
const tailComment = `\n${utils.generatedWarningComment}`;

const disableSortPropsNoChildren =
  '\n/* eslint-disable react/jsx-sort-props, react/no-children-prop */\n';
const enableSortPropsNoChildren =
  '/* eslint-enable react/jsx-sort-props, react/no-children-prop */\n\n';

function template({ template }, opts, { imports, componentName, props, jsx }) {
  const plugins = ['jsx', '@babel/preset-env', '@babel/preset-react'];
  const templateSmart = template.smart({ plugins, preserveComments: true });

  const filename = opts.state.filePath;

  const { name, size, width, height } = utils.parseFilename(filename);
  const jsxComponentName = { type: 'JSXIdentifier', name: componentName.name };

  return templateSmart.ast`
    ${headComment}
    ${imports}
    import PropTypes from 'prop-types';
    import { SVGUniqueID } from 'react-svg-unique-id'
    ${emptyLine}
    import { getSVGSizeProps } from '../../components/svg-components/utils';
    ${disableSortPropsNoChildren}
    const ${componentName} = (${props}) => 
      <SVGUniqueID children={${jsx}}/>;
    ${enableSortPropsNoChildren}
    export const ${name} = ({ size, height, width, ...props }) => (
      <${jsxComponentName} {...getSVGSizeProps(size, height, width)} {...props}/>
    );
    ${emptyLine}
    ${name}.propTypes = {
      height: PropTypes.number,
      size: PropTypes.number,
      width: PropTypes.number,
    };
    ${emptyLine}
    ${name}.defaultProps = {
      height: ${String(height)},
      size: ${String(size)},
      width: ${String(width)}
    };
    ${tailComment}
`;
}
module.exports = template;
