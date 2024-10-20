class WordCount extends HTMLParagraphElement {
  constructor() {
    super()
  }
  // 此处编写元素功能
}

class PopupInfo extends HTMLElement {
  constructor() {
    // 必须首先调用 super 方法
    super()
  }

  connectedCallback() {
    // 创建影子根
    const shadow = this.attachShadow({ mode: 'open' })

    // 创建几个 span
    const wrapper = document.createElement('span')
    wrapper.setAttribute('class', 'wrapper')

    const icon = document.createElement('span')
    icon.setAttribute('class', 'icon')
    icon.setAttribute('tabindex', '0')

    const info = document.createElement('span')
    info.setAttribute('class', 'info')

    // 获取属性内容然后将其放入 info 这个 span 内
    const text = this.getAttribute('data-text')
    info.textContent = text

    // 插入图标
    let imgUrl
    if (this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img')
    }
    else {
      imgUrl = 'img/default.png'
    }

    const img = document.createElement('img')
    img.src = imgUrl
    icon.appendChild(img)

    // 创建一些 CSS 应用于影子 DOM
    const style = document.createElement('style')
    console.log(style.isConnected)

    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: 1.2rem;
      }

      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `

    // 将创建好的元素附加到影子 DOM 上
    shadow.appendChild(style)
    console.log(style.isConnected)
    shadow.appendChild(wrapper)
    wrapper.appendChild(icon)
    wrapper.appendChild(info)
  }
}

// 为这个元素创建类
class MyCustomElement extends HTMLElement {
  static observedAttributes = ['color', 'size']

  constructor() {
    // 必须首先调用 super 方法
    super()
  }

  connectedCallback() {
    console.log('自定义元素添加至页面。')
  }

  disconnectedCallback() {
    console.log('自定义元素从页面中移除。')
  }

  adoptedCallback() {
    console.log('自定义元素移动至新页面。')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`属性 ${name} 已由 ${oldValue} 变更为 ${newValue}。`)
  }
}

// 为这个元素创建类
class ExpandingList extends HTMLUListElement {
  constructor() {
    // 必须首先调用 super 方法
    // super() 的返回值是对当前元素的引用
    super()
  }

  connectedCallback() {
    // 获取当前自定义 ul 元素的 ul 和 li 子元素
    // 包含 ul 的 li 元素可以成为容器
    const uls = Array.from(this.querySelectorAll('ul'))
    const lis = Array.from(this.querySelectorAll('li'))
    // 隐藏所有子 ul
    // 当用户点击更高级别的容器时，这些列表就会显示出来
    uls.forEach((ul) => {
      ul.style.display = 'none'
    })

    // 仔细观察每个在 ul 中的 li 元素
    lis.forEach((li) => {
      // 如果这个 li 有一个 ul 作为子元素，则对其进行装饰并添加一个点击处理程序
      if (li.querySelectorAll('ul').length > 0) {
        // 添加一个属性，以便通过样式使用
        // 来显示打开或关闭的图标
        li.setAttribute('class', 'closed')
        // 将 li 元素的文本包裹在一个新的 span 元素中
        // 这样我们就可以将样式和事件处理程序分配给 span
        const childText = li.childNodes[0]
        const newSpan = document.createElement('span')

        // 从 li 复制文本到 span，设置光标样式
        newSpan.textContent = childText.textContent
        newSpan.style.cursor = 'pointer'

        // 为这个 span 添加事件处理程序
        newSpan.addEventListener('click', (e) => {
          // span 的下一个兄弟元素应该是 ul
          const nextul = e.target.nextElementSibling

          // 切换可见状态并更新 ul 的 class 属性
          if (nextul.style.display == 'block') {
            nextul.style.display = 'none'
            nextul.parentNode.setAttribute('class', 'closed')
          }
          else {
            nextul.style.display = 'block'
            nextul.parentNode.setAttribute('class', 'open')
          }
        })
        // 添加 span 并从 li 中移除纯文本节点
        childText.parentNode.insertBefore(newSpan, childText)
        childText.parentNode.removeChild(childText)
      }
    })
  }
}

customElements.define('my-custom-element', MyCustomElement)
customElements.define('word-count', WordCount, { extends: 'p' })
customElements.define('popup-info', PopupInfo)
customElements.define('expanding-list', ExpandingList, { extends: 'ul' })
