namespace StocksHelper.Services.DataServices
{
	using System.Collections.Generic;
	using System.Threading.Tasks;
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Models.Teams;

	public interface ITeamsService
	{
		Task<Team> Create(string name, string creatorId);

		TeamViewModel Get(int id);

		IEnumerable<TeamViewModel> Search(string name);

		IEnumerable<TeamViewModel> GetMyTeams(string userId);

		Task<TeamViewModel> LoadTeam(int teamId, string userId);
	}
}
