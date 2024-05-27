import './App.css'
import {NOZ_TOC_ITEMS_MOCK} from "./components/TableOfContents/data/NOZ_TOC_ITEMS_MOCK.ts";
import {useTableOfContents} from "./components/TableOfContents/useTableOfContents.ts";
import {TableOfContents} from "./components/TableOfContents/TableOfContents.tsx";

function App() {
    const items = NOZ_TOC_ITEMS_MOCK;
    const props = useTableOfContents({ items });

    return (
        <div>
            <TableOfContents {...props} />
        </div>
    );
}

export default App
