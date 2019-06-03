using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using StocksHelper.Data.Models;

namespace StocksHelper.Services.BackgroundServices
{
	using System;
	using System.Threading;
	using System.Threading.Tasks;
	using System.Collections.Generic;
	using Microsoft.Extensions.Hosting;
	using Microsoft.Extensions.DependencyInjection;
	using StocksHelper.Services.Models.Alerts;
	using StocksHelper.Services.Models.Teams;
	using StocksHelper.Services.DataServices;
	using StocksHelper.Services.SignalR.Hubs;

	public class AlertsListenerService : IHostedService, IDisposable
	{
		private readonly AlertsHub alertsHub;
		private readonly IServiceProvider serviceProvider;
		private readonly IHttpContextAccessor httpContextAccessor;
		private IEnumerable<TeamAlertsViewModel> teamsAndAlerts;
		private Timer alertsTimer;
		private Timer teamsLoaderTimer;

		public AlertsListenerService(
			AlertsHub alertsHub,
			IServiceProvider serviceProvider,
			IHttpContextAccessor httpContextAccessor
		)
		{
			this.alertsHub = alertsHub;
			this.serviceProvider = serviceProvider;
			this.httpContextAccessor = httpContextAccessor;
		}

		private void LoadTeamsAndAlerts(object state)
		{
			using (var scope = this.serviceProvider.CreateScope())
			{
				var teamsService = scope.ServiceProvider.GetService<ITeamsService>();

				this.teamsAndAlerts = teamsService.GetAllTeamsAndAlerts();
			}
		}

		private async void CheckTeamAlerts(object state)
		{
			if (this.teamsAndAlerts != null)
			{
				using (var scope = this.serviceProvider.CreateScope())
				{
					var quotesService = scope.ServiceProvider.GetService<IQuotesService>();
					var userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
					foreach (var team in this.teamsAndAlerts)
					{
						foreach (var alert in team.Alerts)
						{
							/*if (await quotesService.IsAlertTriggered(alert.Ticker, alert.Price, alert.MoveType))*/
								this.NotifyTeamMembers(alert, this.httpContextAccessor.HttpContext.User.);
						}
					}
				}
			}
		}

		public async void NotifyTeamMembers(AlertShortViewModel alert, IReadOnlyList<string> members)
		{
			await this.alertsHub.TriggerAlert(alert, members);
		}

		public Task StartAsync(CancellationToken cancellationToken)
		{
			this.teamsLoaderTimer = new Timer(LoadTeamsAndAlerts, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));
			this.alertsTimer = new Timer(this.CheckTeamAlerts, null, TimeSpan.Zero, TimeSpan.FromSeconds(3));

			return Task.CompletedTask;
		}

		public Task StopAsync(CancellationToken cancellationToken)
		{
			this.teamsLoaderTimer?.Change(Timeout.Infinite, 0);
			this.alertsTimer?.Change(Timeout.Infinite, 0);

			return Task.CompletedTask;
		}

		public void Dispose()
		{
			this.teamsLoaderTimer?.Dispose();
			this.alertsTimer?.Dispose();
		}
	}
}
