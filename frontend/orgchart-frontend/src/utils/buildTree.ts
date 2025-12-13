import type { People } from '../types';

export interface TreeNode {
  key: string;
  title: string;
  children?: TreeNode[];
  person: People;
}

export function buildTree(people: People[], allowedIds?: Set<number>): TreeNode[] {
  const map = new Map<number, TreeNode>();
  const roots: TreeNode[] = [];

  people.forEach(person => {
    map.set(person.id, {
      key: String(person.id),
      title: `${person.name} - ${person.jobTitle || person.department}`,
      children: [],
      person: person,
    });
  });

  people.forEach(p => {
    const node = map.get(p.id)!;
    if (!p.managerId) {
      roots.push(node);
    } else {
      const parent = map.get(Number(p.managerId));
      if (parent) {
        parent.children!.push(node);
      } else {
        roots.push(node);
      }
    }
  });

  if (!allowedIds || allowedIds.size === 0) {
    return roots;
  }

  const prune = (nodes: TreeNode[]): TreeNode[] => {
    const kept: TreeNode[] = [];
    for (const n of nodes) {
      const prunedChildren = n.children ? prune(n.children) : [];
      const isAllowed = allowedIds.has(Number(n.key));
      if (isAllowed || prunedChildren.length > 0) {
        kept.push({ ...n, children: prunedChildren });
      }
    }
    return kept;
  };

  return prune(roots);
}