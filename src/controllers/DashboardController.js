const Job = require('../model/Job') //importando o Job da pasta model
const JobUtils = require('../utils/JobUtils') //importando o JobUtils da pasta utils
const Profile = require('../model/Profile') //importando o Profile da pasta model

module.exports = { //habilitando para exportação
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
        progress:0,
        done:0,
        total:jobs.length
    }

    //total de horas por dia de cada Job em progresso
    let jobTotalHours = 0

    const updatedJobs = jobs.map((job) => {
      //ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      //espalhamento

    
    //somando a quantidade de status
    statusCount[status] +=1
    
    //total de horas por dia de cada Job em progresso
    jobTotalHours = status == "progress" ? jobTotalHours+Number(job["daily-hours"]) : jobTotalHours
    
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });
    //qtd de horas que quero trabalhar dia (PROFILE) 
    //MENOS
    // Quantidadade de horas/dia de cada job em progress

    const freeHours = profile["hours-per-day"]- jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount:statusCount , freeHours:freeHours});
  },
};
