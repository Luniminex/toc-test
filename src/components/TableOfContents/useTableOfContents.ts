import { useState } from 'react';
import { ContentItem } from './types/ContentItem.ts';

type TableOfContentsArg = {
    items: ContentItem[];
};

// TODO: expand/collapse of items
// TODO: Collapse recursively
export const useTableOfContents = ({ items }: TableOfContentsArg) => {
    //use set because operations like delete and has should be faster than array
    const [collapsed, setCollapsed] = useState<Set<string>>(new Set(items.map(item => item.id)));

    //helper function that recursively finds children of a given item
    const getChildren = (id: string): string[] => {
        let result: string[] = [];
        //goes through all items and checks if the parentId is the given id
        for (const item of items) {
            if (item.parentId === id) {
                result.push(item.id);
                //since this is a child, we need to check if it has children as well
                result = result.concat(getChildren(item.id));
            }
        }
        return result;
    };

    const onClick = (item: ContentItem) => () => {
        //new set to signal that the state has indeed changed
        const newCollapsed = new Set(collapsed);
        if (newCollapsed.has(item.id)) {
            newCollapsed.delete(item.id);
        } else {
            //add the item and all its children to the collapsed set
            newCollapsed.add(item.id);
            getChildren(item.id).forEach(childId => newCollapsed.add(childId));
        }
        setCollapsed(newCollapsed);
    }
    
    //return only the items that are not in the collapsed set
    const visibleItems = items.filter(item => !collapsed.has(item.parentId ?? ''));

    return { items: visibleItems, onClick };
};
