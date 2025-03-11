const fs = require("fs").promises;

async function main() {
    await findWidgetFiles('../..');
}

main();

async function findWidgetFiles(folderName) {
    // const storeFiles = await fs.readdir(folderName);

    let widgetFiles = [];

    const items = await fs.readdir(folderName, {
        withFileTypes: true
    });

    for (const item of items) {
        if (item.isDirectory()) {
            widgetFiles = widgetFiles.concat(
                await findWidgetFiles(`${folderName}/${item.name}`)
            );
        } else {
            if (item.name === "main.html") {
                widgetFiles.push(`${folderName}/${item.name}`);
            }
        }
    }
    // console.log(widgetFiles);
    return widgetFiles;
}