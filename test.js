const selectedBristol = {
	editors: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
	viewers: [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }],
};

const editors = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const viewers = [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }];

const deltaRoles = () => {
	const editorsId = editors
		.filter(({ id }) => !selectedBristol.editors.find(user => user.id === id))
		.map(({ id }) => id);

	const viewersId = viewers
		.filter(({ id }) => !selectedBristol.viewers.find(user => user.id === id))
		.map(({ id }) => id);

	const deletedId = [...selectedBristol.editors, ...selectedBristol.viewers]
		.filter(({ id }) => ![...editors, ...viewers].find(user => user.id === id))
		.map(({ id }) => id);

	const newRoles = {};
	if (editorsId.length) newRoles.editors_id = editorsId;
	if (viewersId.length) newRoles.viewers_id = viewersId;
	if (deletedId.length) newRoles.deleted_id = deletedId;
	return newRoles;
};

const delta = Object.keys(deltaRoles());
if (delta.length) console.log("have prop");
else console.log("empty");
