const path = require('path');
const fs = require('fs');

const jobsMap = new Map();


function GetJobs(jobName) {
  console.log(jobsMap);
  if (!jobsMap.has(jobName)) {
    throw new Error('[App_jobs] Job file not found');
  }
  return jobsMap.get(jobName);
}

async function SetupJobFunctions() {
  console.log('[App_jobs]: Setting up job functions');
  const jobsMap = new Map();

  async function loadJobs() {
    const files = await fs.promises.readdir(path.resolve(__dirname, './functions'));
    console.log('[App_jobs]: Loading jobs...', files);

    files
      .filter(function (fileName) {
        return fileName.endsWith('.js');
      })
      .forEach(function (fileName) {
        const jobModule = require(`./functions/${fileName}`);
        jobsMap.set(jobModule.name, jobModule);
        console.log(`[App_jobs]: ${jobModule.name} added!`);
      });
  }
  return {loadJobs};
}

module.exports = {SetupJobFunctions, GetJobs};