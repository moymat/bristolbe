const menus = [
    {
        id: 4,
        label: "JavaScript Syntax",
        path: "/#",
        descr: "Parent modul-modul yang berkaitan dengan sistem administrasi",
        isActive: true,
        orderNo: 0,
        parent: 0
    },
    {
        id: 5,
        label: "Introduction to JavaScript",
        path: "/menu",
        descr: "Pengelolaan Menu",
        endPoint: "MenuGridContainer",
        isActive: true,
        orderNo: 0,
        parent: 4
    },
    {
        id: 6,
        label: "Variables",
        path: "/role",
        descr: "Pengelolaan hak akses pengguna",
        endPoint: "RoleGridContainer",
        isActive: true,
        orderNo: 0,
        parent: 4
    },
    {
        id: 7,
        label: "Conditional Statements",
        path: "/user",
        descr: "Pengelolaan Pengguna Aplikasi",
        endPoint: "UserGridContainer",
        isActive: true,
        orderNo: 0,
        parent: 4
    },
    {
        id: 8,
        label: "Functions",
        path: "/#",
        descr: "Parent modul-modul yang berkaitan dengan sistem administrasi",
        isActive: true,
        orderNo: 0,
        parent: 0
    },
    {
        id: 9,
        label: "ES6 and Before",
        path: "/skill",
        descr: "Pengelolaan Keahlian",
        endPoint: "SkillGridContainer",
        isActive: true,
        orderNo: 0,
        parent: 8
    },
    {
        id: 10,
        label: "Scope",
        path: "/job",
        descr: "Pengelolaan Pekerjaan",
        endPoint: "JobGridContainer",
        isActive: true,
        orderNo: 0,
        parent: 8
    },
    {
        id: 11,
        label: "Arrays",
        path: "/#",
        descr: "Parent modul-modul yang berkaitan dengan data sensus",
        isActive: true,
        orderNo: 0,
        parent: 0
    },
    {
        id: 12,
        label: "Loops",
        path: "/person",
        descr: "Pengelolaan Person",
        endPoint: "PersonGridContainer",
        isActive: true,
        orderNo: 0,
        parent: 11
    },
    {
        id: 13,
        label: "Objects",
        path: "/person/tambah",
        descr: "Menambahkan person baru",
        endPoint: "PersonFormTambah",
        isActive: true,
        orderNo: 0,
        parent: 12
    },
    {
        id: 14,
        label: "Iterators",
        path: "/person/edit",
        descr: "Mengubah data person",
        endPoint: "PersonFormEdit",
        isActive: true,
        orderNo: 0,
        parent: 12
    },
    {
        id: 15,
        label: "Errors and Debugging",
        path: "/person/hapus",
        descr: "Menghapus person",
        endPoint: "PersonDialogDelete",
        isActive: true,
        orderNo: 0,
        parent: 12
    },
    {
        id: 16,
        label: "Pair-Programming",
        path: "/person/detail",
        descr: "View detail person",
        endPoint: "PersonViewDetail",
        isActive: true,
        orderNo: 0,
        parent: 12
    },
    {
        id: 17,
        label: "Text Editors",
        path: "/skill/tambah",
        descr: "Menambahkan keahlian",
        endPoint: "SkillFormTambah",
        isActive: true,
        orderNo: 0,
        parent: 9
    },
    {
        id: 18,
        label: "What is Node?",
        path: "/skill/edit",
        descr: "Mengedit keahlian",
        endPoint: "SkillFormEdit",
        isActive: true,
        orderNo: 0,
        parent: 9
    },
    {
        id: 19,
        label: "Introduction to Git",
        path: "/skill/hapus",
        descr: "Menghapus keahlian",
        endPoint: "SkillDialogDelete",
        isActive: true,
        orderNo: 0,
        parent: 9
    },
    {
        id: 20,
        label: "Learn Markdown",
        path: "/job/tambah",
        descr: "Menambahkan pekerjaan baru",
        endPoint: "JobFormTambah",
        isActive: true,
        orderNo: 0,
        parent: 10
    },
    {
        id: 21,
        label: "HTML Structure",
        path: "/job/edit",
        descr: "Mengedit pekerjaan",
        endPoint: "JobFormEdit",
        isActive: true,
        orderNo: 0,
        parent: 10
    },
    {
        id: 22,
        label: "HTML Tables",
        path: "/job/hapus",
        descr: "Menghapus pekerjaan",
        endPoint: "JobDialogDelete",
        isActive: true,
        orderNo: 0,
        parent: 10
    },
    {
        id: 23,
        label: "Semantic HTML",
        path: "/menu/tambah",
        descr: "Menambah menu baru",
        endPoint: "MenuFormTambah",
        isActive: true,
        orderNo: 0,
        parent: 5
    },
    {
        id: 24,
        label: "Edit Menu",
        path: "/menu/edit",
        descr: "Mengubah menu",
        endPoint: "MenuFormEdit",
        isActive: true,
        orderNo: 0,
        parent: 5
    },
    {
        id: 25,
        label: "CSS",
        path: "/menu/hapus",
        descr: "dialog hapus menu",
        endPoint: "MenuDialogDelete",
        isActive: true,
        orderNo: 0,
        parent: 5
    },
    {
        id: 27,
        label: "Selectors and Visual Rules",
        path: "/role/tambah",
        descr: "Menambahkan role baru",
        endPoint: "RoleFormTambah",
        isActive: true,
        orderNo: 0,
        parent: 6
    },
    {
        id: 28,
        label: "Developint with CSS",
        path: "/role/edit",
        descr: "Mengubah data role",
        endPoint: "RoleFormEdit",
        isActive: true,
        orderNo: 0,
        parent: 6
    },
    {
        id: 29,
        label: "Wireframing",
        path: "/role/hapus",
        descr: "Menghapus data role",
        endPoint: "RoleDialogDelete",
        isActive: true,
        orderNo: 0,
        parent: 6
    },
    {
        id: 30,
        label: "Web Hosting",
        path: "/user/tambah",
        descr: "Menambahkan pengguna baru",
        endPoint: "UserFormTambah",
        isActive: true,
        orderNo: 0,
        parent: 7
    },
    {
        id: 31,
        label: "CSS: Colors",
        path: "/user/edit",
        descr: "Mengubah data pengguna",
        endPoint: "UserFormEdit",
        isActive: true,
        orderNo: 0,
        parent: 7
    },
    {
        id: 32,
        label: "CSS: Typography",
        path: "/user/hapus",
        descr: "Menghapus pengguna",
        endPoint: "UserDialogDelete",
        isActive: true,
        orderNo: 0,
        parent: 7
    },
    {
        id: 33,
        label: "CSS: The Box Model",
        path: "/user/reset-password",
        descr: "Menyetel ulang password pengguna",
        endPoint: "UserDialogResetPassword",
        isActive: true,
        orderNo: 0,
        parent: 7
    },
    {
        id: 34,
        label: "CSS: Display and Positioning",
        path: "/menu/sort",
        descr: "Mengurutkan meu",
        endPoint: "MenuFormSort",
        isActive: true,
        orderNo: 0,
        parent: 5
    }
];
const menusReadOnly = [
    {
        id: 35,
        label: "La Data",
        path: "/#",
        descr: "Parent modul-modul yang berkaitan dengan sistem administrasi",
        isActive: true,
        orderNo: 0,
        parent: 0
    },
    {
        id: 36,
        label: "Création de bases de données",
        path: "/menu",
        descr: "Pengelolaan Menu",
        endPoint: "MenuGridContainer",
        isActive: true,
        orderNo: 0,
        parent: 4
    },
    {
        id: 37,
        label: "Procédures stockées",
        path: "/role",
        descr: "Pengelolaan hak akses pengguna",
        endPoint: "RoleGridContainer",
        isActive: true,
        orderNo: 0,
        parent: 4
    },
    {
        id: 38,
        label: "Frameworks Node",
        path: "/user",
        descr: "Pengelolaan Pengguna Aplikasi",
        endPoint: "UserGridContainer",
        isActive: true,
        orderNo: 0,
        parent: 4
    },
    {
        id: 39,
        label: "NoSQL",
        path: "/#",
        descr: "Parent modul-modul yang berkaitan dengan sistem administrasi",
        isActive: true,
        orderNo: 0,
        parent: 0
    },
];
const createNestedMenu = (arr = [], parent = 0) => {
    let fix = [];

    for (let i in arr) {
        if (arr.hasOwnProperty(i)) {
            if (arr[i].parent === parent) {
                let children = createNestedMenu(arr, arr[i].id);

                if (children.length) {
                    arr[i].children = children;
                }

                fix.push(arr[i]);
            }
        }
    }

    return fix;
};

const generateFlatMenu = (arr = [], parent = 0, index = 0, recursive = 1) => {
    let fix = [],
        parentTemp = Number(parent),
        indexTemp = Number(index),
        recursiveTemp = recursive + 1;

    for (let i in arr) {
        const idx = Number(i) + 1;
        if (arr.hasOwnProperty(i)) {
            let indexFix =
                recursive === 1
                    ? idx * 1000
                    : recursive === 2
                        ? idx * 100 + indexTemp
                        : idx + indexTemp;
            let fixTemp = {
                id: arr[i].id,
                name: arr[i].label,
                parent: parentTemp,
                orderNo: indexFix
            };

            fix.push(fixTemp);

            if (Array.isArray(arr[i].children)) {
                fix = fix.concat(
                    generateFlatMenu(arr[i].children, arr[i].id, indexFix, recursiveTemp)
                );
            }
        }
    }

    return fix;
};

export { createNestedMenu, generateFlatMenu, menusReadOnly, menus };
