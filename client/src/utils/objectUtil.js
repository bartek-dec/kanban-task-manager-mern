export const filterObject = (obj, id) => {
    const remainEntries = {};
    Object.entries(obj).filter((item) => {
        const [itemId] = item;
        if (itemId !== id) {
            return item;
        }
    }).forEach((item) => {
        const [id, value] = item;
        remainEntries[id] = value;
    });

    return remainEntries;
}