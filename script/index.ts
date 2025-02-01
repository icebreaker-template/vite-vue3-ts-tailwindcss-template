import fs from 'node:fs/promises'
import path from 'node:path'
import tailwindcss from '@tailwindcss/postcss'
import postcss from 'postcss'

async function main() {
  const { css } = await postcss([
    tailwindcss({

    }),
  ]).process('@import "tailwindcss";', {
    from: './v4-default.css',
  })

  await fs.writeFile(path.resolve(import.meta.dirname, './v4-default.css'), css, 'utf8')
}

main()
