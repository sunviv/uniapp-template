import presetLegacyCompat from '@unocss/preset-legacy-compat'
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetWeapp } from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default defineConfig({
  theme: {
    colors: {
      'primary': 'var(--wot-color-theme)',
      'theme': 'var(--wot-color-theme)',
      'success': 'var(--wot-color-success)',
      'warning': 'var(--wot-color-warning)',
      'error': 'var(--wot-color-error)',
      'placeholder': '#F0F3FA',
      'font-color-primary': 'rgba(0, 0, 0, 0.85)',
      'font-color-normal': 'rgba(0, 0, 0, 0.65)',
      'font-color-secondary': 'rgba(0, 0, 0, 0.45)',
      'font-color-placeholder': 'rgba(0, 0, 0, 0.25)',
    },
  },

  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp() as any,
    // attributify autocomplete
    presetWeappAttributify() as any,
    // https://unocss.dev/presets/icons
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetLegacyCompat({
      // options
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: {
    'border-base': 'border border-gray-500_10',
    'center': 'flex justify-center items-center',
  },
  transformers: [
    // 启用 @apply 功能
    transformerDirectives({
      enforce: 'pre',
    }),
    // https://unocss.dev/transformers/variant-group
    // 启用 () 分组功能
    transformerVariantGroup(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify() as any,
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
    // https://unocss.dev/transformers/directives
  ],
})
