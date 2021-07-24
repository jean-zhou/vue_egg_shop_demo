import { get } from "./http";

export default {
    testTreeData: {
        getTreeData: () => get('/testTree')
    }
}