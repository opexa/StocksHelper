namespace StocksHelper.Services.DataServices
{
	using System.Threading.Tasks;

	public interface IQuotesService
	{
		Task<bool> IsTickerExisting(string ticker);
	}
}
