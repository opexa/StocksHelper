namespace StocksHelper.Services.SignalR.Hubs
{
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.Authorization;
	using Microsoft.AspNetCore.SignalR;
	using StocksHelper.Services.SignalR.Models.Alerts;

	public class AlertsHub : BaseHub
	{
		public async Task Send(string text)
		{
			if (Clients != null)
			{
				await this.Clients.All.SendAsync("NewMessage", new AlertMessage { Text = text });
			}
		}
	}
}
