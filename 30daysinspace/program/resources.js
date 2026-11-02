// Every class folder and the files inside it.
// When you add a new lesson, add it to this list.
const folders = [
    { name: "lesson01", title: "Day 1: Emergency Light", files: ["index.html", "style.css", "script.js"] },
    { name: "lesson02", title: "Day 2: Beacon Switch", files: ["index.html", "style.css", "script.js"] },
    { name: "lesson03", title: "Day 3: Ship Systems", files: ["index.html", "style.css", "script.js"] },
];

// Where the lesson folders are, compared to this page
const basePath = "../";

const fileTypes = {
    html: "HTML page",
    css: "CSS stylesheet",
    js: "JavaScript",
};

const breadcrumb = document.getElementById("breadcrumb");
const body = document.getElementById("browser-body");

function extensionOf(fileName) {
    return fileName.split(".").pop();
}

// Small helper: creates an element with a class and some text
function make(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

function link(text, href, className) {
    const a = make("a", className, text);
    a.href = href;
    return a;
}

// The coloured label in front of each name: DIR, HTML, CSS or JS
function badge(kind) {
    return make("span", "badge badge-" + kind, kind === "dir" ? "DIR" : kind.toUpperCase());
}

// "files / lesson01 / style.css", each part is a link
function showBreadcrumb(folder, fileName) {
    breadcrumb.replaceChildren(link("files", "#"));
    if (folder) {
        breadcrumb.append(" / ", link(folder.name, "#" + folder.name));
    }
    if (fileName) {
        breadcrumb.append(" / ", make("span", "", fileName));
    }
}

// One row of the list: badge + name, a description, and some links on the right
function row(kind, name, href, description, actions) {
    const tr = document.createElement("tr");

    const nameCell = make("td", "listing-name");
    nameCell.append(badge(kind), link(name, href));

    const actionCell = make("td", "listing-actions");
    actionCell.append(...actions);

    tr.append(nameCell, make("td", "listing-description", description), actionCell);
    return tr;
}

function table(rows) {
    const t = make("table", "listing");
    t.innerHTML = "<thead><tr><th>Name</th><th>Description</th><th></th></tr></thead>";
    const tbody = document.createElement("tbody");
    tbody.append(...rows);
    t.append(tbody);
    return t;
}

// The top level: one row per lesson folder
function showRoot() {
    showBreadcrumb();
    const rows = folders.map((folder) =>
        row("dir", folder.name + "/", "#" + folder.name, folder.title, [
            make("span", "listing-count", folder.files.length + " files"),
        ])
    );
    body.replaceChildren(table(rows));
}

// Inside a folder: a row to go back, then one row per file
function showFolder(folder) {
    showBreadcrumb(folder);
    const back = row("dir", "../", "#", "Back to all folders", []);
    const rows = folder.files.map((fileName) => {
        const path = basePath + folder.name + "/" + fileName;
        return row(extensionOf(fileName), fileName, "#" + folder.name + "/" + fileName,
            fileTypes[extensionOf(fileName)] || "File", [
                link("Raw", path, "listing-link"),
                downloadLink(path, fileName),
            ]);
    });

    const runIt = link("Open the finished page", basePath + folder.name + "/index.html", "button button-small");
    runIt.target = "_blank";
    const footer = make("div", "browser-footer");
    footer.append(runIt);

    body.replaceChildren(table([back, ...rows]), footer);
}

function downloadLink(path, fileName) {
    const a = link("Download", path, "listing-link");
    a.download = fileName;
    return a;
}

// A single file: its code, with buttons to copy, open or download it
async function showFile(folder, fileName) {
    showBreadcrumb(folder, fileName);
    const path = basePath + folder.name + "/" + fileName;

    const toolbar = make("div", "file-toolbar");
    const title = make("p", "file-title");
    title.append(badge(extensionOf(fileName)), " " + fileName);
    const buttons = make("div", "file-buttons");
    const copyButton = make("button", "listing-link", "Copy");
    buttons.append(copyButton, link("Raw", path, "listing-link"), downloadLink(path, fileName));
    toolbar.append(title, buttons);

    const pre = make("pre", "file-code");
    const code = make("code", "", "Loading...");
    pre.append(code);
    body.replaceChildren(toolbar, pre);

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Not found");
        code.textContent = await response.text();
    } catch (error) {
        // Browsers block fetch() on pages opened straight from the disk (file://)
        code.textContent = "This file can't be shown here.\n" +
            "Click \"Raw\" to open it, or open this page through a web server.";
        copyButton.hidden = true;
    }

    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(code.textContent);
            copyButton.textContent = "Copied!";
        } catch (error) {
            copyButton.textContent = "Copy failed";
        }
        setTimeout(() => (copyButton.textContent = "Copy"), 1500);
    });
}

// The part of the address after # says what to show: "", "lesson01" or "lesson01/style.css"
function show() {
    const [folderName, fileName] = decodeURIComponent(location.hash.slice(1)).split("/");
    const folder = folders.find((f) => f.name === folderName);

    if (folder && folder.files.includes(fileName)) {
        showFile(folder, fileName);
    } else if (folder) {
        showFolder(folder);
    } else {
        showRoot();
    }
}

window.addEventListener("hashchange", show);
show();
