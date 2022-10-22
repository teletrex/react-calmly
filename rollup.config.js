import path from 'path';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import image from '@rollup/plugin-image';
import copy from 'rollup-plugin-copy';
import autoprefixer from 'autoprefixer';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import sass from 'rollup-plugin-sass';
import postcss from 'postcss';
import scssImporter from 'node-sass-magic-importer';
import dartSass from 'sass';
import postCssReplace from 'postcss-replace';
import postCssDuplicates from 'postcss-discard-duplicates';
import json from '@rollup/plugin-json'; // eslint-disable-line import/no-unresolved

const env = process.env.NODE_ENV || 'development';
const prodSettings = env === 'development' ? [] : [uglify(), filesize()];

const getComponentConfiguration = componentName => ({
  src: [`src/components/${componentName}/_${componentName}.scss`],
  dest: `lib/scss/components/${componentName}`,
});

const carbonComponentsMapper = componentName => ({
  src: [`node_modules/@carbon/react/scss/components/${componentName}/**`],
  dest: `lib/scss/components/${componentName}`,
});

export default {
  input: 'src/umdIndex.js',
  output: {
    file: 'lib/index.js',
    name: 'ReactCalmly',
    format: 'umd',
    sourcemap: true,
    sourcemapFile: 'lib/index.js.map',
    globals: {
      '@carbon/react':'@carbon/react',
      '@carbon/react-icons':'@carbon/react-icons',
      '@carbon/react/charts':'@carbon/react/charts',
      '@carbon/react/lib/internal/keyboard':'@carbon/react/lib/internal/keyboard',
      '@carbon/styles':'@carbon/styles',
      classnames: 'classNames',
      'prop-types': 'PropTypes',
      react: 'React',
      'react-is':'react-is',
      'react-dom': 'ReactDOM',
      'styled-components': 'styled',
      d3: 'd3',
      recharts: 'recharts',
      '@nivo/heatmap': 'HeatMap',
      'venn.js': 'venn',
      formik: 'Formik',
      '@dnd-kit/core': '@dnd-kit/core',
      '@dnd-kit/sortable': '@dnd-kit/sortable',
      '@dnd-kit/utilities': '@dnd-kit/utilities',
    },
  },
  external: [
    'react',
    'react-dom',
    'styled-components',
    'prop-types',
    '@carbon/react',
    '@carbon/react-icons',
    '@carbon/react/charts',
    '@carbon/react/lib/internal/keyboard',
    '@carbon/styles',
    'd3',
    'recharts',
    '@nivo/heatmap',
    'venn.js',
    'formik',
    'yup',
    '@dnd-kit/core',
    '@dnd-kit/sortable',
    '@dnd-kit/utilities',
  ],
  plugins: [
    image(),
    resolve({ browser: true, extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'] }),
    sass({
      processor: css =>
        postcss([autoprefixer, postCssDuplicates])
          .use(
            /*
              Rewriting fonts paths to make them correct based on styles.css file directory
            */
            postCssReplace({
              pattern: /(teletrex-theme\/fonts\/(National_2|Tiempos_Fine))/gi,
              data: {
                'teletrex-theme/fonts/National_2': 'scss/teletrex-theme/fonts/National_2',
                'teletrex-theme/fonts/Tiempos_Fine': 'scss/teletrex-theme/fonts/Tiempos_Fine',
              },
            })
          )
          .process(css, {
            from: 'lib/styles.css',
          })
          .then(result => result.css),
      output: 'lib/styles.css',
      runtime: dartSass,
      options: {
        file: 'src/styles.scss',
        importer: scssImporter({ disableImportOnce: false }),
        includePaths: [path.resolve(__dirname, 'node_modules')],
        //outputStyle: 'compressed',// breaks things
      },
    }),

    copy({
      targets: [
        { src: 'src/styles.scss', dest: 'lib/scss' },
        { src: 'src/resources/translation/**', dest: 'lib/resources/translations' },
        /*
        {
          src: [
            // ---------------
            // Carbon Globals
            // ---------------
            // These are listed individually so that we can easily override
            // these with our own versions of these files.
            'node_modules/@carbon/styles/scss/styles.scss', // don't include Carbon's master sass file, we export our own
            'node_modules/@carbon/styles/scss/vendor',
            'node_modules/@carbon/styles/scss/_colors.scss',
            'node_modules/@carbon/styles/scss/_css--body.scss',
            'node_modules/@carbon/styles/scss/_css--font-face.scss',
            'node_modules/@carbon/styles/scss/_css--helpers.scss',
            'node_modules/@carbon/styles/scss/_css--reset.scss',
            'node_modules/@carbon/styles/scss/_deprecate.scss',
            'node_modules/@carbon/styles/scss/_feature-flags.scss',
            'node_modules/@carbon/styles/scss/_functions.scss',
            'node_modules/@carbon/styles/scss/_helper-classes.scss',
            'node_modules/@carbon/styles/scss/_helper-mixins.scss',
            'node_modules/@carbon/styles/scss/_import-once.scss',
            'node_modules/@carbon/styles/scss/_keyframes.scss',
            'node_modules/@carbon/styles/scss/_layer.scss',
            'node_modules/@carbon/styles/scss/_layout.scss',
            'node_modules/@carbon/styles/scss/_mixins.scss',
            'node_modules/@carbon/styles/scss/_motion.scss',
            'node_modules/@carbon/styles/scss/_spacing.scss',
            'node_modules/@carbon/styles/scss/_theme-tokens.scss',
            'node_modules/@carbon/styles/scss/_theme.scss',
            'node_modules/@carbon/styles/scss/_tooltip.scss',
            'node_modules/@carbon/styles/scss/_typography.scss',
            'node_modules/@carbon/styles/scss/_vars.scss',
          ],
          dest: 'lib/scss/globals/scss',
        },
        { src: 'node_modules/@carbon/styles/scss/grid', dest: 'lib/scss/globals' },
        ...[
          // ------------------------------
          // Carbon Components Proxy Styles
          // ------------------------------
          // These are listed individually so that we can easily override
          // these with our own versions of these files.
          'file-uploader',
          'checkbox',
          'combo-box',
          'radio-button',
          'toggle',
          'search',
          'select',
          'text-input',
          'text-area',
          'number-input',
          'form',
          'list',
          'data-table',
          'structured-list',
          'code-snippet',
          'overflow-menu',
          'content-switcher',
          'date-picker',
          'loading',
          'tooltip',
          'tag',
          'accordion',
          'progress-indicator',
          'toolbar',
          'time-picker',
          'slider',
          'tile',
          'skeleton',
          'inline-loading',
        ].map(carbonComponentsMapper),
        */
        {
          src: ['src/teletrex-theme'],
          dest: 'lib/scss',
        },
        {
          src: ['src/teletrex-theme/fonts'],
          dest: 'lib/scss/teletrex-theme/teletrex-theme',
        },
        ...[
          'accordion-item',
          'accordion',
          'action-toolbar',
          'actions',
          'add-category',
          'add-tags',
          'advanced-search-drop-down',
          'badge',
          'bi-level-percentile-indicator',
          'breadcrumb',
          'breadcrumbs-template',
          'button-skeleton',
          'button',
          'button-tooltip-wrapper',
          'category',
          'checkbox',
          'checkbox-tree',
          'code-block',
          'code-snippet',
          'column-filter',
          'combo-box',
          'combo-button',
          'commenting',
          'commenting-template',
          'common-number-input',
          'component-label',
          'configurable-action',
          'configurable-table',
          'configurable-table-toolbar',
          'content-switcher',
          'content-switcher',
          'color-picker',
          'copyable-text-list',
          'common-toggle',
          'common-link',
          'common-location',
          'common-reference',
          'common-text',
          'compare-modal',
          'data-table',
          'date',
          'date-picker',
          'detail-views',
          'detailViews',
          'drag-and-drop',
          'drag-and-drop-list',
          'dragAndDrop',
          'drop-spot',
          'dropdown',
          'dropSpot',
          'eleven-tooltip',
          'empty-states',
          'export',
          'file-uploader',
          'flow',
          'footer-template',
          'form',
          'form-group',
          'form-footer',
          'form-field-readonly',
          'formatted-text',
          'full-page-template',
          'grid-action-list',
          'heading',
          'horizontal-line',
          'hover-better-dropdown',
          'hover-popup',
          'icon-list',
          'inline-edit',
          'image-profile',
          'image-settings',
          'inline-loading',
          'inline-popup',
          'job-processing',
          'labeled-data',
          'link',
          'list-box',
          'list',
          'loading-bar-template',
          'loading-indicator',
          'magic-table',
          'maximizer',
          'media',
          'message-of-the-day',
          'mini-map-template',
          'modal',
          'multi-select',
          'multi-select-combo-box',
          'multi-step-modal',
          'multi-step',
          'multiple',
          'my-items',
          'not-found-page',
          'notification',
          'notifications-wrapper',
          'number-input',
          'common-options',
          'overflow-menu',
          'pager-control',
          'palette',
          'pagination-nav',
          'pagination',
          'pdf-viewer',
          'percentile-indicator',
          'play-controls',
          'preview-template',
          'progress-indicator',
          'radio-button',
          'rules-builder',
          'scroll-container',
          'search-drop-down',
          'search',
          'select',
          'select-editor',
          'side-bar-template',
          'side-nav',
          'sidebar-template',
          'slider',
          'sortable-list',
          'structured-list',
          'system-select-editor',
          'switch-icon',
          'table-pagination',
          'tabs',
          'tag',
          'text',
          'text-area',
          'text-input',
          'text-input-editor',
          'tile',
          'time-picker',
          'toggle-small',
          'toggle',
          'toolbar-action',
          'toolbar-search',
          'tooltip-wrapper',
          'tooltip',
          'tree-hierarchy',
          'tree-item',
          'tree-navigation',
          'ui-shell',
          'usage',
          'validation-messages',
          'value-indicator',
          'value-indicator-with-bar-charts',
          'venn-diagram',
          'versioning',
          'video-player',
          'text',
          'fiscal-calendar',
          'widget',
        ].map(getComponentConfiguration),
        {
          src: ['src/components/magic-table/flexible-column-header/_flexible-column-header.scss'],
          dest: 'lib/scss/components/magic-table/flexible-column-header',
        },
        {
          src: [
            'src/components/magic-table/editors/_system-select-editor.scss',
            'src/components/magic-table/editors/_select-editor.scss',
            'src/components/magic-table/editors/_text-input-editor.scss',
          ],
          dest: 'lib/scss/components/magic-table/editors',
        },
        {
          src: [
            'src/components/magic-table/table-text-input/_text-input.scss',
          ],
          dest: 'lib/scss/components/magic-table/table-text-input',
        },
        {
          src: ['src/components/ui-shell/_side-nav-menu.scss'],
          dest: 'lib/scss/components/ui-shell',
        },
        {
          src: ['src/components/ui-shell/profile/_profile.scss'],
          dest: 'lib/scss/components/ui-shell/profile',
        },
        {
          src: ['src/components/ui-shell/notifications-menu/_notifications-menu.scss'],
          dest: 'lib/scss/components/ui-shell/notifications-menu',
        },
        {
          src: [
            'src/components/advanced-search-drop-down/drop-down-elements/_search-element.scss',
            'src/components/advanced-search-drop-down/drop-down-elements/_search-field.scss',
            'src/components/advanced-search-drop-down/drop-down-elements/_search-header.scss',
            'src/components/advanced-search-drop-down/drop-down-elements/_search-view-all.scss',
            'src/components/advanced-search-drop-down/drop-down-elements/_search-error.scss',
            'src/components/advanced-search-drop-down/drop-down-elements/_search-empty.scss',
          ],
          dest: 'lib/scss/components/advanced-search-drop-down/drop-down-elements',
        },
        {
          src: [
            'src/components/advanced-search-drop-down/helpers/tooltip-icons-menu/_tooltip-icons-menu.scss',
          ],
          dest: 'lib/scss/components/advanced-search-drop-down/helpers/tooltip-icons-menu',
        },
        {
          src: ['src/components/dropdown/_multi-level-dropdown.scss'],
          dest: 'lib/scss/components/dropdown',
        },
        {
          src: ['src/components/charts/circle-bar-chart/_circle-bar-chart.scss'],
          dest: 'lib/scss/components/charts/circle-bar-chart',
        },
        {
          src: ['src/components/charts/funnel-chart/_funnel-chart.scss'],
          dest: 'lib/scss/components/charts/funnel-chart',
        },
        {
          src: ['src/components/charts/line-chart/_line-chart.scss'],
          dest: 'lib/scss/components/charts/line-chart',
        },
        {
          src: ['src/components/charts/swimlane-chart/_swimlane-chart.scss'],
          dest: 'lib/scss/components/charts/swimlane-chart',
        },
        {
          src: ['src/components/charts/multiple-line-chart/_multiple-line-chart.scss'],
          dest: 'lib/scss/components/charts/multiple-line-chart',
        },
        {
          src: ['src/components/charts/journey-chart/_journey-chart.scss'],
          dest: 'lib/scss/components/charts/journey-chart',
        },
        {
          src: ['src/components/charts/pie-chart/_pie-chart.scss'],
          dest: 'lib/scss/components/charts/pie-chart',
        },
        {
          src: ['src/components/charts/donut-chart/_donut-chart.scss'],
          dest: 'lib/scss/components/charts/donut-chart',
        },
        {
          src: ['src/components/charts/gauge-chart/_gauge-chart.scss'],
          dest: 'lib/scss/components/charts/gauge-chart',
        },
        {
          src: ['src/components/charts/multi-chart/_multi-chart.scss'],
          dest: 'lib/scss/components/charts/multi-chart',
        },
        {
          src: ['src/components/charts/shared-elements/_custom-tooltip.scss'],
          dest: 'lib/scss/components/charts/shared-elements',
        },
        {
          src: ['src/components/charts/shared-elements/_custom-legend.scss'],
          dest: 'lib/scss/components/charts/shared-elements',
        },
        {
          src: ['src/components/charts/shared-elements/_mixins.scss'],
          dest: 'lib/scss/components/charts/shared-elements',
        },
        {
          src: ['src/components/charts/shared-elements/_pie-chart-active-shape.scss'],
          dest: 'lib/scss/components/charts/shared-elements',
        },
        {
          src: ['src/components/charts/chart-metrics/_chart-metrics.scss'],
          dest: 'lib/scss/components/charts/chart-metrics',
        },
        {
          src: ['src/components/charts/combo-chart/_combo-chart.scss'],
          dest: 'lib/scss/components/charts/combo-chart',
        },
        {
          src: ['src/components/charts/column-chart/_column-chart.scss'],
          dest: 'lib/scss/components/charts/column-chart',
        },
        {
          src: ['src/components/charts/heat-map-chart/_heat-map-chart.scss'],
          dest: 'lib/scss/components/charts/heat-map-chart',
        },
        {
          src: ['src/guidelines/Theme/_theme.scss'],
          dest: 'lib/scss/guidelines/Theme',
        },
        {
          src: ['src/components/configurable-table/components/empty-view/_empty-view.scss'],
          dest: 'lib/scss/components/configurable-table/components/empty-view',
        },
        {
          src: ['src/components/configurable-table/components/tags-cell/_tags-cell.scss'],
          dest: 'lib/scss/components/configurable-table/components/tags-cell',
        },
        {
          src: ['src/guidelines/Icons/_icons.scss'],
          dest: 'lib/scss/guidelines/Icons',
        },
        {
          src: [
            'src/components/rules-builder/rules-builder-element/rule-element/rule-conjunction/_rule-conjunction.scss',
          ],
          dest:
            'lib/scss/components/rules-builder/rules-builder-element/rule-element/rule-conjunction',
        },
        {
          src: [
            'src/components/rules-builder/rules-builder-element/rule-element/rule-group/_rule-group.scss',
          ],
          dest: 'lib/scss/components/rules-builder/rules-builder-element/rule-element/rule-group',
        },
        {
          src: [
            'src/components/rules-builder/rules-builder-element/rule-element/rule-operand/_rule-operand.scss',
          ],
          dest: 'lib/scss/components/rules-builder/rules-builder-element/rule-element/rule-operand',
        },
        {
          src: [
            'src/components/rules-builder/rules-builder-element/rule-element/_rule-element.scss',
          ],
          dest: 'lib/scss/components/rules-builder/rules-builder-element/rule-element',
        },
        {
          src: [
            'src/components/rules-builder/rules-builder-element/custom-drag-layer/_custom-drag-layer.scss',
          ],
          dest: 'lib/scss/components/rules-builder/rules-builder-element/custom-drag-layer',
        },
        {
          src: ['src/components/rules-builder/rules-builder-element/_rules-builder-element.scss'],
          dest: 'lib/scss/components/rules-builder/rules-builder-element',
        },
        {
          src: ['src/components/rules-builder/rules/_rules.scss'],
          dest: 'lib/scss/components/rules-builder/rules',
        },
        {
          src: ['src/components/palette/config/_config.scss'],
          dest: 'lib/scss/components/palette/config',
        },
        {
          src: ['src/components/tooltip-definition/_tooltip-definition.scss'],
          dest: 'lib/scss/components/tooltip-definition',
        },
        {
          src: ['src/components/calendar/date-range-picker/_date-range-picker.scss'],
          dest: 'lib/scss/components/calendar/date-range-picker',
        },
        {
          src: ['src/components/calendar/date-range-modal/_date-range-modal.scss'],
          dest: 'lib/scss/components/calendar/date-range-modal',
        },
        {
          src: ['src/components/fiscal-calendar/_fiscal-calendar.scss'],
          dest: 'lib/scss/components/fiscal-calendar',
        },
      ],
      verbose: env !== 'development', // output file copy list on production builds for easier debugging `
    }),
    commonjs({
      namedExports: {
        'react-js': ['isValidElementType', 'isContextConsumer'],
        'recharts-scale': ['getNiceTickValues', 'getTickValuesFixedDomain'],
        'react-is': ['isForwardRef','isValidElementType','isContextConsumer'],
        'react-dom': ['unstable_batchedUpdates'],
        'react-redux': ['unstable_batchedUpdates'],
//        'node_modules/react-is/index.js': ['isForwardRef','isValidElementType','isContextConsumer'],
        'node_modules/downshift/node_modules/react-is/index.js': ['isForwardRef','isValidElementType','isContextConsumer'],
        'node_modules/react-redux/es/utils/reactBatchedUpdates.js': ['unstable_batchedUpdates'],
        'node_modules/react-dom/index.js': ['unstable_batchedUpdates', 'findDOMNode'],
        'node_modules/carbon-components-react/lib/components/UIShell/index.js': [
          'Header',
          'HeaderName',
          'HeaderMenu',
          'HeaderMenuButton',
          'HeaderGlobalBar',
          'HeaderGlobalAction',
          'SkipToContent',
          'HeaderMenuItem',
          'HeaderNavigation',
          'HeaderPanel',
          'SideNav',
          'SideNavItems',
          'SideNavLink',
          'SideNavMenu',
          'SideNavMenuItem',
          'SideNavFooter',
        ],
      },
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    url(),
    svgr(),
    json(),
    ...prodSettings,
  ],
};
