require("dotenv").config();
const client = require("../../app/db/pg");
const bcrypt = require("bcryptjs");
const faker = require("faker");

const USERS = [
	{
		first_name: "John",
		last_name: "Doe",
	},
	{
		first_name: "Jane",
		last_name: "Doe",
	},
	{
		first_name: "Bob",
		last_name: "Leponge",
	},
	{
		first_name: "Michel",
		last_name: "Deckert",
	},
];

const createEmail = user => {
	return `${
		user.first_name.toLowerCase() + user.last_name.toLowerCase()
	}@gmail.com`;
};

const createHash = async password => {
	return await bcrypt.hash(
		password,
		await bcrypt.genSalt(+process.env.PWD_SALT_ROUND)
	);
};

const createUsers = async users => {
	return Promise.all(
		users.map(async user => {
			user.hash = await createHash("Abcde1234");
			user.email = createEmail(user);
			const { rows } = await client.query("SELECT id FROM create_user($1)", [
				JSON.stringify(user),
			]);
			return { user_id: rows[0].id, first_name: user.first_name };
		})
	);
};

const createChild = async (bristol, i, round) => {
	if (round === 0) return [];
	const { bristol_id: pid, user_id, first_name } = bristol;

	const { rows } = await client.query("SELECT id FROM create_bristol($1)", [
		JSON.stringify({
			user_id,
			title: `${first_name} child ${i}`,
			content: faker.lorem.paragraphs(faker.datatype.number(3)),
		}),
	]);

	const newBristol = { bristol_id: rows[0].id, user_id, first_name };

	await client.query("SELECT move_bristol($1)", [
		JSON.stringify({
			user_id,
			bristol_id: newBristol.bristol_id,
			parent_id: pid,
			position: i,
		}),
	]);

	const children = await Promise.all(
		Array(3)
			.fill(null)
			.map(async (_, i) => await createChild(newBristol, i, round - 1))
	);

	return [newBristol, ...children];
};

const createBristols = async userIds => {
	let allBristols = [];

	await Promise.all(
		userIds.map(async ({ user_id, first_name }) => {
			let bristols = [];
			await Promise.all(
				Array(3)
					.fill(null)
					.map(async (_, i) => {
						const { rows } = await client.query(
							"SELECT id FROM create_bristol($1)",
							[
								JSON.stringify({
									user_id,
									title: `${first_name} root ${i + 1}`,
									content: faker.lorem.paragraphs(3),
								}),
							]
						);
						const bristol = { bristol_id: rows[0].id, user_id, first_name };

						const children = await Promise.all(
							Array(3)
								.fill(null)
								.map(async (_, i) => await createChild(bristol, i, 4))
						);

						bristols = [...bristols, bristol, ...children];
					})
			);

			allBristols = [...allBristols, ...bristols];
		})
	);

	return allBristols;
};

const initDB = async () => {
	const users = await createUsers(USERS);
	const bristols = await createBristols(users);
	console.log(bristols);
};

initDB();
