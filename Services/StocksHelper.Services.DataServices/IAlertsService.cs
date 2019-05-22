namespace StocksHelper.Services.DataServices
{
	using System.Threading.Tasks;
	using StocksHelper.Services.Models.Alerts;

	public interface IAlertsService
	{
		Task<AlertViewModel> AddNewToTeam(AlertInputModel model, string userId);

		Task<int> DeleteTeamAlert(int id, string requesterId);
	}
}
