namespace StocksHelper.Web.Controllers
{
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.Mvc;
	using StocksHelper.Services.DataServices;
	using StocksHelper.Services.Models.Alerts;
	using StocksHelper.Services.SignalR.Hubs;
	using StocksHelper.Web.Infrastructure.Extensions;

	public class AlertsController : BaseController
	{
		private readonly IAlertsService alertsService;
		private readonly IQuotesService quotesService;
		private readonly AlertsHub alertsHub;

		public AlertsController(
			IAlertsService alertService,
			IQuotesService quotesService,
			AlertsHub alertsHub
		)
		{
			this.alertsService = alertService;
			this.quotesService = quotesService;
			this.alertsHub = alertsHub;
		}

		[HttpPost]
		public async Task<IActionResult> AddNewToTeam([FromBody]AlertInputModel input)
		{
			bool isTickerExisting = await this.quotesService.IsTickerExisting(input.Ticker);
			if (!isTickerExisting)
				return BadRequest("Ticker not existing.");

			string loggedUserId = this.User.GetUserId();
			var result = await this.alertsService.AddNewToTeam(input, loggedUserId);

			await this.alertsHub.Send("");

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