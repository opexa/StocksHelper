using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StocksHelper.Services.Models.Users;

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
		private readonly UserManager<ApplicationUser> userManager;

		public TeamsService(IRepository<Team> teamsRepository, UserManager<ApplicationUser> userManager)
		{
			this.teamsRepository = teamsRepository;
			this.userManager = userManager;
		}

		public IEnumerable<TeamViewModel> Search(string name)
		{
			var teams = this.teamsRepository.All()
											.Where(t => t.Name.Contains(name))
											.To<TeamViewModel>()
											.Take(GlobalConstants.ResultsPerTeamSearch);

			return teams;
		}

		public async Task<Team> Create(TeamInputModel model, string creatorId)
		{
			Team team = new Team() { Name = model.Name };
			team.Members.Add(new TeamMember { UserId = creatorId, TeamRole = TeamRole.Administrator });

			foreach (TeamMemberInputModel modelMember in model.Members)
			{
				bool isUserValid = await this.userManager.FindByIdAsync(modelMember.Id) != null;
				if (isUserValid)
				{
					team.Members.Add(new TeamMember() { UserId = modelMember.Id, TeamRole = TeamRole.Member });
				}
			}

			this.teamsRepository.Add(team);
			await this.teamsRepository.SaveChangesAsync();

			return team;
		}

		public TeamViewModel Get(int id)
		{
			var team = this.teamsRepository.All().Where(t => t.Id == id).To<TeamViewModel>().FirstOrDefault();

			return team;
		}

		public IEnumerable<TeamViewModel> GetMyTeams(string userId)
		{
			var myTeams = this.teamsRepository.All()
											.Where(t => t.Members.Any(p => p.UserId == userId))
											.To<TeamViewModel>()
											.ToList();

			return myTeams;
		}

		public async Task<TeamViewModel> LoadTeam(int id, string userId)
		{
			var team = await this.teamsRepository.All()
														.Where(t => t.Id == id && t.Members.Any(p => p.UserId == userId))
														.To<TeamViewModel>()
														.FirstOrDefaultAsync();

			return team;
		}

		public IEnumerable<UserSimpleViewModel> GetMemberSuggestions(string name)
		{
			var suggestions = this.userManager.Users.Where(u => u.UserName.Contains(name))
																							.To<UserSimpleViewModel>().Take(10)
																							.ToList();

			return suggestions;
		}
	}
}
