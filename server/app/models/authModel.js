const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const auth = require("../auth");
const { v4: uuid } = require("uuid");
const pgClient = require("../db/pg");
const cache = require("../db/cache");
const { validateRegister, validateLogin } = require("../validation");
const {
  sendRegisterMail,
  sendResetPasswordMail,
} = require("../auth/nodemailer");

const createEmailValidator = async (id, email) => {
  // Generate code for validation
  const code = crypto.randomBytes(2).toString("hex").toUpperCase();
  // Create a entry in the cache for the code with the user id as key
  cache.set(`email_code_${id}`, code);
  // Send email for validation
  await sendRegisterMail(email, code);
  console.log("email sent");
};

const resendCode = async (id) => {
  try {
    const { rows } = await pgClient.query(
      'SELECT email FROM "user" WHERE id = $1',
      [id],
    );

    if (!rows) throw Error("no user found");

    await createEmailValidator(id, rows[0].email, true);

    return { status: "code resent" };
  } catch (error) {
    return { error };
  }
};

const verifyCode = async (id, code) => {
  try {
    const cachedCode = cache.get(`email_code_${id}`);

    if (!cachedCode) throw Error("no validation pending for this user");
    if (cachedCode !== code) throw Error("wrong code");

    return await Promise.all([
      // Delete code in cache
      cache.del(`email_code_${id}`),
      // Update user
      pgClient.query('UPDATE "user" SET verified = TRUE WHERE id = $1', [id]),
    ]);
  } catch (error) {
    return { error };
  }
};

const register = async (body, browserId) => {
  try {
    // Validate the body with ajv
    const { errors, data } = await validateRegister(body);

    if (errors) return { validationErrors: errors };

    // Hash of the password
    const hash = await bcrypt.hash(
      data.password,
      await bcrypt.genSalt(+process.env.PWD_SALT_ROUND),
    );

    // Clear sensible data
    delete data.confirm;
    delete data.password;
    // Insertion of the new user in the db
    const { rows } = await pgClient.query("SELECT * FROM create_user($1)", [
      JSON.stringify({ ...data, hash }),
    ]);
    const { id } = rows[0];

    // If no user, there was an error
    if (!id) throw Error("failed registration");

    // Creation of the access token and refresh token
    const token = auth.signToken({ id });
    const refresh = auth.signToken({ id }, true);
    // Create a validation process
    await createEmailValidator(id, data.email);
    // Storing the refresh token in the cache with the browser id as its key
    cache.set(`refresh_token_${browserId}`, refresh, process.env.REFRESH_EXP);

    return {
      data: {
        user: { id, ...data, verified: false },
        token,
        refresh,
      },
    };
  } catch (error) {
    return { error };
  }
};

const login = async (body, browserId) => {
  try {
    // Validate the body with ajv
    const { errors, data } = await validateLogin(body);
    if (errors) return { validationErrors: errors };

    // Check if a user with this email exists in the db and returning his and info and hash
    const { rows } = await pgClient.query("SELECT * FROM get_user_auth($1)", [
      JSON.stringify({ email: data.email }),
    ]);

    const user = rows[0];
    // If no user, send error
    if (!user) throw Error(`no user found with email ${data.email}`);

    // Comparison of the hash and the password
    const compare = await bcrypt.compare(data.password, user.hash);
    if (!compare) throw Error("wrong password");

    // Creation of the access token and refresh token
    const token = auth.signToken({ id: user.id });
    const refresh = auth.signToken({ id: user.id }, true);

    // Storage of the refresh token in the cache with the browser id as its key
    cache.set(`refresh_token_${browserId}`, refresh, process.env.REFRESH_EXP);

    delete user.hash;
    return {
      data: {
        user,
        token,
        refresh,
      },
    };
  } catch (error) {
    return { error };
  }
};

const postResetPassword = async (email) => {
  try {
    const { rows } = await pgClient.query("SELECT * FROM get_user_auth($1)", [
      JSON.stringify({ email }),
    ]);

    if (!rows) throw Error("no user found");

    const code = uuid();

    await Promise.all([
      // Store the reset password link for 10 minutes
      cache.set(`reset_code_${code}`, rows[0].id, 60 * 10),
      sendResetPasswordMail(email, code),
    ]);

    return { status: "reset password email sent" };
  } catch (error) {
    return { error };
  }
};

const checkResetCode = (code) => {
  try {
    const cachedCode = cache.get(`reset_code_${code}`);
    if (!cachedCode) throw Error("invalid code");
    return { status: "code verified" };
  } catch (error) {
    return { error };
  }
};

const patchResetPassword = async (body) => {
  try {
    const { password, confirm, code } = body;

    if (password !== confirm) throw Error("password and confirm don't match");

    const cachedId = cache.get(`reset_code_${code}`);

    const hash = await bcrypt.hash(
      password,
      await bcrypt.genSalt(+process.env.PWD_SALT_ROUND),
    );

    return await Promise.all([
      pgClient.query("SELECT patch_user_password($1)", [
        JSON.stringify({ hash, id: cachedId }),
      ]),
      cache.del(`reset_code_${code}`),
    ]);
  } catch (error) {
    return { error };
  }
};

const logout = (browserId) => {
  cache.del(`refresh_token_${browserId}`);
};

const isAuth = async (headerRefresh, browserId) => {
  try {
    const { id: tokenId } = auth.decodeToken(headerRefresh);

    // Query of the user with his id in the db
    const { rows } = await pgClient.query("SELECT * FROM get_user_auth($1)", [
      JSON.stringify({ id: tokenId }),
    ]);
    const user = rows[0];
    // If no user found, throw error
    if (!user) throw Error(`no user found`);

    // Creation of the access token and refresh token
    const token = auth.signToken({ id: user.id });
    const refresh = auth.signToken({ id: user.id }, true);

    // Storage of the refresh token in the cache with the browser id as its key
    cache.set(`refresh_token_${browserId}`, refresh, process.env.REFRESH_EXP);

    delete user.hash;
    return { data: { user, token, refresh } };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  register,
  login,
  logout,
  isAuth,
  verifyCode,
  resendCode,
  postResetPassword,
  checkResetCode,
  patchResetPassword,
};
