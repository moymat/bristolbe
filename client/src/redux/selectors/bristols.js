export const deltaRoles = (selectedBristol, { editors, viewers }) => {
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
