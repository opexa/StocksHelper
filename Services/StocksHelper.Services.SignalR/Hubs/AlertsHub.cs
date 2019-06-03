namespace StocksHelper.Services.SignalR.Hubs
{
	using System.Threading.Tasks;
	using System.Collections.Generic;
	using Microsoft.AspNetCore.SignalR;
	using StocksHelper.Services.Models.Alerts;
	using StocksHelper.Services.SignalR.Models.Alerts;

	public class AlertsHub : BaseHub
	{
		public async Task TriggerAlert(AlertShortViewModel alert, IReadOnlyList<string> members)
		{
			if (Clients != null)
			{
				await this.Clients.All.SendAsync("AlertTriggered", alert);
			}
		}

		public async Task TriggerAlertDummy(AlertShortViewModel alert, string userId)
		{
			if (Clients != null)
			{
				await this.Clients.User(userId).SendAsync("AlertTriggered", alert);
			}
		}
	}
}
