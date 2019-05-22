using StocksHelper.Web.Infrastructure.Extensions;

namespace StocksHelper.Web.Controllers
{
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.Mvc;
	using StocksHelper.Services.DataServices;
	using StocksHelper.Services.Models.Alerts;

	public class AlertsController : BaseController
	{
		private readonly IAlertsService alertsService;
		private readonly IQuotesService quotesService;

		public AlertsController(
			IAlertsService alertService,
			IQuotesService quotesService
		)
		{
			this.alertsService = alertService;
			this.quotesService = quotesService;
		}

		[HttpPost]
		public async Task<IActionResult> AddNewToTeam([FromBody]AlertInputModel input)
		{
			bool isTickerExisting = await this.quotesService.IsTickerExisting(input.Ticker);
			if (!isTickerExisting)
				return BadRequest("Ticker not existing.");

			string loggedUserId = this.User.GetUserId();
			var result = await this.alertsService.AddNewToTeam(input, loggedUserId);

			return Ok(result);
		}

		[HttpDelete]
		public async Task<IActionResult> DeleteTeamAlert(int id)
		{
			string loggedUserId = this.User.GetUserId();
			var result = await this.alertsService.DeleteTeamAlert(id, loggedUserId);

			return Ok(result);
		}
	}
}