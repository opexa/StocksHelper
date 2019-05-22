namespace StocksHelper.Services.DataServices
{
	using System.Linq;
	using System.Threading.Tasks;
	using AutoMapper;
	using Microsoft.AspNetCore.Identity;
	using Microsoft.EntityFrameworkCore;
	using StocksHelper.Data.Common.Repositories;
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Models.Alerts;

	public class AlertsService : IAlertsService
	{
		private readonly IRepository<Alert> alertsRepository;
		private readonly UserManager<ApplicationUser> userManager;
		private readonly IRepository<TeamMember> teamsMembersRepository;

		public AlertsService(IRepository<Alert> alertsRepository, UserManager<ApplicationUser> userManager, IRepository<TeamMember> teamsMembersRepository)
		{
			this.alertsRepository = alertsRepository;
			this.userManager = userManager;
			this.teamsMembersRepository = teamsMembersRepository;
		}
		
		public async Task<AlertViewModel> AddNewToTeam(AlertInputModel model, string userId)
		{
			var newAlert = Mapper.Map<Alert>(model);
			var member = await this.teamsMembersRepository.All().Where(m => m.TeamId == model.TeamId && m.UserId == userId).FirstOrDefaultAsync();
			newAlert.CreatedById = member.Id;

			this.alertsRepository.Add(newAlert);
			await this.alertsRepository.SaveChangesAsync();

			var viewModel = Mapper.Map<AlertViewModel>(newAlert);
			return viewModel;
		}

		public async Task<int> DeleteTeamAlert(int id, string requesterId)
		{
			var alert = await this.alertsRepository.FindAsync(id);
			var member = await this.teamsMembersRepository.All().Where(m => m.UserId == requesterId && m.TeamId == alert.TeamId).FirstOrDefaultAsync();

			var requesterRole = member.TeamRole;
			if (requesterRole == TeamRole.Member && alert.CreatedById != member.Id)
				return -1;

			this.alertsRepository.Delete(alert);
			return await this.alertsRepository.SaveChangesAsync();
		}
	}
}
