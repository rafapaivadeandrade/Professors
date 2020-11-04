const db = require("../database/connection");
const convertHourFromMinutes = require("../utils/convertHourToMinutes");
module.exports = {
  async index(req, res) {
    const filters = req.query;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: "Missing filters to search classes",
      });
    }
    const timeInMinutes = convertHourFromMinutes(filters.time);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`. `id`")
          .whereRaw(
            "`class_schedule`.`week_day` = ??",
            Number([filters.week_day])
          )
          .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", filters.subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);
    return res.json(classes);
  },
  async classes(req, res) {
    const { page = 1 } = req.headers;
    const classes = await db("classes")
      .join("users", "classes.user_id", "=", "users.id")
      .join("class_schedule", "classes.id", "=", "class_schedule.class_id")
      .limit(2)
      .offset((page - 1) * 5)
      .select(["classes.*", "users.*", "class_schedule.*"]);
    return res.json(classes);
  },

  async create(req, res) {
    const { whatsapp, cost, bio, schedule, subject, email } = req.body;
    console.log(whatsapp, cost, bio, schedule, subject, email);
    const user = await db("users").first("*").where({ email: email });
    const classesDataBase = await db("classes");

    if (classesDataBase) {
      const classes = await db("classes")
        .first("*")
        .where({ user_id: user.id });
      if (classes) {
        return res.status(400).send("User cannot register another class.");
      }
    }

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx("users").where("id", user.id).update({
        whatsapp,
        bio,
      });
      const user_id = user.id;
      console.log(user_id);
      const insertedClassesId = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });
      const class_id = insertedClassesId[0];
      console.log(class_id);
      const classSchedule = schedule.map((scheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourFromMinutes(scheduleItem.from),
          to: convertHourFromMinutes(scheduleItem.to),
        };
      });
      console.log(classSchedule);
      await trx("class_schedule").insert(classSchedule);

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
