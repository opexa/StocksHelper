namespace StocksHelper.Services.DataServices
{
	using System.Threading.Tasks;
	using StocksHelper.Data.Models;

	public interface IQuotesService
	{
		Task<bool> IsTickerExisting(string ticker);

		Task<bool> IsAlertTriggered(string ticker, decimal price, AlertMoveType moveType);
	}
}
