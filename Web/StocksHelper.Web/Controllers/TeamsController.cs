using System.Linq;
using Microsoft.Extensions.Logging;
using StocksHelper.Services.Logging.Providers;
using StocksHelper.Services.Mapping;
using StocksHelper.Services.Models.Teams;
using StocksHelper.Web.Infrastructure.Extensions;

namespace StocksHelper.Web.Controllers
{
	using System;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.AspNetCore.Identity;
	using StocksHelper.Services.DataServices;
	using StocksHelper.Data.Models;
	using StocksHelper.Web.Models.Teams;
	using System.Threading.Tasks;

	public class TeamsController : BaseController
	{
		private readonly ITeamsService teamsService;

		public TeamsController(ITeamsService teamsService)
		{
			this.teamsService = teamsService;
		}

		[HttpGet]
		public IActionResult Search(string name)
		{
			if (String.IsNullOrEmpty(name))
				return BadRequest("Please enter a valid team name.");

			var teams = this.teamsService.Search(name);
			return Json(teams);
		}

		[HttpPost]
		public async Task<IActionResult> Create(TeamInputModel input)
		{
			if (!this.ModelState.IsValid)
				return BadRequest(ModelState);

			string loggedUserId = this.User.GetUserId();
			Team team = await this.teamsService.Create(input.Name, loggedUserId);

			return Json(team);
		}

		[HttpGet]
		public IActionResult FetchMyTeams()
		{
			string loggedUserId = this.User.GetUserId();
			var myTeams = this.teamsService.GetMyTeams(loggedUserId);

			return Ok(myTeams);
		}

		[HttpGet]
		public async Task<IActionResult> Load(int id)
		{
			string loggedUserId = this.User.GetUserId();
			var team = await this.teamsService.LoadTeam(id, loggedUserId);

			return Ok(team);
		}

		[HttpGet]
		public IActionResult SuggestMember(string input)
		{
			var suggestions = this.teamsService.GetMemberSuggestions(input);

			return Ok(suggestions);
		}
	}
}