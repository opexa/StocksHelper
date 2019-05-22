namespace StocksHelper.Services.DataServices
{
	using System.Collections.Generic;
	using System.Threading.Tasks;
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Models.Teams;
	using StocksHelper.Services.Models.Users;

	public interface ITeamsService
	{
		Task<TeamViewModel> Create(TeamInputModel team, string creatorId);

		TeamViewModel Get(int id);

		IEnumerable<TeamViewModel> Search(string name);

		IEnumerable<TeamViewModel> GetMyTeams(string userId);

		Task<TeamViewModel> LoadTeam(int teamId, string userId);

		IEnumerable<UserSimpleViewModel> GetMemberSuggestions(string name, string loggedUserId);

		Task<int> Leave(string userId, int teamId);
	}
}
