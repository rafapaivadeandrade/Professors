const db = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const convertHourFromMinutes = require("../utils/convertHourToMinutes");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async create(req, res) {
    try {
      const { name, lastName, email, password, avatar } = req.body;
      const user = await db("users").first("*").where({ email: email });
      if (user) {
        return res.status(400).send("user already exists");
      }
      const hash = await bcrypt.hash(password, 10);
      const userRegistered = await db("users").insert({
        name,
        lastName,
        avatar: req.file.filename,
        email,
        password: hash.toString(),
      });
      return res.send({
        userRegistered,
        token: generateToken({ id: userRegistered.id }),
      });
    } catch (e) {
      console.log(e);
      res.status(400).send("Registration Failed");
    }
  },
  async auth(req, res) {
    try {
      const { email, password } = req.body;
      const user = await db("users").first("*").where({ email: email });
      if (user) {
        const validPass = await bcrypt.compare(password, user.password);
        if (validPass) {
          user.password = undefined;
          res.send({
            user: user,
            image_url: `http://192.168.15.10:3333/uploads/${user.avatar}`,
            token: generateToken({ id: user.id }),
          });
        } else {
          res.json("Wrong password");
        }
      } else {
        res.status(400).json("User not found!");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("Cannot login");
    }
  },

  async forgot(req, res) {
    const { email } = req.body;

    try {
      const user = await db("users").first("*").where({ email: email });
      if (!user) {
        return res.status(400).send({
          error: "User not found",
        });
      }

      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      // user.passwordResetToken = token;
      // user.passwordResetExpires = now;

      await db("users").where("id", user.id).update({
        passwordResetToken: token,
        passwordResetExpires: now,
      });

      const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fdbae5331da7cd",
          pass: "b5fe89328eb2d7",
        },
      });

      transport.sendMail(
        {
          from: "rafaklose10@gmail.com",
          to: email,
          subject: "Forgot Password",
          html:
            '<p>You forgot your password? Click here: <a href="http://localhost:3000/resetPassword/' +
            token +
            '">here</a></p>',
        },
        (err) => {
          if (err) {
            return res
              .status(400)
              .send({ error: "Cannot send forgot password email" });
          }
          return res.send({ ok: true });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "Error on forgot password.",
      });
    }
  },
  async reset(req, res) {
    const { email, password } = req.body;
    const { token } = req.params;
    try {
      const user = await db("users").first("*").where({ email: email });
      if (!user) {
        return res.status(400).send({
          error: "User not found",
        });
      }
      if (token !== user.passwordResetToken) {
        return res.status(400).send({ error: "Token invalid" });
      }
      const now = new Date();

      if (now > user.passwordResetExpires) {
        return res
          .status(400)
          .send({ error: "Token expired, generate a new one" });
      }

      const hash = await bcrypt.hash(password, 10);

      await db("users").where("email", user.email).update({
        password: hash.toString(),
      });

      res.send();
    } catch (err) {
      res.status(400).send({ error: "Cannot reset password, try again" });
    }
  },
  async totalTeachers(req, res) {
    const [count] = await db("users").count();

    return res.send({ count: count["count(*)"] });
  },
  async teachers(req, res) {
    const { page = 1 } = req.headers;

    const teachers = await db("classes")
      .join("users", "classes.user_id", "=", "users.id")
      .join("class_schedule", "class_schedule.class_id", "=", "classes.id")
      .limit(2)
      .offset((page - 1) * 5)
      .select(["users.*", "class_schedule.*"])
      .orderBy("users.id");

    return res.json(teachers);
  },
  async userData(req, res) {
    const { user_id } = req.params;
    const userData = await db("users")
      .where("users.id", "=", user_id)
      .join("classes", "users.id", "=", "classes.user_id")
      .join("class_schedule", "classes.id", "=", "class_schedule.class_id")
      .select(["classes.*", "users.*"])
      .first("*");

    if (userData === undefined) {
      return res.send(false);
    }
    return res.json(userData);
  },
  async userDataSchedule(req, res) {
    const { user_id } = req.params;
    const userData = await db("users")
      .where("users.id", "=", user_id)
      .join("classes", "users.id", "=", "classes.user_id")
      .join("class_schedule", "classes.id", "=", "class_schedule.class_id")
      .select(["classes.*", "users.*", "class_schedule.*"]);
    return res.json(userData);
  },
  async update(req, res) {
    const {
      cost,
      subject,
      bio,
      whatsapp,
      email,
      avatar,
      lastName,
      name,
    } = req.body;
    const { user_id, class_id } = req.params;
    const trx = await db.transaction();

    const classes = await trx("classes").first("*").where({ id: class_id });

    const user = await trx("users").first("*").where({ id: user_id });
    console.log(user);

    const users = await trx("users");

    const restUsers = users.filter((usersData) => {
      return usersData.id !== user.id;
    });

    restUsers.map((users) => {
      if (users.email === email) {
        return res.status(400).send("Email already exists");
      }
    });

    try {
      const userUpdated = await trx("users")
        .where("id", user.id)
        .update({
          email,
          name,
          lastName,
          avatar: avatar ? avatar : req.file.filename,
          whatsapp,
          bio,
        });
      const user_id = user.id;

      await trx("classes")
        .where("id", classes.id)
        .update({
          subject,
          cost: Number(cost),
          user_id,
        });

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      await trx.rollback();

      return res.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  },
};
