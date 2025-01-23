import type { ComponentInternalInstance, VNode, VNodeChild, VNodeNormalizedChildren } from 'vue'
import { isVNode, shallowRef } from 'vue'

function isArray(arg: any): arg is any[] {
  return Array.isArray(arg)
}

export type VNodeChildAtom = Exclude<VNodeChild, Array<any>>
export type RawSlots = Exclude<
  VNodeNormalizedChildren,
  Array<any> | null | string
>

export type FlattenVNodes = Array<VNodeChildAtom | RawSlots>

export function flattedChildren(children: FlattenVNodes | VNode | VNodeNormalizedChildren): FlattenVNodes {
  const vNodes = isArray(children) ? children : [children]
  const result: FlattenVNodes = []

  vNodes.forEach((child) => {
    if (isArray(child)) {
      result.push(...flattedChildren(child))
    }
    else if (isVNode(child) && child.component?.subTree) {
      result.push(child, ...flattedChildren(child.component.subTree))
    }
    else if (isVNode(child) && isArray(child.children)) {
      result.push(...flattedChildren(child.children))
    }
    else {
      result.push(child)
    }
  })
  return result
}

function getOrderedChildren<T>(vm: ComponentInternalInstance, childComponentName: string, children: Record<number, T>): T[] {
  const nodes = flattedChildren(vm.subTree).filter(
    (n): n is VNode =>
      isVNode(n)
      && (n.type as any)?.name === childComponentName
      && !!n.component,
  )
  const uids = nodes.map(n => n.component!.uid)
  return uids.map(uid => children[uid]).filter(p => !!p)
}

export function useOrderedChildren<T extends { uid: number }>(vm: ComponentInternalInstance, childComponentName: string) {
  const children: Record<number, T> = {}
  const orderedChildren = shallowRef<T[]>([])

  const addChild = (child: T) => {
    children[child.uid] = child
    orderedChildren.value = getOrderedChildren(vm, childComponentName, children)
  }
  const removeChild = (uid: number) => {
    delete children[uid]
    orderedChildren.value = orderedChildren.value.filter(
      children => children.uid !== uid,
    )
  }

  return {
    children: orderedChildren,
    addChild,
    removeChild,
  }
}
