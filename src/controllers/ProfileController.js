const Profile = require("../model/Profile")

//module.exports serve para importar para o arquivo rotas
module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },

  async update(req, res) {
    //re.body para pegar os dados
    const data = req.body;
    //definir quantas semanas tem em um ano: 52
    const weeksPerYear = 52;
    //remover as semanas de férias do ano para pegar quantas semanas tem 1 mes
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    //quantas horas por semana estou trabalhando
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    // horas trabalhadas no mes
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;
    //qual será o valor da hora?
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get

   await Profile.update({
      ...await profile,
      ...req.body,
      "value-hour": valueHour,
    });
    return res.redirect("/profile");
  },
};
