'use strict';

const core = require('@actions/core');
const github = require('@actions/github');
const projects = require('./projects');

void async function () {
	try {
		const {eventName, payload} = github.context;
		const request = projects.createRequest(eventName, payload);
		const accessToken = core.getInput('ghprojects-token');
		const octokit = github.getOctokit(accessToken);
		await octokit.rest.projects.createCard(request);
	} catch (error) {
		core.setFailed(error.message);
	}
}();
