import type { Plugin } from 'vite'
import { parse } from '@vue/compiler-dom' // 解析 Vue 代码
import MagicString from 'magic-string'

export default function replaceImgWithIceImage(): Plugin {
  return {
    name: 'vite-plugin-replace-img',
    enforce: 'pre', // 在解析前处理

    transform(code, id) {
      if (!/\.(?:vue|jsx|tsx)$/.test(id)) {
        return
      } // 只处理 Vue、JSX、TSX 文件

      const s = new MagicString(code)
      const ast = parse(code)

      function replaceNode(node) {
        if (node.tag === 'img') {
          const { props } = node
          let attributes = ''
          let srcAttr = ''

          props.forEach((prop) => {
            if (prop.type === 6) {
              // 静态属性
              if (prop.name === 'src') {
                srcAttr = prop.value ? prop.value.content : ''
              }
              else {
                attributes += ` ${prop.name}="${prop.value ? prop.value.content : ''}"`
              }
            }
            else if (prop.type === 7 && prop.name === 'bind' && prop.arg?.content) {
              // 动态绑定属性
              attributes += ` :${prop.arg.content}="${prop.exp?.content}"`
            }
          })

          const start = node.loc.start.offset
          const end = node.loc.end.offset
          const newTag = `<IceImage src="${srcAttr}"${attributes} />`

          s.overwrite(start, end, newTag)
        }

        if (node.children) {
          node.children.forEach(replaceNode)
        }
      }

      ast.children.forEach(replaceNode)

      return {
        code: s.toString(),

        get map() {
          return s.generateMap({ hires: true })
        },
      }
    },
  }
}
