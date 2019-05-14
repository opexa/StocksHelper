using Microsoft.AspNetCore.Identity;

namespace StocksHelper.Services.DataServices
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Threading.Tasks;
	using StocksHelper.Common;
	using StocksHelper.Data.Common.Repositories;
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Mapping;
	using StocksHelper.Services.Models.Teams;

	public class TeamsService : ITeamsService
	{
		private readonly IRepository<Team> teamsRepository;

		public TeamsService(IRepository<Team> teamsRepository)
		{
			this.teamsRepository = teamsRepository;
		}

		public IEnumerable<TeamViewModel> Search(string name)
		{
			var teams = this.teamsRepository.All()
											.Where(t => t.Name.Contains(name))
											.To<TeamViewModel>()
											.Take(GlobalConstants.ResultsPerTeamSearch);

			return teams;
		}

		public async Task<Team> Create(string name, string creatorId)
		{
			Team team = new Team() { Name = name };
			team.Participants.Add(new TeamParticipant
			{
				UserId = creatorId,
				TeamRole = TeamRole.Administrator
			});
			
			this.teamsRepository.Add(team);
			await this.teamsRepository.SaveChangesAsync();

			return team;
		}

		public TeamViewModel Get(int id)
		{
			var team = this.teamsRepository.All().Where(t => t.Id == id).To<TeamViewModel>().FirstOrDefault();

			return team;
		}
	}
}
