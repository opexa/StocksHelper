using Microsoft.Extensions.Logging;
using StocksHelper.Services.Logging.Providers;
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
		private readonly UserManager<ApplicationUser> userManager;
		private readonly DbLogger logger;

		public TeamsController(ITeamsService teamsService, UserManager<ApplicationUser> userManager)
		{
			this.teamsService = teamsService;
			this.userManager = userManager;
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
	}
}