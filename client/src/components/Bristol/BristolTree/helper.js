// const menus = [
// 	{
// 		id: 4,
// 		label: "JavaScript Syntax",
// 		path: "/#",
// 		descr: "Parent modul-modul yang berkaitan dengan sistem administrasi",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 0,
// 	},
// 	{
// 		id: 5,
// 		label: "Introduction to JavaScript",
// 		path: "/menu",
// 		descr: "Pengelolaan Menu",
// 		endPoint: "MenuGridContainer",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 4,
// 	},
// 	{
// 		id: 6,
// 		label: "Variables",
// 		path: "/role",
// 		descr: "Pengelolaan hak akses pengguna",
// 		endPoint: "RoleGridContainer",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 4,
// 	},
// 	{
// 		id: 7,
// 		label: "Conditional Statements",
// 		path: "/user",
// 		descr: "Pengelolaan Pengguna Aplikasi",
// 		endPoint: "UserGridContainer",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 4,
// 	},
// 	{
// 		id: 8,
// 		label: "Functions",
// 		path: "/#",
// 		descr: "Parent modul-modul yang berkaitan dengan sistem administrasi",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 0,
// 	},
// 	{
// 		id: 9,
// 		label: "ES6 and Before",
// 		path: "/skill",
// 		descr: "Pengelolaan Keahlian",
// 		endPoint: "SkillGridContainer",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 8,
// 	},
// 	{
// 		id: 10,
// 		label: "Scope",
// 		path: "/job",
// 		descr: "Pengelolaan Pekerjaan",
// 		endPoint: "JobGridContainer",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 8,
// 	},
// 	{
// 		id: 11,
// 		label: "Arrays",
// 		path: "/#",
// 		descr: "Parent modul-modul yang berkaitan dengan data sensus",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 0,
// 	},
// 	{
// 		id: 12,
// 		label: "Loops",
// 		path: "/person",
// 		descr: "Pengelolaan Person",
// 		endPoint: "PersonGridContainer",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 11,
// 	},
// 	{
// 		id: 13,
// 		label: "Objects",
// 		path: "/person/tambah",
// 		descr: "Menambahkan person baru",
// 		endPoint: "PersonFormTambah",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 12,
// 	},
// 	{
// 		id: 14,
// 		label: "Iterators",
// 		path: "/person/edit",
// 		descr: "Mengubah data person",
// 		endPoint: "PersonFormEdit",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 12,
// 	},
// 	{
// 		id: 15,
// 		label: "Errors and Debugging",
// 		path: "/person/hapus",
// 		descr: "Menghapus person",
// 		endPoint: "PersonDialogDelete",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 12,
// 	},
// 	{
// 		id: 16,
// 		label: "Pair-Programming",
// 		path: "/person/detail",
// 		descr: "View detail person",
// 		endPoint: "PersonViewDetail",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 12,
// 	},
// 	{
// 		id: 17,
// 		label: "Text Editors",
// 		path: "/skill/tambah",
// 		descr: "Menambahkan keahlian",
// 		endPoint: "SkillFormTambah",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 9,
// 	},
// 	{
// 		id: 18,
// 		label: "What is Node?",
// 		path: "/skill/edit",
// 		descr: "Mengedit keahlian",
// 		endPoint: "SkillFormEdit",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 9,
// 	},
// 	{
// 		id: 19,
// 		label: "Introduction to Git",
// 		path: "/skill/hapus",
// 		descr: "Menghapus keahlian",
// 		endPoint: "SkillDialogDelete",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 9,
// 	},
// 	{
// 		id: 20,
// 		label: "Learn Markdown",
// 		path: "/job/tambah",
// 		descr: "Menambahkan pekerjaan baru",
// 		endPoint: "JobFormTambah",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 10,
// 	},
// 	{
// 		id: 21,
// 		label: "HTML Structure",
// 		path: "/job/edit",
// 		descr: "Mengedit pekerjaan",
// 		endPoint: "JobFormEdit",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 10,
// 	},
// 	{
// 		id: 22,
// 		label: "HTML Tables",
// 		path: "/job/hapus",
// 		descr: "Menghapus pekerjaan",
// 		endPoint: "JobDialogDelete",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 10,
// 	},
// 	{
// 		id: 23,
// 		label: "Semantic HTML",
// 		path: "/menu/tambah",
// 		descr: "Menambah menu baru",
// 		endPoint: "MenuFormTambah",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 5,
// 	},
// 	{
// 		id: 24,
// 		label: "Edit Menu",
// 		path: "/menu/edit",
// 		descr: "Mengubah menu",
// 		endPoint: "MenuFormEdit",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 5,
// 	},
// 	{
// 		id: 25,
// 		label: "CSS",
// 		path: "/menu/hapus",
// 		descr: "dialog hapus menu",
// 		endPoint: "MenuDialogDelete",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 5,
// 	},
// 	{
// 		id: 27,
// 		label: "Selectors and Visual Rules",
// 		path: "/role/tambah",
// 		descr: "Menambahkan role baru",
// 		endPoint: "RoleFormTambah",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 6,
// 	},
// 	{
// 		id: 28,
// 		label: "Developint with CSS",
// 		path: "/role/edit",
// 		descr: "Mengubah data role",
// 		endPoint: "RoleFormEdit",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 6,
// 	},
// 	{
// 		id: 29,
// 		label: "Wireframing",
// 		path: "/role/hapus",
// 		descr: "Menghapus data role",
// 		endPoint: "RoleDialogDelete",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 6,
// 	},
// 	{
// 		id: 30,
// 		label: "Web Hosting",
// 		path: "/user/tambah",
// 		descr: "Menambahkan pengguna baru",
// 		endPoint: "UserFormTambah",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 7,
// 	},
// 	{
// 		id: 31,
// 		label: "CSS: Colors",
// 		path: "/user/edit",
// 		descr: "Mengubah data pengguna",
// 		endPoint: "UserFormEdit",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 7,
// 	},
// 	{
// 		id: 32,
// 		label: "CSS: Typography",
// 		path: "/user/hapus",
// 		descr: "Menghapus pengguna",
// 		endPoint: "UserDialogDelete",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 7,
// 	},
// 	{
// 		id: 33,
// 		label: "CSS: The Box Model",
// 		path: "/user/reset-password",
// 		descr: "Menyetel ulang password pengguna",
// 		endPoint: "UserDialogResetPassword",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 7,
// 	},
// 	{
// 		id: 34,
// 		label: "CSS: Display and Positioning",
// 		path: "/menu/sort",
// 		descr: "Mengurutkan meu",
// 		endPoint: "MenuFormSort",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 5,
// 	},
// ];
// const menusReadOnly = [
// 	{
// 		id: 35,
// 		label: "La Data",
// 		path: "/#",
// 		descr: "Parent modul-modul yang berkaitan dengan sistem administrasi",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 0,
// 	},
// 	{
// 		id: 36,
// 		label: "Création de bases de données",
// 		path: "/menu",
// 		descr: "Pengelolaan Menu",
// 		endPoint: "MenuGridContainer",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 4,
// 	},
// 	{
// 		id: 37,
// 		label: "Procédures stockées",
// 		path: "/role",
// 		descr: "Pengelolaan hak akses pengguna",
// 		endPoint: "RoleGridContainer",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 4,
// 	},
// 	{
// 		id: 38,
// 		label: "Frameworks Node",
// 		path: "/user",
// 		descr: "Pengelolaan Pengguna Aplikasi",
// 		endPoint: "UserGridContainer",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 4,
// 	},
// 	{
// 		id: 39,
// 		label: "NoSQL",
// 		path: "/#",
// 		descr: "Parent modul-modul yang berkaitan dengan sistem administrasi",
// 		isActive: true,
// 		orderNo: 0,
// 		parent: 0,
// 	},
// ];

const menus = [
	{
		id: 0,
		title: "Tempor anim amet anim dolore",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
	},
	{
		id: 1,
		title: "Proident eiusmod et nulla magna ut elit officia ex.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
	},
	{
		id: 2,
		title:
			"Qui exercitation veniam mollit consequat duis labore sunt enim pariatur.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
	},
	{
		id: 3,
		title: "Sint amet commodo consectetur ex.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
	},
	{
		id: 4,
		title: "Id nulla tempor amet pariatur do.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 0,
	},
	{
		id: 5,
		title:
			"Ut occaecat consequat laboris irure eiusmod nostrud tempor amet quis.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 0,
	},
	{
		id: 6,
		title:
			"Ipsum enim laboris laboris id laborum anim ea tempor deserunt commodo.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 0,
	},
	{
		id: 7,
		title:
			"Pariatur nulla occaecat est proident ex ut minim aliqua ex culpa amet tempor minim.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 1,
	},
	{
		id: 8,
		title: "Anim veniam nisi dolore mollit proident incididunt.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 1,
	},
	{
		id: 9,
		title:
			"Consectetur exercitation commodo irure eu aute est Lorem aliquip aliquip eu proident cupidatat.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 2,
	},
	{
		id: 10,
		title:
			"Esse quis sint consequat esse ad culpa exercitation nisi nisi exercitation voluptate in.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 2,
	},
	{
		id: 11,
		title:
			"Commodo aliqua ad dolore officia ea magna elit esse ullamco do duis deserunt anim.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 3,
	},
	{
		id: 12,
		title: "Enim eiusmod ut aute culpa qui aliqua incididunt ex sit veniam.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 5,
	},
	{
		id: 13,
		title:
			"Reprehenderit enim proident Lorem adipisicing veniam in proident aliqua nulla magna.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 5,
	},
	{
		id: 14,
		title:
			"Aliqua cillum est voluptate nulla nisi cupidatat enim cupidatat qui.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 11,
	},
];

const menusReadOnly = [
	{
		id: 15,
		title:
			"Irure ullamco labore enim dolore minim ipsum occaecat minim qui dolor et.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
	},
	{
		id: 16,
		title:
			"Adipisicing est commodo ipsum voluptate nulla commodo et irure adipisicing tempor deserunt consectetur magna.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
	},
	{
		id: 17,
		title: "Ipsum reprehenderit commodo fugiat sit labore amet velit.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
	},
	{
		id: 18,
		title: "Voluptate elit esse sunt consectetur quis proident irure sint.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 15,
	},
	{
		id: 19,
		title: "Id nulla tempor amet pariatur do.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 15,
	},
	{
		id: 20,
		title: "Laborum sit ut ut amet minim irure pariatur et enim voluptate.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 16,
	},
	{
		id: 21,
		title: "Nisi ut quis ipsum eiusmod quis et sit ipsum eu.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 17,
	},
	{
		id: 22,
		title: "Non ad aliquip voluptate id eiusmod qui.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 21,
	},
	{
		id: 23,
		title: "Nisi veniam et dolor voluptate velit officia cupidatat.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 21,
	},
	{
		id: 24,
		title: "Ea do eu mollit do tempor in qui ex commodo eu ut.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 23,
	},
	{
		id: 25,
		title: "Adipisicing nulla sint anim do.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 23,
	},
	{
		id: 26,
		title:
			"Esse id fugiat proident commodo veniam ad officia ex pariatur adipisicing.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
	},
	{
		id: 27,
		title:
			"Anim consequat velit velit elit laboris laborum elit eiusmod magna minim labore.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
	},
	{
		id: 28,
		title:
			"Aute sit mollit magna eiusmod et enim reprehenderit enim qui irure.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 27,
	},
	{
		id: 29,
		title:
			"Laborum irure consequat occaecat ex aute ipsum aliquip laborum ipsum non.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 27,
	},
];

const createNestedMenu = (arr = [], parent = null) => {
	const fix = [];

	for (let i in arr) {
		if (arr[i].parent_id === parent) {
			let children = createNestedMenu(arr, arr[i].id);

			if (children.length) arr[i].children = children;

			fix.push(arr[i]);
		}
	}

	return fix;
};

const getParentId = (itemsArr, path) => {
	if (path.length === 1) return null;

	let workedArr = [...itemsArr];
	const workedPath = path.slice(0, path.length - 1);

	workedPath.forEach((el, i) => {
		if (i === workedPath.length - 1) {
			return (workedArr = workedArr[el]);
		}
		workedArr = workedArr[el].children;
	});

	return workedArr.id;
};

export { createNestedMenu, menusReadOnly, menus, getParentId };
