namespace StocksHelper.Web.Hubs
{
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.SignalR;

	public class AlertsHub : Hub
	{
		public async Task Send(string message)
		{
			if (Clients != null)
			{
				await this.Clients.All.SendCoreAsync("NewMessage", new[] { message = "This thing works." });
			}
		}
	}
}
