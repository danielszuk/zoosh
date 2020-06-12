import getSafe from './get-safe';

export default function traverseNodes(
  nodes: HTMLCollection | ChildNode[] | NodeListOf<ChildNode>,
  selectors: Array<{ id?: string; classNames?: string[]; nodeName?: string }>
): Element | undefined {
  let traverse = Array.from(nodes) as Element[];

  const { length: selectorsLength } = selectors;
  for (let i = 0; i < selectorsLength; i += 1) {
    let selectedNode: Element;
    if (selectors[i].id) {
      // select by 'id'
      selectedNode = traverse.find((node: Element) => {
        const id = getSafe(() => node.attributes.getNamedItem('id').value);
        return id === selectors[i].id;
      });
    } else if (selectors[i].nodeName) {
      // select by 'nodeName'
      selectedNode = traverse.find(
        (node: Element) => node.nodeName === selectors[i].nodeName
      );
    } else if (selectors[i].classNames) {
      // select by 'css classes'
      selectedNode = traverse.find((node: Element) => {
        const classList = getSafe(() => node.classList);
        return (
          classList &&
          selectors[i].classNames.every((className) =>
            classList.contains(className)
          )
        );
      });
    }

    if (selectedNode) {
      // if we found a node for the selector

      if (i === selectorsLength - 1) {
        // if it is the last selector returned with the resulted node
        return selectedNode;
      }

      // otherwise continue the traverse
      traverse = Array.from(selectedNode.childNodes) as Element[];
    } else {
      // if we haven't found any node for the selector, abort the traverse
      return undefined;
    }
  }

  return undefined;
}
