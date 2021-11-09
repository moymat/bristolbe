const menus = [
	{
		id: 0,
		title: "Tempor anim amet anim dolore",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
		position: 0,
		role: "editor",
	},
	{
		id: 1,
		title: "Proident eiusmod et nulla magna ut elit officia ex.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
		position: 1,
		role: "editor",
	},
	{
		id: 2,
		title:
			"Qui exercitation veniam mollit consequat duis labore sunt enim pariatur.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
		position: 3,
		role: "editor",
	},
	{
		id: 3,
		title: "Sint amet commodo consectetur ex.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: null,
		position: 2,
		role: "editor",
	},
	{
		id: 4,
		title: "Id nulla tempor amet pariatur do.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 0,
		position: 0,
		role: "editor",
	},
	{
		id: 5,
		title:
			"Ut occaecat consequat laboris irure eiusmod nostrud tempor amet quis.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 0,
		position: 2,
		role: "editor",
	},
	{
		id: 6,
		title:
			"Ipsum enim laboris laboris id laborum anim ea tempor deserunt commodo.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 0,
		position: 1,
		role: "editor",
	},
	{
		id: 7,
		title:
			"Pariatur nulla occaecat est proident ex ut minim aliqua ex culpa amet tempor minim.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 1,
		position: 1,
		role: "editor",
	},
	{
		id: 8,
		title: "Anim veniam nisi dolore mollit proident incididunt.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 1,
		position: 0,
		role: "editor",
	},
	{
		id: 9,
		title:
			"Consectetur exercitation commodo irure eu aute est Lorem aliquip aliquip eu proident cupidatat.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 2,
		position: 0,
		role: "editor",
	},
	{
		id: 10,
		title:
			"Esse quis sint consequat esse ad culpa exercitation nisi nisi exercitation voluptate in.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 2,
		position: 1,
		role: "editor",
	},
	{
		id: 11,
		title:
			"Commodo aliqua ad dolore officia ea magna elit esse ullamco do duis deserunt anim.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 3,
		position: 0,
		role: "editor",
	},
	{
		id: 12,
		title: "Enim eiusmod ut aute culpa qui aliqua incididunt ex sit veniam.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 5,
		position: 1,
		role: "editor",
	},
	{
		id: 13,
		title:
			"Reprehenderit enim proident Lorem adipisicing veniam in proident aliqua nulla magna.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 5,
		position: 0,
		role: "editor",
	},
	{
		id: 14,
		title:
			"Aliqua cillum est voluptate nulla nisi cupidatat enim cupidatat qui.",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum obcaecati maxime cumque in, animi fugit at, culpa molestias, ea alias. Porro rerum ea, architecto illo atque in nesciunt nemo",
		parent_id: 11,
		position: 0,
		role: "editor",
	},
];



const createNestedMenu = (arr = [], parent = null) => {
	const fix = [];

	arr.sort((a, b) => a.position - b.position);

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


export { createNestedMenu, menus, getParentId };
