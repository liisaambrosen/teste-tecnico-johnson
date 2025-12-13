import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import type { People } from '../types';
import { buildTree } from '../utils/buildTree';

interface Props {
  allPeople: People[];
  filteredPeople: People[];
}

interface TreeNode {
  key: string;
  title: string;
  children?: TreeNode[];
}

const renderTree = (nodes: TreeNode) => (
  <TreeItem key={nodes.key} itemId={nodes.key} label={nodes.title}>
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node))
      : null}
  </TreeItem>
);

export default function PeopleTree({ allPeople, filteredPeople }: Props) {
  const allowedIds = new Set<number>(filteredPeople.map(p => p.id));
  const treeData = buildTree(allPeople, allowedIds) as TreeNode[];

  return (
    <SimpleTreeView
      defaultExpandedItems={treeData.map(node => node.key)}
      slots={{
        collapseIcon: ExpandMore,
        expandIcon: ChevronRight,
      }}
    >
      {treeData.map((node) => renderTree(node))}
    </SimpleTreeView>
  );
}